package hawkeye

import (
	"encoding/json"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

// AddQuestionRequest ...
type AddQuestionRequest struct {
	Region   int      `json:"region" bson:"region"`
	Level    int      `json:"level" bson:"level"`
	Question string   `bson:"question" json:"question"`
	Answer   string   `bson:"answer"   json:"answer,omitempty"`
	AddInfo  string   `bson:"add_info" json:"addInfo,omitempty"`
	Keywords []string `bson:"keywords" json:"keywords"`
}

func (app *App) addQuestion(w http.ResponseWriter, r *http.Request) {
	var quesBody AddQuestionRequest
	if err := json.NewDecoder(r.Body).Decode(&quesBody); err != nil {
		app.sendDecodeError(w, err)
		return
	}
	if err := app.validate.Struct(quesBody); err != nil {
		app.sendValidationError(w, err)
		return
	}
	//Check if question does not already exist
	if err := app.db.Collection("questions").FindOne(r.Context(), bson.M{
		"region": quesBody.Region,
		"level":  quesBody.Level,
	}).Decode(nil); err != mongo.ErrNoDocuments {
		verr := ValidationError{Field: "Region", Error: "Reigion already has this Question"}
		app.log.Infof("%#v", verr)
		app.sendResponse(w, false, Conflict, []ValidationError{verr})
		return
	}

	newQues := Question{
		ID:        primitive.NewObjectID(),
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
		Region:    quesBody.Region,
		Level:     quesBody.Level,
		Question:  strings.TrimSpace(quesBody.Question),
		Answer:    sanitize(strings.TrimSpace(quesBody.Answer)),
		AddInfo:   quesBody.AddInfo,
		Hints:     []Hint{},
		Keywords:  quesBody.Keywords,
	}

	res, err := app.db.Collection("questions").InsertOne(r.Context(), newQues)
	if err != nil {
		app.log.Infof("Database Error %v", err.Error())
		app.sendResponse(w, false, InternalServerError, "Something went Wrong")
		return
	}
	app.log.Infof("Added New Question ", res)
	app.sendResponse(w, true, Success, newQues)
}

//AddHintRequest ...
type AddHintRequest struct {
	Region int    `json:"region" bson:"region"`
	Level  int    `json:"level" bson:"level"`
	Hint   string `json:"hint" bson:"hint"`
}

func (app *App) addHint(w http.ResponseWriter, r *http.Request) {

	var reqBody AddHintRequest
	if err := json.NewDecoder(r.Body).Decode(&reqBody); err != nil {
		app.sendDecodeError(w, err)
		return
	}

	if err := app.validate.Struct(reqBody); err != nil {
		app.sendValidationError(w, err)
		return
	}
	filter := bson.M{
		"region": reqBody.Region,
		"level":  reqBody.Level,
	}
	if _, err := app.db.Collection("questions").Find(r.Context(), filter); err != nil {
		app.log.Errorf("Question does not exist ")
		app.sendResponse(w, false, InternalServerError, "Question doesn't exist")
		return
	}

	newHint := Hint{
		ID:        primitive.NewObjectID(),
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),

		Level:  reqBody.Level,
		Region: reqBody.Region,
		Hint:   strings.TrimSpace(reqBody.Hint),
		Active: false,
	}

	filter = bson.M{"level": reqBody.Level, "region": reqBody.Region}
	update := bson.M{"$push": bson.M{"hints": newHint}}

	_, err := app.db.Collection("questions").UpdateOne(r.Context(), filter, update)
	if err != nil {
		app.sendResponse(w, false, InternalServerError, "Something went wrong")
		return
	}

	app.log.Infof("New hint added %v", newHint)
	app.sendResponse(w, true, Success, newHint)
}

func (app *App) addHiddenHint(w http.ResponseWriter, r *http.Request) {

	var reqBody AddHintRequest
	if err := json.NewDecoder(r.Body).Decode(&reqBody); err != nil {
		app.sendDecodeError(w, err)
		return
	}

	if err := app.validate.Struct(reqBody); err != nil {
		app.sendValidationError(w, err)
		return
	}

	newHint := Hint{
		ID:        primitive.NewObjectID(),
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),

		Level:  reqBody.Level,
		Region: reqBody.Region,
		Hint:   strings.TrimSpace(reqBody.Hint),
		Active: false,
		Users:  []string{""},
	}

	//filter := bson.M{"level": reqBody.Level, "region": reqBody.Region}
	_, err := app.db.Collection("hiddenhints").InsertOne(r.Context(), newHint)
	if err != nil {
		app.sendResponse(w, false, InternalServerError, "Something went wrong")
		return
	}

	app.log.Infof("New hidden hint added %v", newHint)
	app.sendResponse(w, true, Success, newHint)
}

//EditHintRequest ...
type EditHintRequest struct {
	Hint   *string `json:"hint"`
	Active *bool   `json:"active"`
}

func (app *App) editHint(w http.ResponseWriter, r *http.Request) {

	params := mux.Vars(r)

	level, err1 := strconv.Atoi(params["level"])
	region, err2 := strconv.Atoi(params["region"])
	if err1 != nil || err2 != nil {
		app.log.Infof("Bad request params")
		app.sendResponse(w, false, BadRequest, nil)
		return
	}

	id, err := primitive.ObjectIDFromHex(params["id"])
	if err != nil {
		app.log.Infof("Bad request params %s", err.Error())
		app.sendResponse(w, false, BadRequest, nil)
		return
	}

	var reqBody EditHintRequest

	if err := json.NewDecoder(r.Body).Decode(&reqBody); err != nil {
		app.sendDecodeError(w, err)
		return
	}

	if err := app.validate.Struct(reqBody); err != nil {
		app.sendValidationError(w, err)
		return
	}

	update := make(bson.M)
	if reqBody.Hint != nil {
		update["hints.$.hint"] = reqBody.Hint
	}
	if reqBody.Active != nil {
		update["hints.$.active"] = reqBody.Active
	}

	if _, err = app.db.Collection("questions").UpdateOne(
		r.Context(),
		bson.M{"level": level, "region": region, "hints._id": id},
		bson.M{
			"$set": update,
		},
	); err != nil {
		app.log.Errorf("Database error %s", err.Error())
		app.sendResponse(w, false, InternalServerError, "Something went wrong")
		return
	}

	app.sendResponse(w, true, Success, "Success")
}
