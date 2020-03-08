package hawkeye

import (
	"encoding/json"
	"net/http"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

//FetchedElixir ...
type FetchedElixir struct {
	//ID       primitive.ObjectID `json:"id" bson:"_id"`
	Elixir   int `json:"elixir" bson:"elixir"`
	Region   int `json:"region" bson:"region,omitempty"`
	Question int `bson:"question" json:"question"`
	//Active bool               `bson:"active"  json:"active"`
}

//FetchedHint ...
type FetchedHint struct {
	ID   primitive.ObjectID `json:"id" bson:"_id"`
	Hint string             `json:"hints" bson:"hints"`
}

func (app *App) unlockExtraHint(w http.ResponseWriter, r *http.Request) {
	currUser := app.getUserTest(r)
	//TODO:Frontend sends id of potion check if he has it in his inventory of not, and then apply to the question

	var elixir FetchedElixir
	json.NewDecoder(r.Body).Decode(&elixir)
	if currUser.ItemBool[elixir.Region] == false {
		app.sendResponse(w, false, Success, "A potion has already been used on this question")
		return
	}
	//Check if he has a potion of this kind in his inventory Or do i have to check this?
	inventoryCheck := bson.A{
		bson.M{
			"$match": bson.M{"_id": currUser.ID},
		},
		bson.M{
			"$match": bson.M{"inventory.Elixir": elixir.Elixir},
		},
	}
	cursor, err := app.db.Collection("users").Aggregate(r.Context(), inventoryCheck)
	if err != nil {
		app.log.Errorf("Internal Server Error %s", err.Error())
		app.sendResponse(w, false, InternalServerError, "Something went wrong")
		return
	}
	var fetchEli []FetchedElixir
	if err := cursor.All(r.Context(), &fetchEli); err != nil {
		app.log.Errorf("Internal Server Error: %s", err.Error())
		app.sendResponse(w, false, InternalServerError, "Something went wrong")
		return
	}
	if len(fetchEli) == 0 {
		app.sendResponse(w, false, Success, "You do not have any Unlock Hint potions")
		return
	}
	questSpec := bson.A{
		bson.M{
			"$match": bson.M{"region": elixir.Region, "level": elixir.Question},
		},
		bson.M{
			"$project": bson.M{
				"hints": bson.M{
					"$filter": bson.M{
						"input": "$hints",
						"as":    "hint",
						"cond": bson.M{
							"$eq": bson.A{"$$hint.hintType", 1},
						},
					},
				},
			},
		},
	}
	cursor2, err := app.db.Collection("questions").Aggregate(r.Context(), questSpec)

	if err != nil {
		app.log.Errorf("Internal Server Error: %s", err.Error())
		app.sendResponse(w, false, InternalServerError, "Something went wrong")
		return
	}
	var fetchedHint []FetchedHint
	if err := cursor2.All(r.Context(), &fetchedHint); err != nil {
		app.log.Errorf("Internal Server Error: %s", err.Error())
		app.sendResponse(w, false, InternalServerError, "Something went wrong")
		return
	}
	if len(fetchedHint) == 0 {
		app.sendResponse(w, false, Success, fetchedHint)
		return
	}
	//Change itemBOOl of that region to  false so no more potions can be used
	//TODO: Log info to the elixir collection
	app.logElixir(r, elixir, true, false)
	currUser.ItemBool[elixir.Region] = false
	app.sendResponse(w, false, Success, fetchedHint[0])
	//TODO: Delete hint from the user's inventory

}

func (app *App) regionMultipler(w http.ResponseWriter, r *http.Request) {
	currUser := app.getUserTest(r)
	//TODO:Frontend sends id of potion check if he has it in his inventory of not, and then apply to the question

	var elixir FetchedElixir
	json.NewDecoder(r.Body).Decode(&elixir)
	if currUser.ItemBool[elixir.Region] == false {
		app.sendResponse(w, false, Success, "A potion has already been used on this question")
		return
	}
	//Check if he has a potion of this kind in his inventory Or do i have to check this?
	inventoryCheck := bson.A{ //TODO: Change to currUser checking, db doesn't work!!!!!
		bson.M{
			"$match": bson.M{"_id": currUser.ID},
		},
		bson.M{
			"$match": bson.M{"inventory.Elixir": elixir.Elixir},
		},
	}
	cursor, err := app.db.Collection("users").Aggregate(r.Context(), inventoryCheck)
	if err != nil {
		app.log.Errorf("Internal Server Error %s", err.Error())
		app.sendResponse(w, false, InternalServerError, "Something went wrong")
		return
	}
	var fetchEli []FetchedElixir
	if err := cursor.All(r.Context(), &fetchEli); err != nil {
		app.log.Errorf("Internal Server Error: %s", err.Error())
		app.sendResponse(w, false, InternalServerError, "Something went wrong")
		return
	}
	if len(fetchEli) == 0 {
		app.log.Infof("%v", fetchEli)
		app.sendResponse(w, false, Success, "You do not have any Region Multiplier potions")
		return
	}
	if _, err := app.db.Collection("users").UpdateOne(
		r.Context(),
		bson.M{"_id": currUser.ID},
		bson.M{"$set": bson.M{"regionmultiplier": elixir.Region}},
	); err != nil {
		app.log.Errorf("Internal Server Error: %v", err.Error())
		app.sendResponse(w, false, InternalServerError, "Something went wrong")
		return
	}

	app.log.Infof("Multiplier applied to region %d", elixir.Region)
	//Log info to the elixir collection
	app.logElixir(r, elixir, true, false)
	currUser.ItemBool[elixir.Region] = false
	app.sendResponse(w, true, Success, "Multiplier applied successfully")
	//TODO: Delete From Inventory
}
