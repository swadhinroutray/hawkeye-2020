package hawkeye

func (app *App) mountRoutes() {
	api := app.router.PathPrefix("/api").Subrouter()

	api.HandleFunc("/hello", app.HelloWork).Methods("GET")
	api.HandleFunc("/allusers", app.GetUser).Methods("GET")
	api.HandleFunc("/adduser", app.AddUser).Methods("POST")

	//Authentication Routes
	auth := api.PathPrefix("/auth").Subrouter()
	auth.HandleFunc("/register", app.registerController).Methods("POST")
	auth.HandleFunc("/login", app.loginController).Methods("POST")
	auth.HandleFunc("/logout", app.logoutController).Methods("POST")
	auth.HandleFunc("/forgotpassword", app.forgotPassword).Methods("POST")
	auth.HandleFunc("/resetpassword", app.resetPassword).Methods("POST")

	//Admin Routes
	admin := api.PathPrefix("/admin").Subrouter()
	admin.HandleFunc("/unlocknextregions", app.withAdmin(app.unlockNextRegionForAll)).Methods("POST")
	admin.HandleFunc("/addquestion", app.withAdmin(app.addQuestion)).Methods("POST")
	admin.HandleFunc("/addhint", app.withAdmin(app.addHint)).Methods("POST")
	admin.HandleFunc("/edithint/{region}/{level}/{id}", app.withAdmin(app.editHint)).Methods("POST")
	admin.HandleFunc("/hiddenhint", app.withAdmin(app.addHiddenHint)).Methods("POST")
	admin.HandleFunc("/user/all", app.withAdmin(app.listUsers)).Methods("GET")
	admin.HandleFunc("/user/ban/{id}", app.withAdmin(app.banUser)).Methods("PUT")
	admin.HandleFunc("/user/unban/{id}", app.withAdmin(app.unbanUser)).Methods("PUT")
	admin.HandleFunc("/question/{lvl}/{region}", app.withAdmin(app.levelQuestion)).Methods("GET")
	admin.HandleFunc("/question/{region}", app.withAdmin(app.regionQuestions)).Methods("GET")

	//Question Routes
	questions := api.PathPrefix("/question").Subrouter()
	questions.HandleFunc("/fetch/{region}", app.withUser(app.fetchQuestion)).Methods("GET")
	questions.HandleFunc("/answer", app.withUser(app.answerController)).Methods("POST")
	questions.HandleFunc("/getsubmissions/{region}/{level}", app.withUser(app.fetchSubmissions)).Methods("GET")

	//Elixir Routes
	elixir := api.PathPrefix("/elixir").Subrouter()
	elixir.HandleFunc("/unlockhint", app.withUser(app.unlockExtraHint)).Methods("POST")
	elixir.HandleFunc("/regionmultiply", app.withUser(app.regionMultipler)).Methods("POST")
	elixir.HandleFunc("/hangman", app.withUser(app.hangMan)).Methods("POST")
	elixir.HandleFunc("/perks/{region}/{level}", app.withUser(app.getHiddenHints)).Methods("GET")
	elixir.HandleFunc("/skipquestion", app.withUser(app.skipQuestion)).Methods("POST")

	//Shop Routes
	shop := api.PathPrefix("/shop").Subrouter()
	shop.HandleFunc("/buy/{elixirid}", app.withUser(app.buyElixir)).Methods("POST")
	shop.HandleFunc("/getinventory", app.withUser(app.sendInventory)).Methods("GET")
	shop.HandleFunc("/tobuy", app.withUser(app.canBuy)).Methods("GET")
	shop.HandleFunc("/resetstore", app.withUser(app.resetStore)).Methods("GET")
	shop.HandleFunc("/remaining", app.withUser(app.getRemainingElixirs)).Methods("GET")
	//User Routes
	Users := api.PathPrefix("/users").Subrouter()
	Users.HandleFunc("/getprofile", app.withUser(app.getProfile)).Methods("GET")
	Users.HandleFunc("/getrank", app.withUser(app.rankController)).Methods("GET")
}
