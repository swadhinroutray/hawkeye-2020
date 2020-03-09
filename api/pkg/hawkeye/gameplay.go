package hawkeye

import (
	"encoding/json"
	"fmt"
	"net/http"

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

//FetchedHint ...
// type FetchedHint struct {
// 	ID   primitive.ObjectID `json:"id" bson:"_id"`
// 	Hint string             `json:"hints" bson:"hints"`
// }

//QuestionRequest ...
type QuestionRequest struct {
	Region int `json:"region" bson:"region"`
}

//FetchQuestion ...
func (app *App) fetchQuestion(w http.ResponseWriter, r *http.Request) {

	currUser := app.getUserTest(r)

	var quesReq QuestionRequest
	json.NewDecoder(r.Body).Decode(&quesReq)
	fmt.Println(currUser)
	if currUser.Level[quesReq.Region] <= 0 {
		app.sendResponse(w, false, Success, "Region Locked")
		return
	}

	questSpec := bson.A{
		bson.M{
			"$match": bson.M{"region": quesReq.Region, "level": currUser.Level[quesReq.Region]},
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

	var answerQues Question
	err := app.db.Collection("questions").FindOne(r.Context(), bson.M{"level": level, "region": region}).Decode(&answerQues)

	if err != nil {
		app.log.Error("Database Error")
		app.sendResponse(w, false, InternalServerError, "Something went wrong")
		return
	}
	matchResult := checkAnswer(sanitize(ansReq.Answer), answerQues.Answer)

	if matchResult == WrongAnswer {
		app.sendResponse(w, true, Success, "Wrong Answer")
		return
	}
	if matchResult == CloseAnswer {
		app.sendResponse(w, true, Success, "Close Answer")
		return
	}

	if matchResult == CorrectAnswer {

		newMult := currUser.Multiplier

		if currUser.Multiplier%5 == 0 {
			newMult = int(float64(newMult) * 1.5)
		}
		levelSon := fmt.Sprintf("level.%d", ansReq.Region)
		app.db.Collection("user").FindOneAndUpdate(r.Context(),
			bson.M{"_id": currUser.ID},
			bson.M{"$set": bson.A{
				bson.M{
					"points":       currUser.Points + currUser.Multiplier,
					"answer_count": currUser.AnswerCount + 1,
					"multiplier":   newMult,
				},
				bson.M{levelSon: currUser.Level[ansReq.Region] + 1},
			},
			},
		)

	}
}
