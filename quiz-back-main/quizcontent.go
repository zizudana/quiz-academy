package main

import (
	"net/http"
	"regexp"
	"strconv"
	"strings"

	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type quizContentStruct struct {
	QuizID  primitive.ObjectID `json:"quiz_id" bson:"quiz_id"`
	Number  int64              `json:"number" bson:"number"`
	Chapter int64              `json:"chapter" bson:"chapter"`
	Content string             `json:"content" bson:"content"`
	Image   string             `json:"image" bson:"image"`
	// Twins   primitive.ObjectID `json:"twins" bson:"twins"`
}

type quizContentStructWithObjectID struct {
	ObjectID primitive.ObjectID `json:"_id" bson:"_id"`
	QuizID   primitive.ObjectID `json:"quiz_id" bson:"quiz_id"`
	Number   int64              `json:"number" bson:"number"`
	Chapter  int64              `json:"chapter" bson:"chapter"`
	Content  string             `json:"content" bson:"content"`
	Image    string             `json:"image" bson:"image"`
	// Twins    primitive.ObjectID `json:"twins" bson:"twins"`
}

func initQuizContent(e *echo.Echo) {
	e.POST("/quizcontents", createQuizContent)
	e.GET("/quizcontents/id/:hex", readQuizContentByID)
	e.GET("/quizcontents/quizid/:quizid/:number", readQuizContentByQuizID)
	e.GET("/quizcontents/chapter/:chapter", existQuizContentByChapter)
	e.PUT("/quizcontents", updateQuizContent)
	e.DELETE("/quizcontents/:hex", deleteQuizContent)
}

func replaceChemicalFormula(originalString string) (replacedString string) {
	formulaRegex := regexp.MustCompile(`([a-zA-Z])\$([0-9x])`)
	replacedString = formulaRegex.ReplaceAllString(originalString, `$1$$_$2`) ////////////

	return
}

func createQuizContent(c echo.Context) error {
	newQuizContent := new(quizContentStruct)

	err := c.Bind(newQuizContent)
	errCheck(err)

	newQuizContent.Content = replaceChemicalFormula(newQuizContent.Content)
	newQuizContent.Content = strings.Replace(newQuizContent.Content, " ", "<br />", -1) ////////////////////////////
	insertOneResult, err := collection["quiz_content"].InsertOne(
		ctx,
		newQuizContent,
	)
	errCheck(err)

	logger.Info("SUCCESS createQuizContent : %s", newQuizContent.QuizID)

	return c.JSON(http.StatusCreated, insertOneResult)
}

func readQuizContentByQuizID(c echo.Context) error {
	quizIDHex := c.Param("quizid")
	quizID, err := primitive.ObjectIDFromHex(quizIDHex)
	errCheck(err)
	quizNumberString := c.Param("number")
	quizNumber, err := strconv.ParseInt(quizNumberString, 10, 64)
	errCheck(err)

	var getResult quizContentStructWithObjectID
	err = collection["quiz_content"].FindOne(
		ctx,
		bson.M{
			"quiz_id": quizID,
			"number":  quizNumber,
		},
	).Decode(&getResult)
	errCheck(err)

	logger.Info("SUCCESS readQuizContent : %s %s", quizIDHex, quizNumberString)

	return c.JSON(http.StatusOK, getResult)
}

func readQuizContentByID(c echo.Context) error {
	hex := c.Param("hex")
	objectID, err := primitive.ObjectIDFromHex(hex)
	errCheck(err)

	var getResult quizContentStructWithObjectID
	err = collection["quiz_content"].FindOne(
		ctx,
		bson.M{
			"_id": objectID,
		},
	).Decode(&getResult)
	errCheck(err)

	logger.Info("SUCCESS readQuizContent : %s", hex)

	return c.JSON(http.StatusOK, getResult)
}

func existQuizContentByChapter(c echo.Context) error {
	chapter := c.Param("chapter")
	quizChapter, err := strconv.ParseInt(chapter, 10, 64)
	errCheck(err)

	itemCount, err := collection["quiz_content"].CountDocuments(
		ctx,
		bson.M{
			"Chapter": quizChapter,
		},
	)
	errCheck(err)

	logger.Info("SUCCESS existQuizContent! : %s", chapter)
	if 0 < itemCount {
		return c.JSON(http.StatusOK, bson.M{
			"is_exist": true,
		})
	}
	// 오답노트에 없음
	return c.JSON(http.StatusOK, bson.M{
		"is_exist": false,
	})
}

func updateQuizContent(c echo.Context) error {
	inputQuizContent := new(quizContentStructWithObjectID)
	err := c.Bind(inputQuizContent)
	errCheck(err)

	updateResult, err := collection["quiz_content"].UpdateOne(
		ctx,
		bson.M{
			"_id": inputQuizContent.ObjectID,
		},
		bson.M{
			"$set": bson.M{
				"content": inputQuizContent.Content,
			},
		},
	)
	errCheck(err)

	logger.Info("SUCCESS updateQuizContent : %s", inputQuizContent.ObjectID)

	return c.JSON(http.StatusOK, updateResult)
}

func deleteQuizContent(c echo.Context) error {
	hex := c.Param("hex")
	objectID, err := primitive.ObjectIDFromHex(hex)
	errCheck(err)

	deleteResult, err := collection["quiz_content"].DeleteOne(
		ctx,
		bson.M{
			"_id": objectID,
		},
	)
	errCheck(err)

	logger.Info("SUCCESS deleteQuizContent : %s", hex)

	return c.JSON(http.StatusOK, deleteResult)
}
