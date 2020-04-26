package hawkeye

import (
	"net/http"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func (app *App) unlockNextRegionForAll(w http.ResponseWriter, r *http.Request) {

	//var allUsers []User
	findOptions := options.Find()
	cur, err := app.db.Collection("users").Find(r.Context(), bson.M{}, findOptions)

	if err != nil {
		app.log.Errorf("Database Error %v", err.Error())
		app.sendResponse(w, false, InternalServerError, nil)
		return
	}

	errorUsers := []string{}

	for cur.Next(r.Context()) {
		var currUser User
		err := cur.Decode(&currUser)
		if err != nil {
			app.log.Errorf("Internal Server Error %v", err.Error())
			//app.sendResponse(w, false, InternalServerError, nil)
			//return
			errorUsers = append(errorUsers, currUser.ID.Hex())
		}

		app.unlockNextRegion(currUser, r)
	}

	if len(errorUsers) > 0 {
		app.sendResponse(w, false, InternalServerError, errorUsers)
		return
	}
	app.sendResponse(w, true, Success, nil)
}
