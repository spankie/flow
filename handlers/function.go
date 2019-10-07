package handlers

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"github.com/spankie/flow/db"
	"github.com/spankie/flow/models"
)

func GetFlowFunctions(c *gin.Context) {
	flowID, valid := c.GetQuery("flow_id")
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

func CreateFlowFunction(c *gin.Context) {
	// name := c.PostForm("name")
	// file := c.PostForm("file")
	// flowID, err := strconv.Atoi(c.PostForm("flow_id"))
	// if err != nil {
	// log.Println(err)
	// c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
	// return
	// }
	function := models.Function{}
	c.BindJSON(&function)

	log.Println(function)
	if function.PrevFuncID > 0 {
		function.ID = function.PrevFuncID + 1
		// change the if o the rest
		db.DB.Table("functions").
			Where("flow_id = ?", function.FlowID).
			Where("id > ?", function.PrevFuncID).
			Order("id desc").Update("id", gorm.Expr("id+1"))
	}
	errs := db.DB.Create(&function).GetErrors()
	if len(errs) > 0 {
		log.Println(errs)
		c.JSON(http.StatusBadRequest, gin.H{"errors": errs})
		return
	}
	// get the function id the flow belongs to...
	c.JSON(http.StatusOK, gin.H{"message": "Function Created successfully"})
}

func DeleteFunction(c *gin.Context) {
	fID, valid := c.GetQuery("f")
	if !valid {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Request"})
		return
	}
	errors := db.DB.Where("id = ?", fID).Delete(models.Function{}).GetErrors()
	if len(errors) > 0 {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error: Could not delete"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Function delete successfully"})
}
