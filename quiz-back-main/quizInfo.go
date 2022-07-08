package main

import (
	"fmt"
	"io"
	"net/http"
	"os"
	"os/exec"

	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type quizInfoStruct struct {
	Title           string `json:"title" bson:"title"`
	Count           int64  `json:"count" bson:"count"`
	IsAlive         bool   `json:"is_alive" bson:"is_alive"`
	IsImageUploaded bool   `json:"is_image_uploaded" bson:"is_image_uploaded"`
}

type quizInfoStructWithObjectID struct {
	ObjectID        primitive.ObjectID `json:"_id" bson:"_id"`
	Title           string             `json:"title" bson:"title"`
	Count           int64              `json:"count" bson:"count"`
	IsAlive         bool               `json:"is_alive" bson:"is_alive"`
	IsImageUploaded bool               `json:"is_image_uploaded" bson:"is_image_uploaded"`
}

func initQuizInfo(e *echo.Echo) {
	e.POST("/quizinfos", createQuizInfo)
	e.POST("/quizinfos/images", uploadQuizImages)
	e.GET("/quizinfos/id/:hex", readQuizInfoByID)
	e.GET("/quizinfos/all", readQuizInfoAll)
	e.PUT("/quizinfos/:id", updateQuizInfo)
	e.DELETE("/quizinfos", deleteQuizInfo)
}

func createQuizInfo(c echo.Context) error {
	newQuizInfo := new(quizInfoStruct)

	err := c.Bind(newQuizInfo)
	errCheck(err)

	// if the title is duplicated return 409 Conflict
	count, err := collection["quiz_info"].CountDocuments(
		ctx,
		bson.M{
			"title": newQuizInfo.Title,
		},
	)
	errCheck(err)
	if count > 0 {
		return c.NoContent(http.StatusConflict)
	}

	insertOneResult, err := collection["quiz_info"].InsertOne(
		ctx,
		newQuizInfo,
	)
	errCheck(err)

	logger.Info("SUCCESS createQuizInfo : %s", newQuizInfo.Title)

	return c.JSON(http.StatusCreated, insertOneResult)
}

func uploadQuizImages(c echo.Context) error {
	quizID := c.FormValue("quiz_id")
	zipFile, err := c.FormFile("zip_file")
	errCheck(err)

	quizsetPath := "./files/quizset/" + quizID
	zipFilePath := quizsetPath + ".zip"

	// Read zip file
	src, err := zipFile.Open()
	errCheck(err)
	defer src.Close()

	// Create zip file
	dst, err := os.Create(zipFilePath)
	errCheck(err)
	defer dst.Close()

	// Write zip file
	_, err = io.Copy(dst, src)
	errCheck(err)

	// Unzip zip file
	dateCmd := exec.Command("unzip", zipFilePath, "-d", quizsetPath)
	err = dateCmd.Run()
	errCheck(err)

	// Create objectID from hex
	objectID, err := primitive.ObjectIDFromHex(quizID)
	errCheck(err)

	// Update is_image_uploaded
	_, err = collection["quiz_info"].UpdateOne(
		ctx,
		bson.M{
			"_id": objectID,
		},
		bson.M{
			"$set": bson.M{
				"is_image_uploaded": true,
			},
		},
	)
	errCheck(err)

	logger.Info("SUCCESS uploadQuizImages : %s", quizID)

	return c.String(http.StatusOK, fmt.Sprintf("SUCCESS uploadQuizImages : %s", quizID))
}

func readQuizInfoByID(c echo.Context) error {
	hex := c.Param("hex")
	objectID, err := primitive.ObjectIDFromHex(hex)
	errCheck(err)

	var getResult quizInfoStructWithObjectID
	err = collection["quiz_info"].FindOne(
		ctx,
		bson.M{
			"_id": objectID,
		},
	).Decode(&getResult)
	errCheck(err)

	logger.Info("SUCCESS readQuizInfo : %s", getResult.Title)

	return c.JSON(http.StatusOK, getResult)
}

func readQuizInfoAll(c echo.Context) error {
	cur, err := collection["quiz_info"].Find(
		ctx,
		bson.M{
			"is_alive": true,
		},
	)
	errCheck(err)
	defer cur.Close(ctx)

	quizInfoArr := []*quizInfoStructWithObjectID{}

	for cur.Next(ctx) {
		quizInfoResult := new(quizInfoStructWithObjectID)
		err := cur.Decode(&quizInfoResult)
		errCheck(err)

		quizInfoArr = append(quizInfoArr, quizInfoResult)
	}
	if err := cur.Err(); err != nil {
		return c.JSON(http.StatusInternalServerError, bson.M{
			"message": "FAIL readQuizInfoAll",
		})
	}

	logger.Info("SUCCESS readQuizInfoAll")

	response := bson.M{
		"quiz_info_arr": quizInfoArr,
	}
	return c.JSON(http.StatusOK, response)
}

func updateQuizInfo(c echo.Context) error {
	id := c.Param("id")

	inputquizInfo := new(quizInfoStruct)
	err := c.Bind(inputquizInfo)
	errCheck(err)

	updateResult, err := collection["quiz_info"].UpdateOne(
		ctx,
		bson.M{
			"id": id,
		},
		bson.M{
			"$set": bson.M{
				"count": inputquizInfo.Count,
			},
		},
	)
	errCheck(err)

	logger.Info("SUCCESS updateQuizInfo : %s", id)

	return c.JSON(http.StatusOK, updateResult)
}

func deleteQuizInfo(c echo.Context) error {
	hex := c.QueryParam("objectid")
	objectID, err := primitive.ObjectIDFromHex(hex)
	errCheck(err)

	deleteResult, err := collection["quiz_info"].UpdateOne(
		ctx,
		bson.M{
			"_id": objectID,
		},
		bson.M{
			"$set": bson.M{
				"is_alive": false,
			},
		},
	)
	errCheck(err)

	logger.Info("SUCCESS deleteQuizInfo : %s", hex)

	return c.JSON(http.StatusOK, deleteResult)
}
