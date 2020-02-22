package hawkeye

import (
	"encoding/json"
	"fmt"
	"net/http"
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
