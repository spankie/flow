package models

import "github.com/jinzhu/gorm"

type Flow struct {
	gorm.Model
	ID          string `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
}
