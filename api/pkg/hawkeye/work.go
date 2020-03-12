package hawkeye

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
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

//AddUser ...
func (app *App) AddUser(w http.ResponseWriter, r *http.Request) {
	newUser := User{
		ID:        primitive.NewObjectID(),
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),

		Name:     "John Doe",
		Username: "jdoe",
	}

	res, err := app.db.Collection("users").InsertOne(r.Context(), newUser)
	if err != nil {
		fmt.Printf("Error")
	}
	fmt.Printf("Added User: %s", res)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(newUser)
}

//GetUser ...
func (app *App) GetUser(w http.ResponseWriter, r *http.Request) {

	findOpts := options.Find()

	cur, err := app.db.Collection("users").Find(r.Context(), bson.D{}, findOpts)
	if err != nil {
		fmt.Printf("Database Error:%s", err)
	}

	var allUsers []User

	w.Header().Set("Content-Type", "application/json")

	if err := cur.All(r.Context(), &allUsers); err != nil {
		fmt.Println("Error on route /allusers")
		return
	}

	json.NewEncoder(w).Encode(allUsers)

}

//Send User id and will return the user
func (app *App) getProfile(w http.ResponseWriter, r *http.Request) {
	//Get user Profile
	var currUser CurrUser
	currUser, err := app.getCurrentUser(r)
	// if err != nil{
	// 	app.log.Errorf("Internal Server Error:  %v", err.Error())
	// 	app.sendResponse(w,false,InternalServerError,"something went wrong")
	// 	return
	// }
	// id,err :=primitive.ObjectIDFromHex(currUser)
	// fmt.Println(id)
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
