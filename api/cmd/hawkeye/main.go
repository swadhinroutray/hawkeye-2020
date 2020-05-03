package main

import (
	"hawkeye2020/api/pkg/hawkeye"
)

func main() {
	app := &hawkeye.App{}
	app.InitApp()
	app.Start()

}
