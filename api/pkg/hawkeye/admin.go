package hawkeye

import (
	"fmt"
	"net/http"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func (app *App) unlockNextRegion(currUser User, r *http.Request) {
	nextUnlock := currUser.UnlockedRegions + 1
	if nextUnlock < 5 {
		levelUnlock := fmt.Sprintf("level.%d", currUser.RegionUnlock[nextUnlock])
		app.db.Collection("users").FindOneAndUpdate(r.Context(), bson.M{"_id": currUser.ID},
			bson.M{
				"$set": bson.M{
					"unlocked":  nextUnlock,
					levelUnlock: 1,
				},
			},
		)
	}
}

func (app *App) unlockNextRegionForAll(w http.ResponseWriter, r *http.Request) {

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
