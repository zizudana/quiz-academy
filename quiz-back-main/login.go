package main

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson"
	"golang.org/x/crypto/bcrypt"
)

func initLogin(e *echo.Echo) {
	e.GET("/logins/:id", readLogin)
}

func readLogin(c echo.Context) error {
	id := c.Param("id")
	password := c.QueryParam("password")

	var getResult userStructWithID // id, password
	err := collection["user"].FindOne(
		ctx,
		bson.M{
			"id": id,
		},
	).Decode(&getResult)
	errCheck(err)

	err = bcrypt.CompareHashAndPassword([]byte(getResult.Password), []byte(password))
	if err != nil {
		if err == bcrypt.ErrMismatchedHashAndPassword {
			logger.Info("Fail readLogin : password error %s", id)

			return c.JSON(http.StatusUnauthorized, bson.M{
				"message": "password authentication failed",
			})
		}
		errCheck(err)

		logger.Info("Fail readLogin : %s", id)

		return c.JSON(http.StatusNotFound, bson.M{
			"message": "Unknown Error",
		})
	}

	logger.Info("SUCCESS readManager : %s", id)

	return c.JSON(http.StatusOK, bson.M{
		"user_name": getResult.UserName,
		"user_type": getResult.UserType,
		"user_id":   getResult.ObjectID,
	})
}
