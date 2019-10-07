package main

import (
	"flag"
	"log"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/spankie/flow/db"
	"github.com/spankie/flow/handlers"
	"github.com/spankie/flow/middlewares"
)

func main() {

	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// close the database after the servers stops
	db.ConnectDB()
	DB := db.DB
	defer DB.Close()

	// get command line flags
	migrate := flag.Bool("migrate", false, "Run migrations")
	flag.Parse()

	if *migrate {
		// run migrations here...
		db.Migrate()
		return
	}

	r := gin.Default()
	r.Use(middlewares.CORSMiddleware())

	api := r.Group("/api")
	api.POST("/flow", handlers.CreateFlowHandler)
	api.GET("/flow", handlers.GetAllFlowsHandler)
	api.POST("/function", handlers.CreateFlowFunction)
	api.GET("/function", handlers.GetFlowFunctions)
	api.DELETE("/function", handlers.DeleteFunction)
	api.POST("/upload", handlers.FileUpload)

	r.Static("/assets", "./assets")
	r.GET("/", handlers.HomeHandler)
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})
	err = r.Run() // listen and serve on 0.0.0.0:8080
	if err != nil {
		log.Fatal(err)
	}
}
