package hawkeye

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

//User (Collection)...
type User struct { //TODO: Fix number of items
	ID        primitive.ObjectID `bson:"_id"        json:"id"`
	CreatedAt time.Time          `bson:"created_at" json:"createdAt"`
	UpdatedAt time.Time          `bson:"updated_at" json:"updatedAt"`

	Name     string `bson:"name"     json:"name"`
	Username string `bson:"username" json:"username"`
	Password string `bson:"password" json:"-"`
	Email    string `bson:"email"    json:"email"`
	Mobile   string `bson:"mobile"   json:"mobile"`
	College  string `bson:"college"  json:"college"`

	Level        [7]int   `bson:"level"  json:"level"` //Levels across multiple regions
	Access       int      `bson:"access" json:"access"`
	Banned       bool     `bson:"banned" json:"banned"`
	Inventory    []Elixir `bson:"inventory" json:"inventory"` // Inventory items implemmentation (How many does each user have?)
	Points       int      `bson:"points" json:"points"`       //Check how to implement points
	RegionUnlock []int    `bson:"regionunlock" json:"-"`
	ItemBool     [7]bool  `bson:"itembool" json:"itembool"` // Check wether an item has already been used on a question
	ToBuy        []int    `bson:"tobuy"  json:"tobuy"`      //How many left to be bough for ech usr, if you have doubt call sanchit and ask
	History      []Elixir `bson:"history" json:"history"`
	Token        string   `bson:"token" json:"-"`
}

//Test ...
// type Test struct {
// 	ID      primitive.ObjectID `bson:"_id" json:"id"`
// 	Content string             `bson:"content" json:"content"`
// }

//Question (Collection)...
type Question struct {
	ID        primitive.ObjectID `bson:"_id"        json:"id"`
	CreatedAt time.Time          `bson:"created_at" json:"createdAt"`
	UpdatedAt time.Time          `bson:"updated_at" json:"updatedAt"`

	Level    int    `bson:"level"    json:"level"`
	Region   int    `bson:"region"   json:"region"`
	Question string `bson:"question" json:"question"`
	Answer   string `bson:"answer"   json:"answer,omitempty"`
	AddInfo  string `bson:"add_info" json:"addInfo,omitempty"`

	Hints []Hint `bson:"hints" json:"hints"`
}

//Hint ...
type Hint struct {
	ID        primitive.ObjectID `bson:"_id"        json:"id"`
	CreatedAt time.Time          `bson:"created_at" json:"createdAt"`
	UpdatedAt time.Time          `bson:"updated_at" json:"updatedAt"`

	Level  int    `bson:"level" json:"level"`
	Hint   string `bson:"hint"   json:"hint"`
	Active bool   `bson:"active" json:"active"`
}

//Submission (Collection)...
type Submission struct {
	ID        primitive.ObjectID `bson:"_id"          json:"id"`
	CreatedAt time.Time          `bson:"created_at" json:"createdAt"`

	User     primitive.ObjectID `bson:"user_id"  json:"user"`
	Level    int                `bson:"level"    json:"level"`
	Username string             `bson:"username" json:"username"`
	Answer   string             `bson:"answer" json:"answer"`
	Status   string             `bson:"status"   json:"status"`
	Points   int                `bson:"points"   json:"points"`
}

//Region ...
type Region struct {
	ID        primitive.ObjectID `bson:"_id"          json:"id"`
	CreatedAt time.Time          `bson:"created_at" json:"createdAt"`
}

//Elixir (Collection) ...
type Elixir struct {
	ID       primitive.ObjectID `bson:"_id"          json:"id"`
	BoughtAt time.Time          `bson:"bought_at" json:"BoughtAt"`
	UsedAt   time.Time          `bson:"used_at" json:"UsedAt"`
	Elixir   int                `bson:"elixir" json:"elixir"`
	Active   bool               `bson:"active"  json:"active"`
	Region   int                `bson:"region" json:"region"`
	Question int                `bson:"question" json:"question"`
}

/*What potions are we keeping?
- Region Multiplier
- Hangman
- Extra Hint
-
*/
/*
	Every five questions, we have a multiplier for the next one

*/
