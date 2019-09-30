package handlers

import (
	"log"
	"net/http"
	"path/filepath"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func FileUpload(c *gin.Context) {
	// retrieve the file here...
	// single file
	file, _ := c.FormFile("file")
	log.Println(file.Filename)

	rnd := uuid.New()
	dst := strings.Builder{}
	dst.WriteString("assets/images/")
	dst.WriteString(rnd.String())
	dst.WriteString(filepath.Ext(file.Filename))
	// Upload the file to specific dst.
	err := c.SaveUploadedFile(file, dst.String())
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "File Uploaded successfully", "filename": dst.String()})
}
