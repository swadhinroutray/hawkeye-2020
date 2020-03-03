package hawkeye

import (
	"context"
	"net/http"

	"go.mongodb.org/mongo-driver/bson"
)

func jsonResponse(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		next.ServeHTTP(w, r)
	})
}

type responseContextKey int

const (
	userKey responseContextKey = iota
)

func (app *App) withAuth(requireLogin bool, requireAdmin bool, next http.HandlerFunc) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if requireLogin {

			CurrUser, err := app.getCurrentUser(r)
			if err != nil {
				app.log.Infof("Not Logged in")
				app.sendResponse(w, false, Unauthorized, "Not Logged in")
				return
			}
			var user User
			err = app.db.Collection("users").FindOne(r.Context(), bson.M{"_id": CurrUser.ID}).Decode(&user)
			if err != nil {
				app.log.Info("Database Error: %s", err.Error())
				app.sendResponse(w, false, Unauthorized, "Something went wrong")
				return
			}
			user.Password = ""
			if requireAdmin {
				if user.Access != 1 {
					app.log.Infof("Not an Admin")
					app.sendResponse(w, false, Unauthorized, "Not an Admin")
					return
				}

			}
			ctx := context.WithValue(r.Context(), userKey, user)
			r = r.WithContext(ctx)
		}
		next.ServeHTTP(w, r)
	})
}

// withUser to wrap gameplay routes(login but no admin access)
func (app *App) withUser(next http.HandlerFunc) http.HandlerFunc {
	return app.withAuth(true, false, next)
}

// withUser to wrap admin routes login required and admin access)
func (app *App) withAdmin(next http.HandlerFunc) http.HandlerFunc {
	return app.withAuth(true, true, next)
}
