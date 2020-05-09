package hawkeye

import (
	"net/http"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

//User Response ...
type userResponse struct {
	Count int64  `json:"count"`
	Users []User `json:"users"`
}

func (app *App) listUsers(w http.ResponseWriter, r *http.Request) {
	findOpts := options.Find()
	findOpts.SetSort(bson.M{"points": -1})

	cur, err := app.db.Collection("users").Find(r.Context(), bson.D{}, findOpts)
	if err != nil {
		app.log.Errorf("Database error %s", err.Error())
		app.sendResponse(w, false, InternalServerError, "Something went error")
		return
	}

	var allUsers []User
	if err := cur.All(r.Context(), &allUsers); err != nil {
		app.log.Errorf("Database error %s", err.Error())
		app.sendResponse(w, false, InternalServerError, "Something went wrong")
		return
	}

	totalUsers, err := app.db.Collection("users").CountDocuments(r.Context(), bson.D{})
	if err != nil {
		app.log.Errorf("Database error %s", err.Error())
		app.sendResponse(w, false, InternalServerError, "Something went wrong")
		return
	}

	app.sendResponse(w, true, Success, userResponse{
		Count: totalUsers,
		Users: allUsers,
	})
}

func (app *App) banUser(w http.ResponseWriter, r *http.Request) {
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
		bson.M{"$set": bson.M{"banned": true}},
	); err != nil {
		app.log.Errorf("Database error %s", err.Error())
		app.sendResponse(w, false, InternalServerError, "Something went wrong")
		return
	}

	app.sendResponse(w, true, Success, "Successfully banned")
}

func (app *App) unbanUser(w http.ResponseWriter, r *http.Request) {
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
		bson.M{"$set": bson.M{"banned": false}},
	); err != nil {
		app.log.Errorf("Database error %s", err.Error())
		app.sendResponse(w, false, InternalServerError, "Something went wrong")
		return
	}

	app.sendResponse(w, true, Success, "Successfully unbanned")
}

// type LBUser struct {
// 	Points              int64     `json:"points"`
// 	SubmissionTimeStamp time.Time `json:"submission_timestamp"`
// 	Name                string    `json:"name"`
// }

// func (app *App) Leaderboard(w http.ResponseWriter, r *http.Request) {
// 	// 	findOpts := options.Find()
// 	// 	findOpts.SetSort(bson.M{"points": -1,
// 	// 	bson.M{}
// 	// })

// 	userSpec := bson.A{
// 		bson.M{},
// 		bson.M{
// 			"$project": bson.M{
// 				"submmission.": bson.M{
// 					"$filter": bson.M{
// 						"input": "$hints",
// 						"as":    "hint",
// 						"cond": bson.M{
// 							"$eq": bson.A{"$$hint.active", true},
// 						},
// 					},
// 				},
// 			},
// 		},
// 	}

// 	cur, err := app.db.Collection("users").Aggregate(r.Context(), userSpec)
// 	if err != nil {
// 		app.log.Errorf("Database error %s", err.Error())
// 		app.sendResponse(w, false, InternalServerError, "Something went error")
// 		return
// 	}

// 	var allUsers []LBUser
// 	if err := cur.All(r.Context(), &allUsers); err != nil {
// 		app.log.Errorf("Database error %s", err.Error())
// 		app.sendResponse(w, false, InternalServerError, "Something went wrong")
// 		return
// 	}

// 	totalUsers, err := app.db.Collection("users").CountDocuments(r.Context(), bson.D{})
// 	if err != nil {
// 		app.log.Errorf("Database error %s", err.Error())
// 		app.sendResponse(w, false, InternalServerError, "Something went wrong")
// 		return
// 	}

// 	app.sendResponse(w, true, Success, userResponse{
// 		Count: totalUsers,
// 		Users: allUsers,
// 	})
// }
