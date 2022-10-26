package main

import (
	"context"
	"time"

	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"

	"github.com/web-academy-2b3e/quiz-back/helper"
)

//----------
// Handlers
//----------

type User struct {
	Name string
	Age  int
}

var logger = helper.NewColorLogger()
var ctx context.Context

var emptyObjectID, _ = primitive.ObjectIDFromHex("0000000000000000")

func main() {
	e := echo.New()

	setEchoMiddleware(e)

	ctx, cancle := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancle()

	// client, err := mongo.Connect(ctx, options.Client().ApplyURI(mongoURI))
	//client, err := mongo.Connect(ctx, options.Client().ApplyURI("mongodb+srv://quiz:quiz@cluster0.6nyp6.mongodb.net/?retryWrites=true&w=majority"))
	client, err := mongo.Connect(ctx, options.Client().ApplyURI("mongodb+srv://withstudy:withstudy@cluster0.letda.mongodb.net/?retryWrites=true&w=majority"))
	defer disconnectMongo(client)
	errCheck(err)

	logger.Debug("SUCCESS connect mongo")

	// collection := client.Database("quiz").Collection("quiz_set")

	// user := quizContentStruct{}

	// insertResult, err := collection.InsertOne(context.TODO(), user)
	// if err != nil {
	// 	log.Fatal(err)
	// }

	// fmt.Println("Inserted a single document: ", insertResult.InsertedID)
	// deleteResult, err := collection.DeleteMany(
	// 	ctx,
	// 	bson.M{
	// 		"num_quiz": 20,
	// 	},
	// )

	// logger.Info("aaaaaaaaaaaaa : %s", deleteResult)

	setCollection(client)

	// Static files
	e.Static("/files", "files")

	// Routes
	initUser(e)
	initLogin(e)
	initQuizInfo(e)
	initQuizContent(e)
	initQuizSolving(e)
	initSolutionContent(e)
	initQuizSet(e)
	initWrongContent(e)
	initVideoContent(e)

	// Start server
	e.Logger.Fatal(e.Start(":1323"))
}
