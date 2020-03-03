package hawkeye

import (
	"gopkg.in/go-playground/validator.v9"
)

func (app *App) buildValidator() {
	validate := validator.New()
	validate.RegisterStructValidation(registerRequestValidation, RegisterRequest{})

	app.validate = validate
}

func registerRequestValidation(sl validator.StructLevel) {
	registerRequest := sl.Current().Interface().(RegisterRequest)

	if registerRequest.Password != registerRequest.ConfirmPassword {
		sl.ReportError(registerRequest.ConfirmPassword, "confirmPass", "ConfirmPassword", "confirmPass", "")
	}
}
