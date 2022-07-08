package main

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type quizSolvingStruct struct {
	QuizSetID primitive.ObjectID `json:"quiz_set_id" bson:"quiz_set_id"`
	AnswerArr []int32            `json:"answer_array" bson:"answer_array"`
}

type quizSolvingStructWithID struct {
	ObjectID  primitive.ObjectID `json:"_id" bson:"_id"`
	QuizSetID primitive.ObjectID `json:"quiz_set_id" bson:"quiz_set_id"`
	AnswerArr []int32            `json:"answer_array" bson:"answer_array"`
}

func initQuizSolving(e *echo.Echo) {
	e.POST("/quiz-solving", createQuizSolving)
	e.GET("/quiz-solving/id/:quiz_set_id", readQuizSolving)
	// e.PUT("/quiz-solving/:id", updateQuizSolving)
	// e.DELETE("/quiz-solving/:id", deleteQuizSolving)
}

func createQuizSolving(c echo.Context) error {
	newQuizSolving := new(quizSolvingStruct)

	err := c.Bind(newQuizSolving)
	errCheck(err)

	insertOneResult, err := collection["quiz_solving"].InsertOne(
		ctx,
		newQuizSolving,
	)
	errCheck(err)

	logger.Info("SUCCESS createQuizSolving : %s", insertOneResult.InsertedID)

	return c.JSON(http.StatusCreated, insertOneResult)
}

func readQuizSolving(c echo.Context) error {
	quizHex := c.Param("quiz_set_id")
	quizID, err := primitive.ObjectIDFromHex(quizHex)
	errCheck(err)

	var getResult quizSolvingStruct
	err = collection["quiz_solving"].FindOne(
		ctx,
		bson.M{
			"quiz_set_id": quizID,
		},
	).Decode(&getResult)

	// 없는 경우
	if err != nil {
		logger.Info("FAIL readQuizSolving : not solved yet : %s", quizHex)
		return c.JSON(http.StatusNoContent, bson.M{})
	}

	logger.Info("SUCCESS readQuizSolving : %s", quizHex)

	return c.JSON(http.StatusOK, getResult)
}

// func updateQuizSolving(c echo.Context) error {
// 	id := c.Param("id")

// 	inputQuizSolving := new(quizSolvingStruct)
// 	err := c.Bind(inputQuizSolving)
// 	errCheck(err)

// 	updateResult, err := collection["problem"].UpdateOne(
// 		ctx,
// 		bson.M{
// 			"id": id,
// 		},
// 		bson.M{
// 			"$set": bson.M{
// 				"binarypdf": inputQuizSolving.BinaryQuizSolving,
// 			},
// 		},
// 	)
// 	errCheck(err)

// 	logger.Info("SUCCESS updateQuizSolving : %s", id)

// 	return c.JSON(http.StatusOK, updateResult)
// }

// func deleteQuizSolving(c echo.Context) error {
// 	id := c.Param("id")

// 	deleteResult, err := collection["problem"].DeleteOne(
// 		ctx,
// 		bson.M{
// 			"id": id,
// 		},
// 	)
// 	errCheck(err)

// 	logger.Info("SUCCESS deleteQuizSolving : %s", id)

// 	return c.JSON(http.StatusOK, deleteResult)
// }
