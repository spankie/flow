package main

import (
	"flag"
	"log"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/spankie/flow/db"
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
	r.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{"message": "Welcome to my first gin app"})
	})
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
