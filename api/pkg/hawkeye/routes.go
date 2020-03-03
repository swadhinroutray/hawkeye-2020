package hawkeye

func (app *App) mountRoutes() {
	api := app.router.PathPrefix("/api").Subrouter()

	api.HandleFunc("/hello", app.HelloWork).Methods("GET")
	api.HandleFunc("/allusers", app.GetUser).Methods("GET")
	//api.HandleFunc("/random", app.RegionString).Methods("GET")
	api.HandleFunc("/adduser", app.AddUser).Methods("POST")

	auth := api.PathPrefix("/auth").Subrouter()

	auth.HandleFunc("/register", app.registerController).Methods("POST")
	auth.HandleFunc("/login", app.loginController).Methods("POST")

	questions := api.PathPrefix("/question").Subrouter()
	questions.HandleFunc("/fetch", app.fetchQuestion).Methods("GET")

	potions := api.PathPrefix("/elixir").Subrouter()
	potions.HandleFunc("/unlockhint", app.unlockExtraHint).Methods("POST")
}
