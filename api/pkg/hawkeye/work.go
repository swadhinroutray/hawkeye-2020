package hawkeye

import (
	"encoding/json"
	"fmt"
	"net/http"

	"go.mongodb.org/mongo-driver/bson"
)

//Help ...
type Help struct {
	Content    string
	Additional string
}

//HelloWork ...
func (app *App) HelloWork(w http.ResponseWriter, r *http.Request) {
	hello := Help{Content: "This is a cry for help", Additional: "Please RSVP"}
	w.Header().Set("Content-Type", "application/json")
	err := json.NewEncoder(w).Encode(hello)
	if err != nil {
		fmt.Println("Error on route /hello")
	}
}

//Send User id and will return the user
func (app *App) getProfile(w http.ResponseWriter, r *http.Request) {
	//Get user Profile
	var currUser CurrUser
	currUser, err := app.getCurrentUser(r)
	findUser := bson.M{"_id": currUser.ID}
	var user User
	err = app.db.Collection("users").FindOne(r.Context(), findUser).Decode(&user)
	if err != nil {
		app.log.Errorf("Internal Server Error:  %v", err.Error())
		app.sendResponse(w, false, InternalServerError, "something went wrong")
		return
	}
	app.sendResponse(w, true, Success, user)

}
