package models

import "github.com/jinzhu/gorm"

type Flow struct {
	gorm.Model
	Name        string `json:"name"`
	Description string `json:"description"`
}
