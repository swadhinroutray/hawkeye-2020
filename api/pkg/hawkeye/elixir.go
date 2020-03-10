package hawkeye

import (
	"encoding/json"
	"fmt"
	"math/rand"
	"net/http"
	"strings"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

//FetchedElixir ...
type FetchedElixir struct {
	//ID         primitive.ObjectID `json:"id" bson:"_id"`
	Elixir     int                `json:"elixir" bson:"elixir"`
	Region     int                `json:"region" bson:"region,omitempty"`
	ElixirName string             `bson:"elixir_name" json:"elixir_name"`
	QuestionID primitive.ObjectID `bson:"question" json:"question"`
	QuestionNo int                `bson:"question_no" json:"question_no"`
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
			"$match": bson.M{"_id": elixir.QuestionID},
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
	//Change itemBOOl of that region to  false so no more potions can be used on that question
	app.logElixir(r, elixir, true, false)
	SetField := fmt.Sprintf("ItemBool.%d", elixir.Region)
	filter := bson.M{"_id": currUser.ID}
	update := bson.M{"$set": bson.M{
		SetField: false,
	},
	}
	if _, err := app.db.Collection("users").UpdateOne(r.Context(), filter, update); err != nil {
		app.log.Errorf("Databse error %v", err.Error())
		app.sendResponse(w, false, InternalServerError, "Something went wrong")
		return
	}

	//currUser.ItemBool[elixir.Region] = false
	app.sendResponse(w, false, Success, fetchedHint)
	//TODO: Delete hint from the user's inventory

}

func (app *App) regionMultipler(w http.ResponseWriter, r *http.Request) {
	currUser := app.getUserTest(r)

	var elixir FetchedElixir
	json.NewDecoder(r.Body).Decode(&elixir)
	if currUser.ItemBool[elixir.Region] == false {
		app.sendResponse(w, false, Success, "A potion has already been used on this question")
		return
	}

	inventoryCheck := bson.A{
		bson.M{
			"$match": bson.M{"_id": currUser.ID},
		},
		bson.M{
			"$match": bson.M{"inventory.elixir": elixir.Elixir},
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

	SetField := fmt.Sprintf("itembool.%d", elixir.Region)
	filter := bson.M{"_id": currUser.ID}
	update := bson.M{"$set": bson.M{
		SetField: false,
	},
	}
	if _, err := app.db.Collection("users").UpdateOne(r.Context(), filter, update); err != nil {
		app.log.Errorf("Databse error %v", err.Error())
		app.sendResponse(w, false, InternalServerError, "Something went wrong")
		return
	}
	//TODO: Delete From Inventory DONE :)
	if _, err := app.db.Collection("users").UpdateOne(
		r.Context(),
		bson.M{"_id": currUser.ID},
		bson.M{"$pull": bson.M{"inventory": bson.M{"elixir": 1}}},
	); err != nil {
		app.log.Errorf("Internal Server Error: %v", err.Error())
		app.sendResponse(w, false, InternalServerError, "Something went wrong")
		return
	}

	app.log.Infof("Multiplier applied to region %d", elixir.Region)
	app.logElixir(r, elixir, true, false)
	app.sendResponse(w, true, Success, "Multiplier applied successfully")

}

func (app *App) hangMan(w http.ResponseWriter, r *http.Request) {
	var fetchedElixir FetchedElixir
	json.NewDecoder(r.Body).Decode(&fetchedElixir)

	var fetchedQuestion Question
	err := app.db.Collection("questions").FindOne(r.Context(), bson.M{"_id": fetchedElixir.QuestionID}).Decode(&fetchedQuestion)

	if err != nil {
		app.log.Errorf("Internal Server Error: %s", err.Error())
		app.sendResponse(w, false, InternalServerError, "Something went wrong")
	}

	unlockedHint := app.hangmanRemoveLetter(fetchedQuestion.Answer)

	app.sendResponse(w, true, Success, unlockedHint)
}

func (app *App) hangmanRemoveLetter(Answer string) string {

	lenAnswer := len(Answer)
	var i int
	var j int
	if lenAnswer > 5 {
		j = 5
	} else {
		j = 2
	}

	taken := make([]int, len(Answer))

	for i = 0; i < j; i++ {
		taken[i] = rand.Intn(lenAnswer)
	}

	thing := make([]string, len(Answer))
	k := 0
	for i = 0; i < lenAnswer; i++ {
		if in(taken, j, i) {
			thing[i] = string(Answer[i])
			k = k + 1
		} else {
			thing[i] = "-"
		}
	}

	hintUnlocked := strings.Join(thing, "")
	return hintUnlocked

}

func in(arr []int, n int, val int) bool {
	var i int
	for i = 0; i < n; i++ {
		if arr[i] == val {
			return true
		}
	}
	return false
}
