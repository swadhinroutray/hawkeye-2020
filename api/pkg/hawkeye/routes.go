package hawkeye

func (app *App) mountRoutes() {
	api := app.router.PathPrefix("/api").Subrouter()

	api.HandleFunc("/hello", app.HelloWork).Methods("GET")
	api.HandleFunc("/allusers", app.GetUser).Methods("GET")
	//api.HandleFunc("/random", app.RegionString).Methods("GET")
	api.HandleFunc("/adduser", app.AddUser).Methods("POST")
}
