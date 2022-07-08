package main

import (
	"go.mongodb.org/mongo-driver/mongo"
)

var collection map[string]*mongo.Collection

// setCollection : MongoDB collection 연결
func setCollection(client *mongo.Client) {
	collection = make(map[string]*mongo.Collection)

	dbQuiz := client.Database("quiz")
	collection["quiz_info"] = dbQuiz.Collection("quiz_info")
	collection["quiz_content"] = dbQuiz.Collection("quiz_content")
	collection["quiz_solving"] = dbQuiz.Collection("quiz_solving")
	collection["solution_content"] = dbQuiz.Collection("solution_content")
	collection["quiz_set"] = dbQuiz.Collection("quiz_set")

	dbAuthentication := client.Database("authentication")
	collection["user"] = dbAuthentication.Collection("user")
}
