package handlers

import "github.com/gin-gonic/gin"

func HomeHandler(c *gin.Context) {
	c.JSON(200, gin.H{"message": "Welcome to my first gin app"})
}
