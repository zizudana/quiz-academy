package main

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type wrongContentStruct struct {
	QuizID    primitive.ObjectID `json:"quiz_id" bson:"quiz_id"`
	Chapter   int64              `json:"chapter" bson:"chapter"`
	StudentID primitive.ObjectID `json:"student_id" bson:"student_id"`
	Number    int64              `json:"number" bson:"number"`
}

type wrongContentStructWithObjectID struct {
	ObjectID  primitive.ObjectID `json:"_id" bson:"_id"`
	QuizID    primitive.ObjectID `json:"quiz_id" bson:"quiz_id"`
	Chapter   int64              `json:"chapter" bson:"chapter"`
	StudentID primitive.ObjectID `json:"student_id" bson:"student_id"`
	Number    int64              `json:"number" bson:"number"`
}

func initWrongContent(e *echo.Echo) {
	e.POST("/wrongcontents", createWrongContent)
	e.GET("/wrongcontents/id/:hex", readWrongContentByID)
	e.GET("/wrongcontents/quizid/:quizid/:number", readWrongContentByQuizID)
	e.GET("/wrongcontents/all/:student-id", readWrongContentAll)
	e.GET("/wrongcontents/chapter/:chapter", readWrongContentByChapter)
	e.GET("/wrongcontents/count/:chapter", countContentByChapter)
	e.GET("/wrongcontents/is-exist/:quizid", existQuiz)
	e.PUT("/wrongcontents", updateWrongContent)
	e.DELETE("/wrongcontents/:hex", deleteWrongContent)
}

func createWrongContent(c echo.Context) error {
	newWrongContent := new(wrongContentStruct)

	err := c.Bind(newWrongContent)
	errCheck(err)

	insertOneResult, err := collection["wrong_content"].InsertOne(
		ctx,
		bson.M{
			"quiz_id":    newWrongContent.QuizID,
			"number":     newWrongContent.Number,
			"chapter":    newWrongContent.Chapter,
			"student_id": newWrongContent.StudentID,
		},
	)
	errCheck(err)

	logger.Info("SUCCESS createWrongContent : %s", newWrongContent.QuizID)

	return c.JSON(http.StatusCreated, insertOneResult)
}

func existQuiz(c echo.Context) error {
	quizIDHex := c.Param("quizid")
	quizID, err := primitive.ObjectIDFromHex(quizIDHex)
	errCheck(err)

	itemCount, err := collection["wrong_content"].CountDocuments(
		ctx,
		bson.M{
			"quiz_id": quizID,
		},
	)
	errCheck(err)

	logger.Info("SUCCESS readIsExistID : %s", quizID)

	// 오답노트에 이미 존재
	if 0 < itemCount {
		fmt.Println("truee")
		return c.JSON(http.StatusOK, bson.M{
			"is_exist": true,
		})
	}

	// 오답노트에 없음
	fmt.Println("falseee")
	return c.JSON(http.StatusOK, bson.M{
		"is_exist": false,
	})
}

func readWrongContentByQuizID(c echo.Context) error {
	quizIDHex := c.Param("quizid")
	quizID, err := primitive.ObjectIDFromHex(quizIDHex)
	errCheck(err)

	errCheck(err)

	var getResult quizContentStructWithObjectID
	err = collection["wrong_content"].FindOne(
		ctx,
		bson.M{
			"quiz_id": quizID,
		},
	).Decode(&getResult)
	errCheck(err)

	logger.Info("SUCCESS readQuizContent : %s", quizIDHex)

	return c.JSON(http.StatusOK, getResult)
}

func readWrongContentByID(c echo.Context) error {
	hex := c.Param("hex")
	objectID, err := primitive.ObjectIDFromHex(hex)
	errCheck(err)

	var getResult quizContentStructWithObjectID
	err = collection["wrong_content"].FindOne(
		ctx,
		bson.M{
			"_id": objectID,
		},
	).Decode(&getResult)
	errCheck(err)

	logger.Info("SUCCESS readWrongContent : %s", hex)

	return c.JSON(http.StatusOK, getResult)
}

func readWrongContentAll(c echo.Context) error {
	hex := c.Param("student-id")
	studentID, err := primitive.ObjectIDFromHex(hex)
	errCheck(err)

	cur, err := collection["wrong_content"].Find(
		ctx,
		bson.M{
			"student_id": studentID,
		},
	)
	errCheck(err)
	defer cur.Close(ctx)

	wrongContentArr := []*wrongContentStructWithObjectID{}

	for cur.Next(ctx) {
		wrongContentResult := new(wrongContentStructWithObjectID)
		err := cur.Decode(&wrongContentResult)
		errCheck(err)

		wrongContentArr = append(wrongContentArr, wrongContentResult)
	}
	if err := cur.Err(); err != nil {
		return c.JSON(http.StatusInternalServerError, bson.M{
			"message": "FAIL readWrongContentAll",
		})
	}

	logger.Info("SUCCESS readWrongContentAll")

	response := bson.M{
		"quiz_set_arr": wrongContentArr,
	}
	fmt.Println(response)
	return c.JSON(http.StatusOK, response)
}

func readWrongContentByChapter(c echo.Context) error {
	chapter := c.Param("chapter")
	wrongChapter, err := strconv.ParseInt(chapter, 10, 64)
	fmt.Println("eeee", wrongChapter)
	errCheck(err)
	cur, err := collection["wrong_content"].Find(
		ctx,
		bson.M{
			"chapter": wrongChapter,
		},
	)
	errCheck(err)
	defer cur.Close(ctx)

	wrongSetArr := []*wrongContentStructWithObjectID{}

	for cur.Next(ctx) {
		wrongSetResult := new(wrongContentStructWithObjectID)
		err := cur.Decode(&wrongSetResult)
		errCheck(err)

		wrongSetArr = append(wrongSetArr, wrongSetResult)
	}
	if err := cur.Err(); err != nil {
		return c.JSON(http.StatusInternalServerError, bson.M{
			"message": "FAIL readWrongSetAll",
		})
	}

	logger.Info("SUCCESS readWrongSetAll")

	response := bson.M{
		"wrong_set_arr": wrongSetArr,
	}
	return c.JSON(http.StatusOK, response)
}

func countContentByChapter(c echo.Context) error {
	chapter := c.Param("chapter")
	wrongChapter, err := strconv.ParseInt(chapter, 10, 64)
	errCheck(err)
	count, err := collection["wrong_content"].CountDocuments(
		ctx,
		bson.M{
			"chapter": wrongChapter,
		},
	)
	errCheck(err)

	logger.Info("SUCCESS countWrongSet")

	response := bson.M{
		"count": count,
	}
	return c.JSON(http.StatusOK, response)
}

func updateWrongContent(c echo.Context) error {
	inputQuizContent := new(quizContentStructWithObjectID)
	err := c.Bind(inputQuizContent)
	errCheck(err)

	updateResult, err := collection["wrong_content"].UpdateOne(
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

func deleteWrongContent(c echo.Context) error {
	hex := c.Param("hex")
	objectID, err := primitive.ObjectIDFromHex(hex)
	errCheck(err)

	deleteResult, err := collection["wrong_content"].DeleteOne(
		ctx,
		bson.M{
			"_id": objectID,
		},
	)
	errCheck(err)

	logger.Info("SUCCESS deleteWrongContent : %s", hex)

	return c.JSON(http.StatusOK, deleteResult)
}
