package main

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type solutionContentStruct struct {
	QuizContentID primitive.ObjectID `json:"quiz_content_id" bson:"quiz_content_id"`
	QuizID        primitive.ObjectID `json:"quiz_id" bson:"quiz_id"`
	Number        int64              `json:"number" bson:"number"`
	Answer        int64              `json:"answer" bson:"answer"`
	Content       string             `json:"content" bson:"content"`
	Image   string             `json:"image" bson:"image"`
	Image2  string 			   `json:"image2" bson:"image2"`
}

type solutionContentStructWithObjectID struct {
	ObjectID      primitive.ObjectID `json:"_id" bson:"_id"`
	QuizContentID primitive.ObjectID `json:"quiz_content_id" bson:"quiz_content_id"`
	QuizID        primitive.ObjectID `json:"quiz_id" bson:"quiz_id"`
	Number        int64              `json:"number" bson:"number"`
	Answer        int64              `json:"answer" bson:"answer"`
	Content       string             `json:"content" bson:"content"`
	Image   string             `json:"image" bson:"image"`
	Image2  string 			   `json:"image2" bson:"image2"`
}

func initSolutionContent(e *echo.Echo) {
	e.POST("/solution-contents", createSolutionContent)
	//e.GET("/solution-contents/quizid/:quizid/:number", readSolutionContentByQuizID)
	e.GET("/solution-contents/quizid/:quizid", readSolutionContentByQuizID)
	e.GET("/solution-contents/quiz-set-id/:hex", readSolutionContentAllByQuizSetID)
	e.PUT("/solution-contents", updateSolutionContent)
	e.DELETE("/solution-contents/:hex", deleteSolutionContent)
}

func createSolutionContent(c echo.Context) error {
	newSolutionContent := new(solutionContentStruct)

	err := c.Bind(newSolutionContent)
	errCheck(err)

	newSolutionContent.Content = replaceChemicalFormula(newSolutionContent.Content)

	insertOneResult, err := collection["solution_content"].InsertOne(
		ctx,
		newSolutionContent,
	)
	errCheck(err)

	logger.Info("SUCCESS createSolutionContent : %s", newSolutionContent.QuizID)

	return c.JSON(http.StatusCreated, insertOneResult)
}

func readSolutionContentByQuizID(c echo.Context) error {
	quizIDHex := c.Param("quizid")
	quizID, err := primitive.ObjectIDFromHex(quizIDHex)
	errCheck(err)
	// quizNumberString := c.Param("number")
	// quizNumber, err := strconv.ParseInt(quizNumberString, 10, 64)
	// errCheck(err)

	var getResult solutionContentStructWithObjectID
	err = collection["solution_content"].FindOne(
		ctx,
		bson.M{
			"quiz_id": quizID,
			//"number":  quizNumber,
		},
	).Decode(&getResult)

	errCheck(err)

	//logger.Info("SUCCESS readSolutionContentByQuizID : %s %s", quizIDHex, quizNumberString)
	logger.Info("SUCCESS readSolutionContentByQuizID : %s", quizIDHex)

	return c.JSON(http.StatusOK, getResult)
}

func abcreadQuizSetAll(c echo.Context) error {
	hex := c.Param("student-id")
	studentID, err := primitive.ObjectIDFromHex(hex)
	errCheck(err)

	cur, err := collection["quiz_set"].Find(
		ctx,
		bson.M{
			"student_id": studentID,
			"is_alive":   true,
		},
	)
	errCheck(err)
	defer cur.Close(ctx)

	quizSetArr := []*quizSetStructWithObjectID{}

	for cur.Next(ctx) {
		quizSetResult := new(quizSetStructWithObjectID)
		err := cur.Decode(&quizSetResult)
		errCheck(err)

		quizSetResult.IsSolved = getIsQuizSetSolved(quizSetResult.ObjectID)

		quizSetArr = append(quizSetArr, quizSetResult)
	}
	if err := cur.Err(); err != nil {
		return c.JSON(http.StatusInternalServerError, bson.M{
			"message": "FAIL readQuizSetAll",
		})
	}

	logger.Info("SUCCESS readQuizSetAll")

	response := bson.M{
		"quiz_set_arr": quizSetArr,
	}
	return c.JSON(http.StatusOK, response)
}

func readSolutionContentAllByQuizSetID(c echo.Context) error {
	quizSetIDHex := c.Param("hex")
	quizSetID, err := primitive.ObjectIDFromHex(quizSetIDHex)
	errCheck(err)

	var quizSetFindResult quizSetStruct
	err = collection["quiz_set"].FindOne(
		ctx,
		bson.M{
			"_id": quizSetID,
		},
	).Decode(&quizSetFindResult)
	errCheck(err)
	solutionContentArr := []solutionContentStructWithObjectID{}
	for _, quizContentID := range quizSetFindResult.QuizContentIDArr {
		var solutionContentFindResult solutionContentStructWithObjectID
		err = collection["solution_content"].FindOne(
			ctx,
			bson.M{
				"quiz_content_id": quizContentID,
			},
		).Decode(&solutionContentFindResult)
		errCheck(err)

		solutionContentArr = append(solutionContentArr, solutionContentFindResult)
	}

	logger.Info("SUCCESS readSolutionContentByQuizSetID : %s", quizSetIDHex)

	return c.JSON(http.StatusOK, solutionContentArr)
}

func updateSolutionContent(c echo.Context) error {
	inputSolutionContent := new(solutionContentStructWithObjectID)
	err := c.Bind(inputSolutionContent)
	errCheck(err)

	updateResult, err := collection["solution_content"].UpdateOne(
		ctx,
		bson.M{
			"_id": inputSolutionContent.ObjectID,
		},
		bson.M{
			"$set": bson.M{
				"answer":  inputSolutionContent.Answer,
				"content": inputSolutionContent.Content,
			},
		},
	)
	errCheck(err)

	logger.Info("SUCCESS updateSolutionContent : %s", inputSolutionContent.ObjectID)

	return c.JSON(http.StatusOK, updateResult)
}

func deleteSolutionContent(c echo.Context) error {
	hex := c.Param("hex")
	objectID, err := primitive.ObjectIDFromHex(hex)
	errCheck(err)

	deleteResult, err := collection["solution_content"].DeleteOne(
		ctx,
		bson.M{
			"_id": objectID,
		},
	)
	errCheck(err)

	logger.Info("SUCCESS deleteSolutionContent : %s", hex)

	return c.JSON(http.StatusOK, deleteResult)
}
