package hawkeye

import (
	"math/rand"
	"net/http"
)

//RegionString ...
func (app *App) regionString(w http.ResponseWriter, r *http.Request) []int {
	return rand.Perm(7)
}
