package hawkeye

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct { //TODO: Fix number of potions
	ID        primitive.ObjectID `bson:"_id"        json:"id"`
	CreatedAt time.Time          `bson:"created_at" json:"createdAt"`
	UpdatedAt time.Time          `bson:"updated_at" json:"updatedAt"`

	Name     string `bson:"name"     json:"name"`
	Username string `bson:"username" json:"username"`
	Password string `bson:"password" json:"-"`
	Email    string `bson:"email"    json:"email"`
	Mobile   string `bson:"mobile"   json:"mobile"`
	College  string `bson:"college"  json:"college"`

	Level        [7]int  `bson:"level"  json:"level"` //Levels across multiple regions
	Access       int     `bson:"access" json:"access"`
	Banned       bool    `bson:"banned" json:"banned"`
	Inventory    []int   `bson:"inventory" json:"inventory"` // Inventory items implemmentation (How many does each user have?)
	Points       int     `bson:"points" json:"points"`       //Check how to implement points
	RegionUnlock string  `bson:"regionunlock" json:"regionunlock"`
	PotionBool   [7]bool `bson:"potionbool" json:"potionbool"` // Check wether a potiion has already been used on a question
	ToBuy        []int   `bson:"tobuy"  json:"tobuy"`          //How many left to be bough for ech usr, if you have doubt call sanchit and ask
}

type Question struct {
	ID        primitive.ObjectID `bson:"_id"        json:"id"`
	CreatedAt time.Time          `bson:"created_at" json:"createdAt"`
	UpdatedAt time.Time          `bson:"updated_at" json:"updatedAt"`

	Level    int    `bson:"level"    json:"level"`
	Question string `bson:"question" json:"question"`
	Answer   string `bson:"answer"   json:"answer,omitempty"`
	AddInfo  string `bson:"add_info" json:"addInfo,omitempty"`

	Hints []Hint `bson:"hints" json:"hints"`
}

type Hint struct {
	ID        primitive.ObjectID `bson:"_id"        json:"id"`
	CreatedAt time.Time          `bson:"created_at" json:"createdAt"`
	UpdatedAt time.Time          `bson:"updated_at" json:"updatedAt"`

	Level  int    `bson:"level" json:"level"`
	Hint   string `bson:"hint"   json:"hint"`
	Active bool   `bson:"active" json:"active"`
}

type Submission struct {
	ID        primitive.ObjectID `bson:"_id"          json:"id"`
	CreatedAt time.Time          `bson:"created_at" json:"createdAt"`

	User     primitive.ObjectID `bson:"user_id"  json:"user"`
	Level    int                `bson:"level"    json:"level"`
	Username string             `bson:"username" json:"username"`
	Answer   string             `bson:"answer" json:"answer"`
	Status   string             `bson:"status"   json:"status"`
}
type Region struct {
	ID         primitive.ObjectID `bson:"_id"          json:"id"`
	CreatedAt  time.Time          `bson:"created_at" json:"createdAt"`
	UnlockedAt time.Time          `bson:"unlocked_at" json:"unlocked_at"` //Unlocking time for each region
	Questions  []Question         `bson:"questions" json:"questions"`     //Questions for each region
}
