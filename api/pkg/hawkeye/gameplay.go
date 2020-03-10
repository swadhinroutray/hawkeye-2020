package hawkeye

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
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

	//Fetch the Question that is going to be answered
	var answerQues Question
	err := app.db.Collection("questions").FindOne(r.Context(), bson.M{"level": level, "region": region}).Decode(&answerQues)

	if err != nil {
		app.log.Error("Database Error")
		app.sendResponse(w, false, InternalServerError, "Something went wrong")
		return
	}

	//Check if answer is close, wrong or correct
	matchResult := checkAnswer(sanitize(ansReq.Answer), answerQues.Answer)

	//Log the answer, along with status, region, level
	app.db.Collection("users").FindOneAndUpdate(r.Context(),
		bson.M{"_id": currUser.ID},
		bson.M{
			"$push": bson.M{
				"submissions": bson.M{
					"answer": answerQues.Answer,
					"status": matchResult,
					"region": answerQues.Region,
					"level":  level,
				},
			},
		},
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
