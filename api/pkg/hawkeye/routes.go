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
	questions.HandleFunc("/answer", app.withUser(app.answerController)).Methods("POST")

	//Elixir Routes
	elixir := api.PathPrefix("/elixir").Subrouter()
	elixir.HandleFunc("/unlockhint", app.withUser(app.unlockExtraHint)).Methods("POST")
	elixir.HandleFunc("/regionmultiply", app.withUser(app.regionMultipler)).Methods("POST")
	elixir.HandleFunc("/hangman", app.withUser(app.hangMan)).Methods("POST")

	shop := api.PathPrefix("/shop").Subrouter()
	shop.HandleFunc("/buy/{elixirid}", app.withUser(app.buyElixir)).Methods("POST")
	shop.HandleFunc("/getinventory", app.withUser(app.sendInventory)).Methods("GET")
	shop.HandleFunc("/tobuy", app.withUser(app.canBuy)).Methods("GET")

	//User Routes
	Users := api.PathPrefix("/users").Subrouter()
	Users.HandleFunc("/getprofile", app.withUser(app.getProfile)).Methods("GET")
}
