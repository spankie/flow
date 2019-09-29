package handlers

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/spankie/flow/db"
	"github.com/spankie/flow/models"
)

func CreateFlowHandler(c *gin.Context) {
	/// parse the content of the request
	name := c.PostForm("name")
	description := c.PostForm("description")
	flow := models.Flow{
		Name:        name,
		Description: description,
	}

	errors := db.DB.Create(&flow).GetErrors()
	if len(errors) > 0 {
		log.Printf("validation errors: %v\n", errors)
		c.JSON(401, gin.H{"errors": errors})
		return
	}
	c.JSON(200, gin.H{"message": "Flow created successfully"})
}

func GetAllFlowsHandler(c *gin.Context) {
	flows := []models.Flow{}
	errors := db.DB.Find(&flows).GetErrors()
	if len(errors) > 0 {
		c.JSON(500, gin.H{"errors": "Internal server error: Can't retrieve flows"})
		return
	}
	c.JSON(200, gin.H{"message": flows})
}
