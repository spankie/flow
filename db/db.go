package db

import (
	"log"
	"os"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

var DB *gorm.DB

func init() {
	var err error
	DB, err = gorm.Open("mysql", os.Getenv("DB_URL"))
	if err != nil {
		log.Fatal("Could not connect to database.")
	}
}
