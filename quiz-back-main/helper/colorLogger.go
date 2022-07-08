package helper

import (
	"fmt"
	"log"
)

// ColorLogger comment
type ColorLogger struct {
	debugStart   string
	infoStart    string
	warningStart string
	errorStart   string
	end          string
}

// NewColorLogger construct
func NewColorLogger() *ColorLogger {
	logger := new(ColorLogger)
	logger.debugStart = "\033[94m"
	logger.infoStart = "\033[92m"
	logger.warningStart = "\033[93m"
	logger.errorStart = "\033[91m"
	logger.end = "\033[0m"
	return logger
}

// Debug : log debug level
func (logger *ColorLogger) Debug(format string, a ...interface{}) {
	message := fmt.Sprintf(format, a...)
	log.Printf("%s%s%s", logger.debugStart, message, logger.end)
}

// Info : log info level
func (logger *ColorLogger) Info(format string, a ...interface{}) {
	message := fmt.Sprintf(format, a...)
	log.Printf("%s%s%s", logger.infoStart, message, logger.end)
}

// Warning : log warning level
func (logger *ColorLogger) Warning(format string, a ...interface{}) {
	message := fmt.Sprintf(format, a...)
	log.Printf("%s%s%s", logger.warningStart, message, logger.end)
}

// Error : log error level
func (logger *ColorLogger) Error(format string, a ...interface{}) {
	message := fmt.Sprintf(format, a...)
	log.Printf("%s%s%s", logger.errorStart, message, logger.end)
}
