package hawkeye

import (
	"bytes"
	"encoding/json"
	"fmt"
	"math/rand"
	"net/http"
	"os"
	"strings"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
)

//RegisterRequest ...
type RegisterRequest struct {
	Name            string `json:"name" validate:"required"`
	Username        string `json:"username" validate:"required"`
	Password        string `json:"password"    validate:"required"`
	ConfirmPassword string `json:"confirmPass" validate:"required"`
	Email           string `json:"email"       validate:"required,email"`
	Mobile          string `json:"mobile"      validate:"required"`
	College         string `json:"college"`
	Token           string `json:"token"`
}

//R ...
type R struct {
	Secret string
	// contains filtered or unexported fields
}

//RegisterResponse ...
type RegisterResponse struct {
	Name     string `json:"name"`
	Username string `json:"username"`
	Email    string `json:"email"`
	Mobile   string `json:"mobile"`
	College  string `json:"college"`
	Level    string `json:"level"`
	Access   string `json:"access"`
	Banned   string `json:"banned"`
}

func (app *App) registerController(w http.ResponseWriter, r *http.Request) {
	var reqBody RegisterRequest

	if err := json.NewDecoder(r.Body).Decode(&reqBody); err != nil {
		app.sendDecodeError(w, err)
		return
	}

	if err := app.validate.Struct(reqBody); err != nil {
		app.sendValidationError(w, err)
		return
	}

	//Check for unique username
	if err := app.db.Collection("users").FindOne(r.Context(), bson.M{"username": strings.TrimSpace(reqBody.Username)}).Decode(nil); err != mongo.ErrNoDocuments {
		verr := ValidationError{Field: "username", Error: "username_exists"}
		app.log.Infof("%#v", verr)
		app.sendResponse(w, false, Conflict, []ValidationError{verr})
		return
	}

	//Unique Email
	if err := app.db.Collection("users").FindOne(r.Context(), bson.M{"email": strings.TrimSpace(reqBody.Email)}).Decode(nil); err != mongo.ErrNoDocuments {
		verr := ValidationError{Field: "email", Error: "email_exists"}
		app.log.Infof("%#v", verr)
		app.sendResponse(w, false, Conflict, []ValidationError{verr})
		return
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(strings.TrimSpace(reqBody.Password)), bcrypt.DefaultCost)
	if err != nil {
		app.log.Errorf("Bcrypt hash failed %s", err.Error())
		app.sendResponse(w, false, InternalServerError, "Something went wrong")
		return
	}

	regionOrder := rand.Perm(5)[0:5]
	levels := [5]int{0, 0, 0, 0, 0}
	levels[regionOrder[0]] = 1

	emailVerify := os.Getenv("EMAIL_VERIFY_TOKEN")

	newUser := User{
		ID:        primitive.NewObjectID(),
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
		Name:      strings.TrimSpace(reqBody.Name),
		Username:  strings.TrimSpace(reqBody.Username),
		Password:  string(hash),
		Token:     primitive.NewObjectID().Hex(),
		Email:     emailVerify + strings.TrimSpace(reqBody.Email),
		// Email:   strings.TrimSpace(reqBody.Email),
		Mobile:  strings.TrimSpace(reqBody.Mobile),
		College: strings.TrimSpace(reqBody.College),

		Level:            levels,
		Inventory:        []Elixir{},
		AnswerCount:      0,
		Multiplier:       10,
		Points:           0,
		RegionUnlock:     regionOrder,
		ItemBool:         [5]bool{true, true, true, true, true},
		ToBuy:            []int{2, 1, 2, 1},
		History:          []Elixir{},
		RegionMultiplier: -1,
		Submissions:      []Submission{},
		Access:           0,
		Banned:           false,
		AllAnswered:      false,
		NestLevel:        1,
		FirstLogin:       true,
	}

	app.LogIP(newUser.Username, r)

	url := "https://mail.iecsemanipal.com/hawkeye/verifyaccount"
	message := map[string]interface{}{
		"toEmail": strings.TrimSpace(reqBody.Email),
		"name":    strings.TrimSpace(reqBody.Name),
		"link":    "https://hawkeye.iecsemanipal.com/verify?token=" + newUser.Token,
		// "link": "http://localhost:3030/verify?token=" + newUser.Token,
	}
	bytesRepresentation, err := json.Marshal(message)
	if err != nil {
		app.log.Infof("ERROR %v", err.Error())
		app.sendResponse(w, false, InternalServerError, "Could not send Email")
		return
	}

	client := &http.Client{}

	req, err := http.NewRequest("POST", url, bytes.NewBuffer(bytesRepresentation))

	if err != nil {
		app.log.Infof("ERROR %v", err.Error())
		app.sendResponse(w, false, InternalServerError, "Could not send Email")
		return
	}
	authKey := os.Getenv("MAILER_ACCESS_TOKEN")

	req.Header.Set("Authorization", authKey)
	req.Header.Set("Content-Type", "application/json")

	_, err = client.Do(req)

	if err != nil {
		app.log.Infof("ERROR %v", err.Error())
		app.sendResponse(w, false, InternalServerError, "Could not send Email")
		return
	}

	if err != nil {
		app.log.Infof("ERROR %v", err.Error())
		app.sendResponse(w, false, InternalServerError, "Could not send Email")
		return
	}

	Secret := os.Getenv("RECAPTCHA_SECRET_KEY")
	_, err = http.Get("https://www.google.com/recaptcha/api/siteverify?secret=" + Secret + "&response=" + reqBody.Token)

	if err != nil {
		app.log.Errorf("Captcha Error %v", err.Error())
		app.sendResponse(w, false, InternalServerError, err.Error())
		return
	}
	_, err = app.db.Collection("users").InsertOne(r.Context(), newUser)
	if err != nil {
		app.log.Errorf("Failed to insert User %s", err.Error())
		app.sendResponse(w, false, InternalServerError, "Something went wrong")
		return
	}
	var getCount CountUnlockRegion
	if err = app.db.Collection("count").FindOne(r.Context(), bson.M{}).Decode(&getCount); err != nil {
		app.sendResponse(w, false, InternalServerError, "Something went wrong")
		return
	}
	for i := 0; i < getCount.CountRegions; i++ {
		app.unlockNextRegion(newUser, r)
	}

	app.log.Infof("Registered new user %#v", newUser)
	app.sendResponse(w, true, Success, newUser)

}

// VerifyRequest ...
type VerifyRequest struct {
	Token string `json:"token" bson:"token"`
}

func (app *App) verifyEmail(w http.ResponseWriter, r *http.Request) {

	var verReq VerifyRequest

	if err := json.NewDecoder(r.Body).Decode(&verReq); err != nil {
		app.sendDecodeError(w, err)
		return
	}

	newToken := primitive.NewObjectID().Hex()

	var thisUser User

	if err := app.db.Collection("users").FindOne(r.Context(), bson.M{"token": verReq.Token}).Decode(&thisUser); err == mongo.ErrNoDocuments {
		app.sendResponse(w, false, Conflict, nil)
		return
	}

	newEmail := thisUser.Email
	prefixToken := os.Getenv("EMAIL_VERIFY_TOKEN")
	tokenLength := len(prefixToken)
	if strings.HasPrefix(newEmail, prefixToken) {
		newEmail = thisUser.Email[tokenLength:]
	}

	app.db.Collection("users").FindOneAndUpdate(r.Context(), bson.M{"token": verReq.Token},
		bson.M{
			"$set": bson.M{
				"email": newEmail,
				"token": newToken,
			},
		},
	)

	app.sendResponse(w, true, Success, "Email Verified successfully")

}

//LoginRequest ...
type LoginRequest struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required"`
}

func (app *App) loginController(w http.ResponseWriter, r *http.Request) {
	var reqBody LoginRequest

	if err := json.NewDecoder(r.Body).Decode(&reqBody); err != nil {
		app.sendDecodeError(w, err)
		return
	}

	if err := app.validate.Struct(reqBody); err != nil {
		app.sendValidationError(w, err)
		return
	}

	user := User{}

	if err := app.db.Collection("users").FindOne(r.Context(), bson.M{"email": reqBody.Email}).Decode(&user); err == mongo.ErrNoDocuments {
		verr := ValidationError{Field: "email", Error: "emaildoesnotexist"}
		app.log.Infof("%#v", verr)
		app.sendResponse(w, false, Conflict, []ValidationError{verr})
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(strings.TrimSpace(user.Password)), []byte(reqBody.Password)); err == bcrypt.ErrMismatchedHashAndPassword {
		app.log.Infof("Password mismatch %s")
		verr := ValidationError{Field: "password", Error: "wrongpassword"}
		app.sendResponse(w, false, Unauthorized, []ValidationError{verr})
		return
	}

	currUser := CurrUser{
		ID:         user.ID,
		Email:      user.Email,
		FirstLogin: user.FirstLogin,
	}

	if err := app.setSession(w, r, currUser, 86400); err != nil {
		app.sendResponse(w, false, InternalServerError, "Something went wrong")
		return
	}
	// if user.FirstLogin == false {
	// 	app.db.Collection("users").FindOneAndUpdate(r.Context(),
	// 		bson.M{"_id": user.ID},
	// 		bson.M{"$set": bson.M{"firstlogin": true}},
	// 	)
	// 	app.log.Infof("Session Set for user %s", currUser.Email)
	// 	app.sendResponse(w, true, Success, currUser)
	// 	return
	// }

	app.log.Infof("Session Set for user %s", currUser.Email)
	app.sendResponse(w, true, Success, currUser)
}

func (app *App) logoutController(w http.ResponseWriter, r *http.Request) {
	if err := app.clearSession(w, r); err != nil {
		app.sendResponse(w, false, InternalServerError, "Something went wrong")
		return
	}
	app.log.Infof("Logged out successfully")
	app.sendResponse(w, true, Success, "Logged out successfully")
}

func (app *App) profileController(w http.ResponseWriter, r *http.Request) {
	currUser := r.Context().Value(userKey).(User)
	var user User
	if err := app.db.Collection("users").FindOne(r.Context(), bson.M{"_id": currUser.ID}).Decode(&user); err != nil {
		app.sendResponse(w, false, InternalServerError, "Something went wrong")
		return
	}

	app.sendResponse(w, true, Success, user)
}

func (app *App) sendMail(token string, to string, name string, w http.ResponseWriter) error {

	url := "https://mail.iecsemanipal.com/hawkeye/forgotpassword"
	message := map[string]interface{}{
		"toEmail": to,
		"name":    name,
		"link":    "https://hawkeye.iecsemanipal.com/reset?token=" + token,
	}
	bytesRepresentation, err := json.Marshal(message)
	if err != nil {
		app.log.Infof("ERROR %v", err.Error())
		app.sendResponse(w, false, InternalServerError, "Could not send Email")
		return err
	}

	client := &http.Client{}

	req, err := http.NewRequest("POST", url, bytes.NewBuffer(bytesRepresentation))

	if err != nil {
		app.log.Infof("ERROR %v", err.Error())
		app.sendResponse(w, false, InternalServerError, "Could not send Email")
		return err
	}
	authKey := os.Getenv("MAILER_ACCESS_TOKEN")

	req.Header.Set("Authorization", authKey)
	req.Header.Set("Content-Type", "application/json")

	_, err = client.Do(req)

	if err != nil {
		app.log.Infof("ERROR %v", err.Error())
		app.sendResponse(w, false, InternalServerError, "Could not send Email")
		return err
	}

	if err != nil {
		app.log.Infof("ERROR %v", err.Error())
		app.sendResponse(w, false, InternalServerError, "Could not send Email")
		return err
	}

	app.log.Infof("Email sent:%s", to)
	return nil
}

// ForgotPasswordRequest ...
type ForgotPasswordRequest struct {
	Email string `json:"email" bson:"email"`
}

func (app *App) forgotPassword(w http.ResponseWriter, r *http.Request) {

	var forgotReq ForgotPasswordRequest

	if err := json.NewDecoder(r.Body).Decode(&forgotReq); err != nil {
		app.sendDecodeError(w, err)
		return
	}

	var currUser User

	if err := app.db.Collection("users").FindOne(r.Context(), bson.M{"email": forgotReq.Email}).Decode(&currUser); err != nil {
		app.log.Infof("ERROR %v", err.Error())
		app.sendResponse(w, false, Success, "Can't Find User")
		return
	}

	if err := app.sendMail(currUser.Token, forgotReq.Email, currUser.Name, w); err != nil {
		app.log.Errorf("Error:%s", err)
		app.sendResponse(w, false, InternalServerError, "Unable to send mail")
		return
	}
	app.sendResponse(w, true, Success, "Email sent")
}

// ResetPasswordRequest ...
type ResetPasswordRequest struct {
	Password  string `json:"password" bson:"password"`
	Password2 string `json:"password2" bson:"password2"`
	Token     string `json:"token" bson:"token"`
}

func (app *App) resetPassword(w http.ResponseWriter, r *http.Request) {
	var resetReq ResetPasswordRequest

	if err := json.NewDecoder(r.Body).Decode(&resetReq); err != nil {
		app.sendDecodeError(w, err)
		return
	}

	fmt.Print(resetReq)

	hash, err := bcrypt.GenerateFromPassword([]byte(strings.TrimSpace(resetReq.Password)), bcrypt.DefaultCost)
	if err != nil {
		app.log.Errorf("Bcrypt hash failed %s", err.Error())
		app.sendResponse(w, false, InternalServerError, "Something went wrong")
		return
	}

	newToken := primitive.NewObjectID().Hex()

	app.db.Collection("users").FindOneAndUpdate(r.Context(), bson.M{"token": resetReq.Token},
		bson.M{
			"$set": bson.M{
				"token":    newToken,
				"password": string(hash),
			},
		},
	)

	app.sendResponse(w, true, Success, "Password reset successfully")
}

// FirstLoginRequest ...
type FirstLoginRequest struct {
	Value bool `json:"value" bson:"value"`
}

func (app *App) setFirstLoginFalse(w http.ResponseWriter, r *http.Request) {
	currUser := app.getUserTest(r)

	var firstLogin FirstLoginRequest

	if err := json.NewDecoder(r.Body).Decode(&firstLogin); err != nil {
		app.sendDecodeError(w, err)
		return
	}

	app.db.Collection("users").FindOneAndUpdate(r.Context(), bson.M{"_id": currUser.ID},
		bson.M{
			"$set": bson.M{
				"firstlogin": firstLogin.Value,
			},
		},
	)

	app.sendResponse(w, true, Success, "First Login changed")
}
