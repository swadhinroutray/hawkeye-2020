package hawkeye

func (app *App) mountRoutes() {
	api := app.router.PathPrefix("/api").Subrouter()

	api.HandleFunc("/hello", app.HelloWork).Methods("GET")
	api.HandleFunc("/allusers", app.GetUser).Methods("GET")
	//api.HandleFunc("/random", app.RegionString).Methods("GET")
	api.HandleFunc("/adduser", app.AddUser).Methods("POST")

	//Authentication Routes
	auth := api.PathPrefix("/auth").Subrouter()
	auth.HandleFunc("/register", app.registerController).Methods("POST")
	auth.HandleFunc("/login", app.loginController).Methods("POST")
	auth.HandleFunc("/logout", app.logoutController).Methods("POST")
	//Question Routes
	questions := api.PathPrefix("/question").Subrouter()
	questions.HandleFunc("/fetch", app.fetchQuestion).Methods("GET")

	//Elixir Routes
	potions := api.PathPrefix("/elixir").Subrouter()
	potions.HandleFunc("/unlockhint", app.unlockExtraHint).Methods("POST")

	//User Routes
	Users := api.PathPrefix("/users").Subrouter()
	Users.HandleFunc("/getprofile", app.getProfile).Methods("GET")
}
