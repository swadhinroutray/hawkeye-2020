package hawkeye

import (
	"encoding/json"
	"net/http"
	"regexp"
	"strings"

	"github.com/texttheater/golang-levenshtein/levenshtein"
	"gopkg.in/go-playground/validator.v9"
)

//ValidationError ...
type ValidationError struct {
	Field string `json:"field"`
	Error string `json:"eror"`
}

//ResponseMessage ...
type ResponseMessage int

//Setting enum ...
const (
	Success = iota
	BadRequest
	InvalidData
	Conflict
	Unauthorized
	InternalServerError
)

//HTTP Status message ...
func (r ResponseMessage) String() string {
	return [...]string{
		"SUCCESS",
		"BAD_REQUEST",
		"INVALID_DATA",
		"CONFLICT",
		"UNAUTHORIZED",
		"SERVER_ERROR",
	}[r]
}

//Status ... HTTPStatus
func (r ResponseMessage) Status() int {
	return [...]int{
		http.StatusOK,
		http.StatusBadRequest,
		http.StatusUnprocessableEntity,
		http.StatusConflict,
		http.StatusUnauthorized,
		http.StatusInternalServerError,
	}[r]
}

//Response Struct ...
type Response struct {
	Success bool        `json:"success"`
	Message string      `json:"message"`
	Data    interface{} `json:"data"`
}

func (app *App) sendResponse(w http.ResponseWriter, success bool, message ResponseMessage, data interface{}) {
	w.WriteHeader(message.Status())
	if err := json.NewEncoder(w).Encode(Response{
		success,
		message.String(),
		data,
	}); err != nil {
		app.log.Errorf("Error sending response %s", err.Error())
		json.NewEncoder(w).Encode("Something went Wrong")
	}
}
func (app *App) sendDecodeError(w http.ResponseWriter, err error) {
	app.log.Infof("Decode Error %s", err.Error())
	app.sendResponse(w, false, BadRequest, nil)
}
func (app *App) sendValidationError(w http.ResponseWriter, err error) {
	var verrors []ValidationError
	for _, err := range err.(validator.ValidationErrors) {
		verr := ValidationError{Field: err.StructField(), Error: err.Tag()}
		verrors = append(verrors, verr)
		app.log.Infof("%#v", verr)
	}
	app.sendResponse(w, false, InvalidData, verrors)
}
func sanitize(s string) string {
	reg := regexp.MustCompile("[^a-z0-9]+")
	s = strings.Replace(s, " ", "", -1)
	s = strings.ToLower(s)
	s = reg.ReplaceAllString(s, "")
	return s
}

//Answer Types
const (
	CorrectAnswer = "CORRECT"
	CloseAnswer   = "CLOSE"
	WrongAnswer   = "WRONG"
)

func checkAnswer(userAnswer string, answer string) string {
	tally := levenshtein.RatioForStrings([]rune(userAnswer), []rune(answer), levenshtein.DefaultOptions)
	if tally == 1 {
		return CorrectAnswer
	}
	if tally >= 0.65 {
		return CloseAnswer
	}
	return WrongAnswer
}
