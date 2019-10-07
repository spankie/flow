package models

import (
	"errors"

	"github.com/jinzhu/gorm"
)

type Function struct {
	gorm.Model
	Name        string `json:"name"`
	File        string `json:"file"`
	FlowID      uint   `json:"flow_id"`
	Description string `json:"description"`
	PrevFuncID  uint   `json:"prev_func_id" gorm:"-"`
	// Flow   Flow   `json:"flow" binding:"-" form:"-"`
}

func (f Function) Validate(db *gorm.DB) {
	if len(f.Name) < 1 {
		// name is not available...
		db.AddError(errors.New("Name cannot be blank"))
	}
	if len(f.File) < 1 {
		// name is not available...
		db.AddError(errors.New("File cannot be blank"))
	}
	if f.FlowID < 1 {
		// name is not available...
		db.AddError(errors.New("Flow ID cannot be blank"))
	}
	if len(f.Description) < 1 {
		// name is not available...
		db.AddError(errors.New("Description cannot be blank"))
	}
}
