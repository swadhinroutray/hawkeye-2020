package hawkeye

import (
	"fmt"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

//ElixirName ...
func ElixirName(elixirtype int) (name string, elixirpoints int) {

	switch elixirtype {
	case 0:
		{
			name = "Extra Hint"
			elixirpoints = UnlockHintPoints
			return name, elixirpoints
		}
	case 1:
		{
			name = "Region Multiplier"
			elixirpoints = RegionMultiplierPoints
			return name, elixirpoints
		}
	case 2:
		{
			name = "Hangman"
			elixirpoints = HangmanHintPoints
			return name, elixirpoints
		}
	default:
		{
			name = "Skip Question"
			elixirpoints = SkipQuestionPoints
			return name, elixirpoints
		}
	}
}

func (app *App) buyElixir(w http.ResponseWriter, r *http.Request) {

	currUser := app.getUserTest(r)
	params := mux.Vars(r)

	elixirID, err := strconv.Atoi(params["elixirid"])
	app.log.Infof("Elixir ID: %d", elixirID)
	if err != nil {
		app.log.Infof("Bad request params %s", err.Error())
		app.sendResponse(w, false, BadRequest, nil)
		return
	}
	if currUser.ToBuy[elixirID] == 0 {
		app.log.Infof("You don't have this potion left")
		app.sendResponse(w, true, Success, "You don't have this potion left to buy!")
		return
	}

	name, elixirpoints := ElixirName(elixirID)

	if currUser.Points == 0 {
		app.log.Infof("You don't have enough points")
		app.sendResponse(w, true, Success, "You don't have enough points!")
		return
	}
	if currUser.Points-elixirpoints < 0 {
		app.log.Infof("You don't have enough points")
		app.sendResponse(w, true, Success, "You don't have enough points!")
		return
	}
	newElixir := Elixir{
		ID:         primitive.NewObjectID(),
		BoughtAt:   time.Now(),
		UsedAt:     time.Time{},
		Elixir:     elixirID,
		ElixirName: strings.TrimSpace(name),
		Active:     false, //Why ?
		Region:     -1,
		Question:   -1,
	}
	filter := bson.M{"_id": currUser.ID}
	update := bson.M{
		"$push": bson.M{"inventory": newElixir},
		"$inc":  bson.M{"points": -elixirpoints},
	}
	if _, err := app.db.Collection("users").UpdateOne(r.Context(), filter, update); err != nil {
		app.log.Errorf("Database Error %v", err.Error())
		app.sendResponse(w, false, InternalServerError, "Something went wrong")
		return
	}

	SetField := fmt.Sprintf("tobuy.%d", elixirID)
	filter = bson.M{"_id": currUser.ID}
	update = bson.M{"$set": bson.M{
		SetField: currUser.ToBuy[elixirID] - 1,
	},
	}
	if _, err := app.db.Collection("users").UpdateOne(r.Context(), filter, update); err != nil {
		app.log.Errorf("Database Error %v", err.Error())
		app.sendResponse(w, false, InternalServerError, "Something went wrong")
		return
	}

	tempFetch := FetchedElixir{
		Elixir:     elixirID,
		Region:     newElixir.Region,
		QuestionNo: newElixir.Question,
	}

	app.LogIP(currUser.Username, r)
	app.log.Infof("Elixir bought successfully")
	app.logElixir(r, tempFetch, false, true)
	app.sendResponse(w, true, Success, "A new elixir has been added to your inventory")
}

func (app *App) sendInventory(w http.ResponseWriter, r *http.Request) {

	currUser, err := app.getCurrentUser(r)
	//var inventory []int
	var curUser User
	filter := bson.M{
		"_id": currUser.ID,
	}
	err = app.db.Collection("users").FindOne(r.Context(), filter).Decode(&curUser)
	if err == mongo.ErrNoDocuments {
		fmt.Println(currUser)
		app.log.Infof("Unable to fetch user")
		app.sendResponse(w, false, InternalServerError, "Databse error")
		return
	}
	if err != nil {
		app.log.Errorf("An error occurred %v", err.Error())
		app.sendResponse(w, false, InternalServerError, "Something went wrong")
		return
	}
	app.log.Infof("Sending inventory")
	app.sendResponse(w, true, Success, curUser.Inventory)
}
func (app *App) canBuy(w http.ResponseWriter, r *http.Request) {

	currUser, err := app.getCurrentUser(r)
	var curUser User
	filter := bson.M{
		"_id": currUser.ID,
	}
	err = app.db.Collection("users").FindOne(r.Context(), filter).Decode(&curUser)
	if err == mongo.ErrNoDocuments {
		fmt.Println(curUser)
		app.log.Infof("Unable to fetch user")
		app.sendResponse(w, false, InternalServerError, "Database error")
		return
	}
	if err != nil {
		app.log.Errorf("An error occurred %v", err.Error())
		app.sendResponse(w, false, InternalServerError, "Something went wrong")
		return
	}
	app.log.Infof("Sending items that can be bought")
	app.sendResponse(w, true, Success, curUser.ToBuy)
}

func (app *App) resetStore(w http.ResponseWriter, r *http.Request) {
	currUser := app.getUserTest(r)

	if currUser.Points < ResetStoreMinValue {
		app.log.Infof("Not enough Points")
		app.sendResponse(w, true, Success, "You do not have enough points")
		return
	}
	var arr []int
	if currUser.RegionMultiplier != -1 {
		arr = []int{2, 0, 2, 1}
	} else {
		arr = []int{2, 1, 2, 1}
	}

	filter := bson.M{
		"_id": currUser.ID,
	}
	update := bson.M{
		"$set": bson.M{"tobuy": arr, "points": currUser.Points - ResetStorePrice},
	}
	if _, err := app.db.Collection("users").UpdateOne(r.Context(), filter, update); err != nil {
		app.log.Errorf("Databse Error %v", err.Error())
		app.sendResponse(w, false, InternalServerError, "Something went wrong")
		return
	}

	app.log.Infof("Store Reset for user!")
	app.sendResponse(w, true, Success, "Store successfully reset")

}

func (app *App) getRemainingElixirs(w http.ResponseWriter, r *http.Request) {
	currUser := app.getUserTest(r)

	inventory := currUser.Inventory
	arr := []int{0, 0, 0, 0}

	for i := 0; i < len(inventory); i++ {
		arr[inventory[i].Elixir]++
	}
	app.sendResponse(w, true, Success, arr)

}
