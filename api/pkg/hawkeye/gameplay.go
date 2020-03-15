package hawkeye

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
	
)

//FetchedQuestion ...
type FetchedQuestion struct {
	ID       primitive.ObjectID `json:"id" bson:"_id"`
	Level    int                `json:"level" bson:"level"`
	Region   int                `json:"region" bson:"region"`
	Question string             `json:"question" bson:"question"`
	Hints    []Hint             `json:"hints" bson:"hints"`
}

//QuestionRequest ...
type QuestionRequest struct {
	Region int `json:"region" bson:"region"`
}

//FetchQuestion ...
func (app *App) fetchQuestion(w http.ResponseWriter, r *http.Request) {

	params := mux.Vars(r)
	region, err := strconv.Atoi(params["region"])
	if err != nil {
		app.log.Errorf("Bad Params:%s", err.Error())
		app.sendResponse(w, false, BadRequest, nil)
		return
	}
	currUser := app.getUserTest(r)

	if currUser.Level[region] <= 0 {
		app.sendResponse(w, false, Success, "Region Locked")
		return
	}

	questSpec := bson.A{
		bson.M{
			"$match": bson.M{"region": region, "level": currUser.Level[region]},
		},
		bson.M{
			"$project": bson.M{
				"level":    1,
				"question": 1,
				"region":   1,
				"hints": bson.M{
					"$filter": bson.M{
						"input": "$hints",
						"as":    "hint",
						"cond": bson.M{
							"$eq": bson.A{"$$hint.active", true},
						},
					},
				},
			},
		},
	}

	cursor, err := app.db.Collection("questions").Aggregate(r.Context(), questSpec)

	if err != nil {
		app.log.Errorf("Internal Server Error: %s", err.Error())
		app.sendResponse(w, false, InternalServerError, "Something went wrong")
		return
	}
	var questions []FetchedQuestion
	if err := cursor.All(r.Context(), &questions); err != nil {
		app.log.Errorf("Internal Server Error: %s", err.Error())
		app.sendResponse(w, false, InternalServerError, "Something went wrong")
		return
	}
	if len(questions) == 0 {
		app.sendResponse(w, false, Success, questions)
		return
	}
	app.sendResponse(w, true, Success, questions[0])
}

//AnswerRequest ...
type AnswerRequest struct {
	Answer string `json:"answer" bson:"answer"`
	Region int    `json:"region" bson:"region"`
}

func (app *App) answerController(w http.ResponseWriter, r *http.Request) {

	currUser := app.getUserTest(r)

	var ansReq AnswerRequest
	json.NewDecoder(r.Body).Decode(&ansReq)

	region := ansReq.Region
	level := currUser.Level[ansReq.Region]
	fmt.Println(region)
	fmt.Println(level)
	//Fetch the Question that is going to be answered
	var answerQues Question
	err := app.db.Collection("questions").FindOne(r.Context(), bson.M{"level": level, "region": region}).Decode(&answerQues)

	if err != nil {
		fmt.Println(err)
		app.log.Error("Database Error")
		app.sendResponse(w, false, InternalServerError, "Something went wrong")
		return
	}

	//Check if answer is close, wrong or correct
	matchResult := checkAnswer(sanitize(ansReq.Answer), answerQues.Answer)

	newSubmission := Submission{
		ID:        primitive.NewObjectID(),
		CreatedAt: time.Now(),

		Region: region,
		Level:  level,
		Answer: ansReq.Answer,
		Status: matchResult,
	}

	updateOptions := options.FindOneAndUpdate()
	updateOptions.SetSort(bson.M{"created_at": -1})
	app.db.Collection("users").FindOneAndUpdate(r.Context(),
		bson.M{"_id": currUser.ID},

		bson.M{"$push": bson.M{"submissions": newSubmission}},
		updateOptions,
	)

	if matchResult == WrongAnswer {
		app.sendResponse(w, true, Success, "Wrong Answer")
		return
	}
	if matchResult == CloseAnswer {
		app.sendResponse(w, true, Success, "Close Answer")
		return
	}

	//Only gets here if the answer is correct
	newMult := currUser.Multiplier

	//Change scoring system after every 5th question
	if currUser.Multiplier%5 == 0 {
		newMult = int(float64(newMult) * ScoringGradient)
	}

	//If a certain number of questions are answered in a region, unlock new region
	if currUser.Level[region]+1 == RegionLimit {
		app.unlockNextRegion(currUser, r)
	}

	//Update level of the region
	levelSon := fmt.Sprintf("level.%d", ansReq.Region)
	itemBool := fmt.Sprintf("itembool.%d", ansReq.Region)
	//Update points, answer count and multiplier, change item bool to true
	app.db.Collection("users").FindOneAndUpdate(r.Context(),
		bson.M{"_id": currUser.ID},
		bson.M{
			"$set": bson.M{
				"points":       currUser.Points + currUser.Multiplier,
				"answer_count": currUser.AnswerCount + 1,
				"multiplier":   newMult,
				levelSon:       currUser.Level[ansReq.Region] + 1,
				itemBool:       true,
			},
		},
	)
	app.sendResponse(w, true, Success, "Correct Answer")
	return
}

func (app *App) unlockNextRegion(currUser User, r *http.Request) {
	nextUnlock := currUser.UnlockedRegions + 1
	if nextUnlock < 7 {
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

//RankResponse ...
type RankResponse struct {
	AtPar    int `json:"atPar"`
	Leading  int `json:"leading"`
	Trailing int `json:"trailing"`
}

//Rank ...
type Rank struct {
	Count int `json:"count"`
}

func (app *App) fetchSubmissions(w http.ResponseWriter, r *http.Request) {
	currUser, err := app.getCurrentUser(r)

	params := mux.Vars(r)
	level, errlvl := strconv.Atoi(params["level"])
	region, errrgn := strconv.Atoi(params["region"])

	if errlvl != nil || errrgn != nil {
		app.sendResponse(w, false, InternalServerError, nil)
		return
	}

	var submissions []Submission

	cursor, err := app.db.Collection("users").Aggregate(r.Context(),
		bson.A{
			bson.M{"$match": bson.M{"_id": currUser.ID, "level": level, "region": region}},
			bson.M{
				"$project": bson.M{
					"submissions": 1,
				},
			},
		},
	)

	if err != nil {
		app.log.Errorf("Database Error:%s", err.Error())
		app.sendResponse(w, false, InternalServerError, nil)
		return
	}

	if err := cursor.All(r.Context(), &submissions); err != nil {
		app.log.Errorf("Internal Server Error:%s", err.Error())
		return
	}

	app.sendResponse(w, true, Success, submissions)

}

func (app *App) rankController(w http.ResponseWriter, r *http.Request) {
	currUser := app.getUserTest(r)

	var atPar []Rank
	var trailing []Rank
	var leading []Rank

	curAtPar, err := app.db.Collection("users").Aggregate(r.Context(), bson.A{
		bson.M{
			"$match": bson.M{
				"points": currUser.Points,
			},
		},
		bson.M{"$count": "count"},
	})

	if err != nil {
		app.log.Errorf("Internal Server Error:%s", err.Error())
		app.sendResponse(w, false, InternalServerError, err.Error())
		return
	}

	if err = curAtPar.All(r.Context(), &atPar); err != nil {
		app.log.Errorf("Internal Server Error:%s", err.Error())
		app.sendResponse(w, false, InternalServerError, err.Error())
		return
	}

	curTrailing, err := app.db.Collection("users").Aggregate(r.Context(), bson.A{
		bson.M{
			"$match": bson.M{
				"points": bson.M{"$lt": currUser.Points},
			},
		},
		bson.M{"$count": "count"},
	})

	if err != nil {
		app.log.Errorf("Internal Server Error:%s", err.Error())
		app.sendResponse(w, false, InternalServerError, nil)
		return
	}
	if err = curTrailing.All(r.Context(), &trailing); err != nil {
		app.log.Errorf("Internal Server Error:%s", err.Error())
		app.sendResponse(w, false, InternalServerError, nil)
		return
	}

	curLeading, err := app.db.Collection("users").Aggregate(r.Context(), bson.A{
		bson.M{
			"$match": bson.M{
				"points": bson.M{"$gt": currUser.Points},
			},
		},
		bson.M{"$count": "count"},
	})

	if err != nil {
		app.log.Errorf("Internal Server Error:%s", err.Error())
		app.sendResponse(w, false, InternalServerError, nil)
		return
	}
	if err = curLeading.All(r.Context(), &leading); err != nil {
		app.log.Errorf("Internal Server Error:%s", err.Error())
		app.sendResponse(w, false, InternalServerError, nil)
		return
	}
	
	var stats RankResponse
	
	if len(atPar) <= 0 {
	    stats.AtPar = 0
	} else {
	    stats.AtPar = atPar[0].Count
	}
	
	if len(leading) <= 0{
	    stats.Leading = 0
	} else {
	    stats.Leading = leading[0].Count
	}
	
	if len(trailing) <= 0 {
	    stats.Trailing = 0
	} else {
	    stats.Trailing = trailing[0].Count
	}

	app.sendResponse(w, true, Success, stats)
}
