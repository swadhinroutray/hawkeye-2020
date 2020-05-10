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
)

//HawksNestfetchSubmissions ...
func (app *App) HawksNestfetchSubmissions(w http.ResponseWriter, r *http.Request) {
	currUser := app.getUserTest(r)

	params := mux.Vars(r)
	level, errlvl := strconv.Atoi(params["level"])

	if errlvl != nil {
		app.sendResponse(w, false, InternalServerError, nil)
		return
	}

	var submissions []Submission

	cursor, err := app.db.Collection("users").Aggregate(r.Context(),
		bson.A{
			bson.M{"$match": bson.M{"_id": currUser.ID, "level": level}},
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
	app.LogIP(currUser.Username, r)
	app.sendResponse(w, true, Success, submissions)

}

//FetchedNestQuestion Request ..
type FetchedNestQuestion struct {
	ID       primitive.ObjectID `json:"id" bson:"_id"`
	Level    int                `json:"level" bson:"level"`
	Question string             `json:"question" bson:"question"`
	Hints    []Hint             `json:"hints" bson:"hints"`
}

//QuestionRequest ...
// type QuestionRequest struct {
// 	Region int `json:"region" bson:"region"`
// }

//FetchQuestion ...
func (app *App) fetchHawksNestQuestion(w http.ResponseWriter, r *http.Request) {

	params := mux.Vars(r)
	level, err := strconv.Atoi(params["level"])
	if err != nil {
		app.log.Errorf("Bad Params:%s", err.Error())
		app.sendResponse(w, false, BadRequest, nil)
		return
	}
	// currUser := app.getUserTest(r)

	questSpec := bson.A{
		bson.M{
			"$match": bson.M{"level": level},
		},
		bson.M{
			"$project": bson.M{
				"level":    1,
				"question": 1,
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

	cursor, err := app.db.Collection("hawksnest").Aggregate(r.Context(), questSpec)

	if err != nil {
		app.log.Errorf("Internal Server Error: %s", err.Error())
		app.sendResponse(w, false, InternalServerError, "Something went wrong")
		return
	}
	var questions []FetchedNestQuestion
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

//AnswerNestRequest ...
type AnswerNestRequest struct {
	Answer string `json:"answer" bson:"answer"`
	Level  int    `json:"level" bson:"level"`
}

// func (app *App) checkKeywords(answer string, keywords []string) bool {
// 	i := 0
// 	for i = 0; i < len(keywords); i++ {
// 		matchResult := checkAnswer(sanitize(answer), keywords[i])
// 		if matchResult == CorrectAnswer || matchResult == CloseAnswer {
// 			return true
// 		}
// 	}
// 	return false
// }

// func (app *App) logSubmission(currUser User, newSubmission Submission, r *http.Request) {
// 	updateOptions := options.FindOneAndUpdate()
// 	updateOptions.SetSort(bson.M{"created_at": -1})
// 	app.db.Collection("users").FindOneAndUpdate(r.Context(),
// 		bson.M{"_id": currUser.ID},

// 		bson.M{"$push": bson.M{"submissions": newSubmission}},
// 		updateOptions,
// 	)
// }

func (app *App) checkNestKeywords(answer string, keywords []string) bool {
	i := 0
	for i = 0; i < len(keywords); i++ {
		matchResult := checkNestKey(sanitize(answer), keywords[i])
		if matchResult == CloseAnswer {
			return true
		}
	}
	return false
}

//HawksNestAnswerController ...
func (app *App) HawksNestAnswerController(w http.ResponseWriter, r *http.Request) {

	currUser := app.getUserTest(r)

	var ansReq AnswerNestRequest
	json.NewDecoder(r.Body).Decode(&ansReq)

	//Fetch the Question that is going to be answered
	var answerQues Question
	err := app.db.Collection("hawksnest").FindOne(r.Context(), bson.M{"level": ansReq.Level}).Decode(&answerQues)

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
		Region:    5,
		Level:     ansReq.Level,
		Answer:    ansReq.Answer,
		Status:    matchResult,
	}

	if matchResult == WrongAnswer {

		keyClose := app.checkNestKeywords(ansReq.Answer, answerQues.Keywords)

		if keyClose {
			newSubmission.Status = CloseAnswer
			app.logSubmission(currUser, newSubmission, r)
			app.sendResponse(w, true, Success, "Close Answer")
			return
		}

		app.logSubmission(currUser, newSubmission, r)
		app.sendResponse(w, true, Success, "Wrong Answer")
		return
	}
	if matchResult == CloseAnswer {
		app.logSubmission(currUser, newSubmission, r)
		app.sendResponse(w, true, Success, "Close Answer")
		return
	}
	app.LogIP(currUser.Username, r)
	app.logSubmission(currUser, newSubmission, r)

	//Only gets here if the answer is correct
	newMult := currUser.Multiplier

	//Change scoring system after every 5th question
	if currUser.AnswerCount%5 == 0 {
		newMult = int(float64(newMult) * ScoringGradient)
	}

	//Update points, answer count and multiplier, change item bool to true
	app.db.Collection("users").FindOneAndUpdate(r.Context(),
		bson.M{"_id": currUser.ID},
		bson.M{
			"$set": bson.M{
				"points":       currUser.Points + int(float64(currUser.Multiplier)),
				"answer_count": currUser.AnswerCount + 1,
				"multiplier":   newMult,
				"nestlevel":    currUser.NestLevel + 1,
			},
		},
	)
	// app.LogIP(newUser.Username, r)
	app.sendResponse(w, true, Success, "Correct Answer")
	return
}
