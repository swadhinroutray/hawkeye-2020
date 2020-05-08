package hawkeye

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

//User (Collection)...
type User struct {
	ID        primitive.ObjectID `bson:"_id"        json:"id"`
	CreatedAt time.Time          `bson:"created_at" json:"createdAt"`
	UpdatedAt time.Time          `bson:"updated_at" json:"updatedAt"`

	Name     string `bson:"name"     json:"name"`
	Username string `bson:"username" json:"username"`
	Password string `bson:"password" json:"-"`
	Email    string `bson:"email"    json:"email"`
	Mobile   string `bson:"mobile"   json:"mobile"`
	College  string `bson:"college"  json:"college"`

	AnswerCount      int          `bson:"answer_count" json:"-"`
	Level            [5]int       `bson:"level"  json:"level"` //Levels across multiple regions
	Submissions      []Submission `bson:"submissions" json:"submissions"`
	Access           int          `bson:"access" json:"access"`
	Banned           bool         `bson:"banned" json:"banned"`
	Inventory        []Elixir     `bson:"inventory" json:"inventory"`   // Inventory items implemmentation (How many does each user have?)
	Points           int          `bson:"points" json:"points"`         //Check how to implement points
	Multiplier       int          `bson:"multiplier" json:"multiplier"` //How many points user gets on answering questions.
	RegionUnlock     []int        `bson:"regionunlock" json:"-"`
	UnlockedRegions  int          `bson:"unlocked" json:"unlocked"`
	ItemBool         [5]bool      `bson:"itembool" json:"itembool"` // Check wether an item has already been used on a question
	ToBuy            []int        `bson:"tobuy"  json:"tobuy"`      //How many left to be bough for ech usr, if you have doubt call sanchit and ask
	History          []Elixir     `bson:"history" json:"history"`
	Token            string       `bson:"token" json:"-"`
	RegionMultiplier int          `bson:"regionmultiplier" json:"regionmultiplier"`
	AllAnswered      bool         `bson:"allanswered" json:"allanswered"`
	NestLevel        int          `bson:"nestlevel" json:"nestlevel"`
	FirstLogin       bool         `bson:"firstlogin" json:"firstlogin"`
}

//Question (Collection)...
type Question struct {
	ID        primitive.ObjectID `bson:"_id"        json:"id"`
	CreatedAt time.Time          `bson:"created_at" json:"createdAt"`
	UpdatedAt time.Time          `bson:"updated_at" json:"updatedAt"`

	Level    int      `bson:"level"    json:"level"`
	Region   int      `bson:"region"   json:"region"`
	Question string   `bson:"question" json:"question"`
	Answer   string   `bson:"answer"   json:"answer,omitempty"`
	AddInfo  string   `bson:"add_info" json:"addInfo,omitempty"`
	Keywords []string `bson:"keywords" json:"keywords"`

	Hints []Hint `bson:"hints" json:"hints"`
}

//Hint ...
type Hint struct {
	ID        primitive.ObjectID `bson:"_id"        json:"id"`
	CreatedAt time.Time          `bson:"created_at" json:"createdAt"`
	UpdatedAt time.Time          `bson:"updated_at" json:"updatedAt"`

	HintNum int      `bson:"hintnum"    json:"hintnum"`
	Level   int      `bson:"level"    json:"level"`
	Region  int      `bson:"region" json:"region"`
	Hint    string   `bson:"hint"   json:"hint"`
	Active  bool     `bson:"active,omitempty" json:"active"`
	Users   []string `bson:"users" json:"-"`
	Elixir  int      `json:"elixir" bson:"elixir"`
}

//Submission (Collection)...
type Submission struct {
	ID        primitive.ObjectID `bson:"_id"          json:"id"`
	CreatedAt time.Time          `bson:"created_at" json:"createdAt"`

	User     primitive.ObjectID `bson:"user_id"  json:"user"`
	Region   int                `bson:"region" json:"region"`
	Level    int                `bson:"level"    json:"level"`
	Username string             `bson:"username" json:"username"`
	Answer   string             `bson:"answer" json:"answer"`
	Status   string             `bson:"status"   json:"status"`
	Points   int                `bson:"points"   json:"points"`
}

//CountUnlockRegion ...
type CountUnlockRegion struct {
	ID           primitive.ObjectID `bson:"_id"          json:"id"`
	CountRegions int                `bson:"countRegions" json:"-"`
}

//Elixir (Collection) ...
type Elixir struct {
	ID         primitive.ObjectID `bson:"_id"          json:"id"`
	BoughtAt   time.Time          `bson:"bought_at" json:"BoughtAt"`
	UsedAt     time.Time          `bson:"used_at" json:"UsedAt"`
	Elixir     int                `bson:"elixir" json:"elixir"`
	ElixirName string             `bson:"elixir_name" json:"elixir_name"`
	Active     bool               `bson:"active"  json:"active"`
	Region     int                `bson:"region" json:"region"`     //When bought it is initialised to -1
	Question   int                `bson:"question" json:"question"` //When bought it is initialised to -1
}
