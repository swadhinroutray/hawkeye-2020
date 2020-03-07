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
	questions.HandleFunc("/fetch", app.withUser(app.fetchQuestion)).Methods("GET")
	questions.HandleFunc("/addquestion", app.withAdmin(app.addQuestion)).Methods("POST")

	//Elixir Routes
	elixir := api.PathPrefix("/elixir").Subrouter()
	elixir.HandleFunc("/unlockhint", app.withUser(app.unlockExtraHint)).Methods("POST")
	elixir.HandleFunc("/regionmultiply", app.withUser(app.regionMultipler)).Methods("POST")

	//User Routes
	Users := api.PathPrefix("/users").Subrouter()
	Users.HandleFunc("/getprofile", app.withUser(app.getProfile)).Methods("GET")
}
