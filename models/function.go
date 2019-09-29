package models

import "github.com/jinzhu/gorm"

type Function struct {
	gorm.Model
	Name   string `json:"name"`
	File   string `json:"file"`
	FlowID uint   `json:"flow_id"`
	Flow   Flow   `json:"flow"`
}
