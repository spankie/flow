package db

import "github.com/spankie/flow/models"

func Migrate() {
	DB.AutoMigrate(&models.Flow{})
}
