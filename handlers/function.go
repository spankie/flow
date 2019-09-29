package handlers

import (
	"log"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/spankie/flow/db"
	"github.com/spankie/flow/models"
)

func GetFlowFunctions(c *gin.Context) {
	flowID, valid := c.GetPostForm("flow_id")
	if !valid {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Request"})
		return
	}
	functions := []models.Function{}
	errors := db.DB.Where("flow_id = ?", flowID).Find(&functions).GetErrors()
	if len(errors) > 0 {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error: Could not retrieve all functions"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": functions})
}

func CreateFlow(c *gin.Context) {
	name := c.PostForm("name")
	file := c.PostForm("file")
	flowID, err := strconv.Atoi(c.PostForm("flow_id"))
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
		return
	}
	function := models.Function{
		Name:   name,
		File:   file,
		FlowID: uint(flowID),
	}

	errors := db.DB.Create(&function).GetErrors()
	if len(errors) > 0 {
		log.Println(errors)
		c.JSON(http.StatusBadRequest, gin.H{"errors": errors})
		return
	}
	// get the function id the flow belongs to...
	c.JSON(200, gin.H{"message": "Function Created successfully"})
}
