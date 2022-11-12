package main

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type quizSetStruct struct {
	StudentID        primitive.ObjectID   `json:"student_id" bson:"student_id"`
	Title            string               `json:"title" bson:"title"`
	NumQuiz          int64                `json:"num_quiz" bson:"num_quiz"`
	Chapter          int64                `json:"chapter" bson:"chapter"`
	NumCorrect       int64                `json:"num_correct" bson:"num_correct"`
	IsSolved         bool                 `json:"is_solved" bson:"is_solved"`
	IsAlive          bool                 `json:"is_alive" bson:"is_alive"`
	QuizContentIDArr []primitive.ObjectID `json:"quiz_content_id_arr" bson:"quiz_content_id_arr"`
}

type quizSetStructWithObjectID struct {
	ObjectID         primitive.ObjectID   `json:"_id" bson:"_id"`
	StudentID        primitive.ObjectID   `json:"student_id" bson:"student_id"`
	Title            string               `json:"title" bson:"title"`
	NumQuiz          int64                `json:"num_quiz" bson:"num_quiz"`
	Chapter          int64                `json:"chapter" bson:"chapter"`
	NumCorrect       int64                `json:"num_correct" bson:"num_correct"`
	IsSolved         bool                 `json:"is_solved" bson:"is_solved"`
	IsAlive          bool                 `json:"is_alive" bson:"is_alive"`
	QuizContentIDArr []primitive.ObjectID `json:"quiz_content_id_arr" bson:"quiz_content_id_arr"`
}

func initQuizSet(e *echo.Echo) {
	e.POST("/quiz-sets", createQuizSet)
	e.GET("/quiz-sets/id/:hex", readQuizSetByID)
	e.GET("/quiz-sets/all/:student-id", readQuizSetAll)
	e.PUT("/quiz-sets", updateQuizSet)
	e.DELETE("/quiz-sets", deleteQuizSet)
}

func getQuizContentIDArr(chapter int64) (quizIDArr []primitive.ObjectID) {
	cur, err := collection["quiz_content"].Find(
		ctx,
		bson.M{
			"order": chapter,
		},
	)
	errCheck(err)
	defer cur.Close(ctx)
	//quizContentArr := []*quizContentStructWithObjectID{}

	for cur.Next(ctx) {
		quizContentResult := new(quizContentStructWithObjectID)
		err := cur.Decode(&quizContentResult)
		errCheck(err)

		quizIDArr = append(quizIDArr, quizContentResult.ObjectID)
	}
	return
}

// func getRandomQuizContentIDArr(numQuiz int64, chapter int64) (quizIDArr []primitive.ObjectID) {
// 	pipeline := make([]bson.M, 0)

// 	matchStage := bson.M{
// 		"$match": bson.M{
// 			"Chapter": chapter,
// 		},
// 	}

// 	sampleStage := bson.M{
// 		"$sample": bson.M{
// 			"size": numQuiz,
// 		},
// 	}

// 	pipeline = append(pipeline, matchStage, sampleStage)

// 	cur, err := collection["quiz_content"].Aggregate(
// 		ctx,
// 		pipeline,
// 	)

// 	errCheck(err)
// 	defer cur.Close(ctx)

// 	for cur.Next(ctx) {
// 		quizSetResult := new(quizInfoStructWithObjectID)
// 		err := cur.Decode(&quizSetResult)
// 		errCheck(err)

// 		quizIDArr = append(quizIDArr, quizSetResult.ObjectID)
// 	}
// 	err = cur.Err()
// 	errCheck(err)

// 	return
// }

func createQuizSet(c echo.Context) error {
	newQuizSet := new(quizSetStruct)

	err := c.Bind(newQuizSet)
	errCheck(err)

	//quizIDArr := getRandomQuizContentIDArr(newQuizSet.NumQuiz, newQuizSet.Chapter)

	quizIDArr := getQuizContentIDArr(newQuizSet.Chapter)
	quizNum := getQuizNum(newQuizSet.Chapter)
	insertOneResult, err := collection["quiz_set"].InsertOne(
		ctx,
		bson.M{
			"title": "No Title",
			// "num_quiz":            newQuizSet.NumQuiz,
			"num_quiz":            quizNum,
			"chapter":             newQuizSet.Chapter,
			"num_correct":         0,
			"student_id":          newQuizSet.StudentID,
			"quiz_content_id_arr": quizIDArr,
			"is_solved":           false,
			"is_alive":            true,
		},
	)
	errCheck(err)

	logger.Info("SUCCESS createQuizSet")

	return c.JSON(http.StatusCreated, insertOneResult)
}

//////////////////////////////////////////////////
func getQuizNum(chapter int64) int64 {

	count, err := collection["quiz_content"].CountDocuments(
		ctx,
		bson.M{
			"order": chapter,
		},
	)
	errCheck(err)

	return count
}

func getIsQuizSetSolved(quizSetID primitive.ObjectID) bool {

	count, err := collection["quiz_solving"].CountDocuments(
		ctx,
		bson.M{
			"quiz_set_id": quizSetID,
		},
	)
	errCheck(err)

	if count > 0 {
		return true
	}

	return false
}

func readQuizSetByID(c echo.Context) error {
	hex := c.Param("hex")
	quizSetID, err := primitive.ObjectIDFromHex(hex)
	errCheck(err)

	var getResult quizSetStructWithObjectID
	err = collection["quiz_set"].FindOne(
		ctx,
		bson.M{
			"_id":      quizSetID,
			"is_alive": true,
		},
	).Decode(&getResult)
	errCheck(err)

	getResult.IsSolved = getIsQuizSetSolved(quizSetID)

	logger.Info("SUCCESS readQuizSet : %s", getResult.Title)

	return c.JSON(http.StatusOK, getResult)
}

func readQuizSetAll(c echo.Context) error {
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

func updateQuizSet(c echo.Context) error {
	inputquizSet := new(quizSetStructWithObjectID)
	err := c.Bind(inputquizSet)
	errCheck(err)

	updateResult, err := collection["quiz_set"].UpdateOne(
		ctx,
		bson.M{
			"_id": inputquizSet.ObjectID,
		},
		bson.M{
			"$set": bson.M{
				"num_correct": inputquizSet.NumCorrect,
				"num_quiz":    inputquizSet.NumQuiz,
				"is_solved":   inputquizSet.IsSolved,
			},
		},
	)
	errCheck(err)

	logger.Info("SUCCESS updateQuizSet : %s", inputquizSet.ObjectID)

	return c.JSON(http.StatusOK, updateResult)
}

func deleteQuizSet(c echo.Context) error {
	hex := c.QueryParam("objectid")
	objectID, err := primitive.ObjectIDFromHex(hex)
	errCheck(err)

	deleteResult, err := collection["quiz_set"].UpdateOne(
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

	logger.Info("SUCCESS deleteQuizSet : %s", hex)

	return c.JSON(http.StatusOK, deleteResult)
}
