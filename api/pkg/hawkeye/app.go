package hawkeye

import (
	"context"
	"encoding/hex"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"time"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
	"go.uber.org/zap"
	"gopkg.in/boj/redistore.v1"
	"gopkg.in/go-playground/validator.v9"
)

//App ...
type App struct {
	log          *zap.SugaredLogger
	router       *mux.Router
	db           *mongo.Database
	sessionStore *redistore.RediStore
	validate     *validator.Validate
	config       AppConfig
}

//AppConfig ...
type AppConfig struct {
	production       bool
	databaseName     string
	databaseUser     string
	databasePassword string
	databaseHost     string
	cacheHost        string
	hashKey          []byte
	blockKey         []byte
}

const port = 8080

//InitApp ...
func (app *App) InitApp() {
	app.loadConfig()
	app.connectToMongo()
	app.buildLogger()
	app.buildValidator()
	app.loadRedis()
	app.router = mux.NewRouter()
}

//loadConfig ...
func (app *App) loadConfig() {
	hashKey, errHash := hex.DecodeString(os.Getenv("HASH_KEY"))

	if errHash != nil {
		fmt.Println("Failed to decode Hash Key")
		os.Exit(0)
	}

	if len(hashKey) != 32 {
		fmt.Println("Hash key wrong length")
		os.Exit(0)
	}

	blockKey, errBlock := hex.DecodeString(os.Getenv("BLOCK_KEY"))
	if errBlock != nil {
		fmt.Println("Failed to decode Block")
		os.Exit(0)
	}

	if len(blockKey) != 32 {
		fmt.Println("Block key wrong length")
		os.Exit(0)
	}

	config := AppConfig{
		production:       os.Getenv("MODE") == "production",
		databaseHost:     os.Getenv("DB_HOST"),
		databaseName:     os.Getenv("DB_NAME"),
		databaseUser:     os.Getenv("DB_USER"),
		databasePassword: os.Getenv("DB_PASSWORD"),
		cacheHost:        os.Getenv("REDIS_HOST"),
		hashKey:          hashKey,
		blockKey:         blockKey,
	}

	app.config = config

}

func (app *App) connectToMongo() {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(
		fmt.Sprintf("mongodb://%s:%s@%s:27017/%s",
			app.config.databaseUser,
			app.config.databasePassword,
			app.config.databaseHost,
			app.config.databaseName,
		),
	))
	if err != nil {
		fmt.Println(err.Error())
	}
	ctx, cancel = context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	err = client.Ping(ctx, readpref.Primary())
	if err != nil {
		fmt.Println(err.Error())
	} else {
		fmt.Println("Connected to Database")
	}

	app.db = client.Database(app.config.databaseName)

}
func (app *App) buildLogger() {
	var cfg zap.Config

	if app.config.production {
		cfg = zap.NewProductionConfig()
	} else {
		cfg = zap.NewDevelopmentConfig()
	}

	cfg.OutputPaths = []string{
		"stdout",
	}

	logger, err := cfg.Build()
	if err != nil {
		log.Fatal("Could not initialize Zap logger")
	}
	defer logger.Sync()

	app.log = logger.Sugar()
}

//loadRedis ...
func (app *App) loadRedis() {
	sessions, err := redistore.NewRediStore(10, "tcp", fmt.Sprintf("%s:6379", app.config.cacheHost), "", app.config.hashKey, app.config.blockKey)
	if err != nil {
		fmt.Printf("Error connecting to redis %s", err.Error())
	} else {
		fmt.Println("Created redis store")
	}
	sessions.SetMaxAge(10 * 24 * 3600)
	app.sessionStore = sessions

}

//Start ...
func (app *App) Start() {
	server := &http.Server{
		Addr:         fmt.Sprintf("0.0.0.0:%d", port),
		WriteTimeout: time.Second * 15,
		ReadTimeout:  time.Second * 15,
		IdleTimeout:  time.Second * 60,
		Handler:      app.router,
	}

	app.mountRoutes()

	go func() {
		if err := server.ListenAndServe(); err != nil {
			app.log.Fatal(err.Error())
		}
	}()

	fmt.Printf("Listening on port:%d", port)

	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt)

	<-c

	ctx, cancel := context.WithTimeout(context.Background(), time.Second*2)
	defer cancel()

	server.Shutdown(ctx)

	fmt.Println("Shutting Down")
	os.Exit(0)
}
