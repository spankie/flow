package handlers

import "github.com/gin-gonic/gin"

func GetFlowFunctions(c *gin.Context) {

	c.JSON(200, gin.H{"message": "Welcome to my first gin app"})
}

func CreateFlow(c *gin.Context) {

	// get the function id the flow belongs to...
	c.JSON(200, gin.H{"message": "Welcome to my first gin app"})
}
