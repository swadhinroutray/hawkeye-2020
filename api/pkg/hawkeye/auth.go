package hawkeye

import (
	"encoding/json"
	"math/rand"
	"net/http"
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

	regionOrder := rand.Perm(7)[0:7]
	levels := [7]int{0, 0, 0, 0, 0, 0, 0}
	levels[regionOrder[0]] = 1

	newUser := User{
		ID:        primitive.NewObjectID(),
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
		Name:      strings.TrimSpace(reqBody.Name),
		Username:  strings.TrimSpace(reqBody.Username),
		Password:  string(hash),
		Email:     strings.TrimSpace(reqBody.Email),
		Mobile:    strings.TrimSpace(reqBody.Mobile),
		College:   strings.TrimSpace(reqBody.College),

		Level:            levels,
		Inventory:        []Elixir{},
		Points:           0,
		RegionUnlock:     regionOrder,
		ItemBool:         [7]bool{true, true, true, true, true, true, true},
		ToBuy:            []int{2, 2, 2, 1},
		History:          []Elixir{},
		RegionMultiplier: -1,

		Access: 0,
		Banned: false,
	}

	_, err = app.db.Collection("users").InsertOne(r.Context(), newUser)
	if err != nil {
		app.log.Errorf("Failed to insert User %s", err.Error())
		app.sendResponse(w, false, InternalServerError, "Something went wrong")
		return
	}

	app.log.Infof("Registered new user %#v", newUser)
	app.sendResponse(w, true, Success, newUser)
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
		//fmt.Println("1")
		app.sendResponse(w, false, Conflict, []ValidationError{verr})
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(strings.TrimSpace(user.Password)), []byte(reqBody.Password)); err == bcrypt.ErrMismatchedHashAndPassword {
		app.log.Infof("Password mismatch %s")
		verr := ValidationError{Field: "password", Error: "wrongpassword"}
		//fmt.Println("2 \n")
		app.sendResponse(w, false, Unauthorized, []ValidationError{verr})
		return
	}

	currUser := CurrUser{
		ID:    user.ID,
		Email: user.Email,
	}

	if err := app.setSession(w, r, currUser, 86400); err != nil {
		app.sendResponse(w, false, InternalServerError, "Something went wrong")
		return
	}
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
