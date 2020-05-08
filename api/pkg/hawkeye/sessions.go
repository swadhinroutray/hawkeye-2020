package hawkeye

import (
	"errors"
	"fmt"
	"net/http"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

const sessionName = "session"

//CurrUser ...
type CurrUser struct {
	ID         primitive.ObjectID
	Email      string
	FirstLogin bool
}

//ErrorInvalidCookie ...
var ErrorInvalidCookie = errors.New("invalid cookie")

func (app *App) setSession(w http.ResponseWriter, r *http.Request, currUser CurrUser, age int) error {
	session, err := app.sessionStore.Get(r, sessionName)
	if err != nil {
		app.log.Errorf("Session store err: %s ", err.Error())
		return err
	}
	session.Values["id"] = currUser.ID.Hex()
	session.Values["Email"] = currUser.Email
	fmt.Println(session.Values)
	if err := session.Save(r, w); err != nil {
		app.log.Infof("Session Store save error: %s", err.Error())
		return err

	}
	return nil

}

func (app *App) getCurrentUser(r *http.Request) (CurrUser, error) {
	session, err := app.sessionStore.Get(r, "session")
	if err != nil {
		app.log.Errorf("Session store get error: %s", err.Error())
		return CurrUser{}, err
	}
	if session.Values["id"] == nil || session.Values["Email"] == nil {
		app.log.Infof("%s", ErrorInvalidCookie.Error())
		return CurrUser{}, ErrorInvalidCookie
	}
	id, err := primitive.ObjectIDFromHex((session.Values["id"]).(string))
	if err != nil {
		app.log.Errorf("Error reading id from cache: %s", err.Error())
		return CurrUser{}, err
	}
	email := session.Values["Email"].(string)

	return CurrUser{
		ID:    id,
		Email: email,
	}, nil
}

func (app *App) getUserTest(r *http.Request) User {
	CurrUser, err := app.getCurrentUser(r)
	if err != nil {

	}
	var curUser User
	filter := bson.M{"email": CurrUser.Email}
	err = app.db.Collection("users").FindOne(r.Context(), filter).Decode(&curUser)
	if err == mongo.ErrNoDocuments {
		fmt.Println(curUser)
		app.log.Infof("Unable to fetch user")

		return User{}
	}
	if err != nil {
		return User{}
	}

	return curUser
}

func (app *App) clearSession(w http.ResponseWriter, r *http.Request) error {
	session, err := app.sessionStore.Get(r, sessionName)
	if err != nil {
		app.log.Errorf("Session store get error:%s", err.Error())
		return err
	}
	session.Options.MaxAge = -1

	if err := session.Save(r, w); err != nil {
		app.log.Errorf("Session store Save error:%s", err.Error())
		return err

	}
	return nil
}
