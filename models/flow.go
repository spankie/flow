package models

import (
	"errors"

	"github.com/jinzhu/gorm"
)

type Flow struct {
	gorm.Model
	Name        string `json:"name" valid:"required"`
	Description string `json:"description" valid:"required"`
	Functions   []Function
}

func (flow Flow) Validate(db *gorm.DB) {
	if len(flow.Name) < 0 {
		// name is not available...
		db.AddError(errors.New("Name cannot be blank"))
	}
	if len(flow.Description) < 0 {
		// name is not available...
		db.AddError(errors.New("Description cannot be blank"))
	}
}
