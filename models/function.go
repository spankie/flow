package models

import (
	"errors"

	"github.com/jinzhu/gorm"
)

type Function struct {
	gorm.Model
	Name   string `json:"name"`
	File   string `json:"file"`
	FlowID uint   `json:"flow_id"`
	Flow   Flow   `json:"flow"`
}

func (f Function) Validate(db *gorm.DB) {
	if len(f.Name) < 0 {
		// name is not available...
		db.AddError(errors.New("Name cannot be blank"))
	}
	if len(f.File) < 0 {
		// name is not available...
		db.AddError(errors.New("File cannot be blank"))
	}
	if f.FlowID < 1 {
		// name is not available...
		db.AddError(errors.New("Flow ID cannot be blank"))
	}
}
