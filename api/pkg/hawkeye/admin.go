package hawkeye

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
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

//Make Admin
func (app *App) makeAdmin(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)

	id, err := primitive.ObjectIDFromHex(params["id"])
	if err != nil {
		app.log.Infof("Bad request params %s", err.Error())
		app.sendResponse(w, false, BadRequest, nil)
		return
	}

	if _, err = app.db.Collection("users").UpdateOne(
		r.Context(),
		bson.M{"_id": id},
		bson.M{"$set": bson.M{"access": 1}},
	); err != nil {
		app.log.Errorf("Database error %s", err.Error())
		app.sendResponse(w, false, InternalServerError, "Something went wrong")
		return
	}

	app.sendResponse(w, true, Success, "Successfully made Admin")
}

func (app *App) dismissAdmin(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)

	id, err := primitive.ObjectIDFromHex(params["id"])
	if err != nil {
		app.log.Infof("Bad request params %s", err.Error())
		app.sendResponse(w, false, BadRequest, nil)
		return
	}

	if _, err = app.db.Collection("users").UpdateOne(
		r.Context(),
		bson.M{"_id": id},
		bson.M{"$set": bson.M{"access": 0}},
	); err != nil {
		app.log.Errorf("Database error %s", err.Error())
		app.sendResponse(w, false, InternalServerError, "Something went wrong")
		return
	}

	app.sendResponse(w, true, Success, "Successfully dismissed Admin")
}

// func (app *App) getUserSubmissions(w http.ResponseWriter, r *http.Request) {
// 	params := mux.Vars(r)

// 	id, err := primitive.ObjectIDFromHex(params["id"])
// 	if err != nil {
// 		app.log.Infof("Bad request params %s", err.Error())
// 		app.sendResponse(w, false, BadRequest, nil)
// 		return
// 	}

// 	var submissions []Submission

// 	filter := bson.A{
// 		bson.M{"$match": bson.M{"_id": id}},
// 		bson.M{
// 			"$project": bson.M{
// 				"submissions": 1,
// 			},
// 		},
// 	}
// 	// findOpts := options.Find()
// 	// findOpts.SetSort(bson.M{"created_at": -1})

// 	cur, err := app.db.Collection("users").Aggregate(r.Context(), filter)
// 	if err != nil {
// 		app.log.Errorf("Database error %s", err)
// 		app.sendResponse(w, false, InternalServerError, "Something went wrong")
// 		return
// 	}

// 	if err := cur.All(r.Context(), &submissions); err != nil {
// 		app.log.Errorf("Database error %s", err)
// 		app.sendResponse(w, false, InternalServerError, "Something went wrong")
// 		return
// 	}

// 	app.sendResponse(w, true, Success, submissions)
// }
