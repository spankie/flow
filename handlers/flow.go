package handlers

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/spankie/flow/db"
	"github.com/spankie/flow/models"
)

// CreateFlowHandler Creates a new flow
func CreateFlowHandler(c *gin.Context) {
	/// parse the content of the request
	// name, _ := c.GetPostForm("name")
	// description, _ := c.GetPostForm("description")
	// log.Printf("name: %s\ndesc: %s\n\n", name, description)
	flow := models.Flow{}
	// Name:        name,
	// Description: description,

	c.BindJSON(&flow)
	errors := db.DB.Create(&flow).GetErrors()
	if len(errors) > 0 {
		log.Printf("validation errors: %v\n", errors)
		c.JSON(401, gin.H{"errors": errors})
		return
	}
	c.JSON(200, gin.H{"message": "Flow created successfully"})
}

// GetAllFlowsHandler retireives all Flows
func GetAllFlowsHandler(c *gin.Context) {
	flows := []models.Flow{}
	errors := db.DB.Find(&flows).GetErrors()
	if len(errors) > 0 {
		c.JSON(500, gin.H{"errors": "Internal server error: Can't retrieve flows"})
		return
	}
	c.JSON(200, gin.H{"message": flows})
}
