package main

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type videoStruct struct {
	VideoID primitive.ObjectID `json:"video_id" bson:"video_id"`
	Number  int64              `json:"number" bson:"number"`
	Name    string             `json:"name" bson:"name"`
	Chapter int64              `json:"chapter" bson:"chapter"`
	Finish  bool               `json:"finish" bson:"finish"`
	Source  string             `json:"source" bson:"source"`
}

type videoStructWithObjectID struct {
	ObjectID primitive.ObjectID `json:"_id" bson:"_id"`
	VideoID  primitive.ObjectID `json:"video_id" bson:"video_id"`
	Number   int64              `json:"number" bson:"number"`
	Name     string             `json:"name" bson:"name"`
	Chapter  int64              `json:"chapter" bson:"chapter"`
	Finish   bool               `json:"finish" bson:"finish"`
	Source   string             `json:"source" bson:"source"`
}

func initVideoContent(e *echo.Echo) {
	e.POST("/video", createVideo)
	e.GET("/video/id/:hex", readVideoByID)
	e.GET("/video/all", readAllVideo)
	e.GET("/video/chapter/:chapter", readVideoByChapter)
	e.PUT("/video", updateVideo)
	e.DELETE("/video/:hex", deleteVideo)
}

func createVideo(c echo.Context) error {
	newVideo := new(videoStruct)

	err := c.Bind(newVideo)
	errCheck(err)

	insertOneResult, err := collection["video"].InsertOne(
		ctx,
		newVideo,
	)
	errCheck(err)

	logger.Info("SUCCESS createVideo : %s", newVideo.VideoID)

	return c.JSON(http.StatusCreated, insertOneResult)
}

func readVideoByID(c echo.Context) error {
	hex := c.Param("hex")
	videoID, err := primitive.ObjectIDFromHex(hex)
	errCheck(err)

	var getResult videoStructWithObjectID
	err = collection["video"].FindOne(
		ctx,
		bson.M{
			"_id": videoID,
		},
	).Decode(&getResult)
	errCheck(err)

	logger.Info("SUCCESS readVideoContent : %s", videoID)

	return c.JSON(http.StatusOK, getResult)
}

func readAllVideo(c echo.Context) error {
	cur, err := collection["video"].Find(
		ctx,
		bson.M{},
	)
	errCheck(err)
	defer cur.Close(ctx)

	videoArr := []*videoStructWithObjectID{}

	for cur.Next(ctx) {
		videoResult := new(videoStructWithObjectID)
		err := cur.Decode(&videoResult)
		errCheck(err)

		videoArr = append(videoArr, videoResult)
	}
	if err := cur.Err(); err != nil {
		return c.JSON(http.StatusInternalServerError, bson.M{
			"message": "FAIL readWrongContentAll",
		})
	}

	logger.Info("SUCCESS readWrongContentAll")

	response := bson.M{
		"video_arr": videoArr,
	}
	fmt.Println(response)
	return c.JSON(http.StatusOK, response)
}

func readVideoByChapter(c echo.Context) error {
	chapter := c.Param("chapter")
	videoChapter, err := strconv.ParseInt(chapter, 10, 64)

	errCheck(err)
	cur, err := collection["video"].Find(
		ctx,
		bson.M{
			"chapter": videoChapter,
		},
	)

	errCheck(err)
	defer cur.Close(ctx)

	videoSetArr := []*videoStructWithObjectID{}

	for cur.Next(ctx) {
		videoSetResult := new(videoStructWithObjectID)
		err := cur.Decode(&videoSetResult)
		errCheck(err)

		videoSetArr = append(videoSetArr, videoSetResult)
	}
	if err := cur.Err(); err != nil {
		return c.JSON(http.StatusInternalServerError, bson.M{
			"message": "FAIL readVideoSetAll",
		})
	}

	logger.Info("SUCCESS readVideoSetAll")

	response := bson.M{
		"video_set_arr": videoSetArr,
	}
	return c.JSON(http.StatusOK, response)
}

func updateVideo(c echo.Context) error {
	inputVideo := new(videoStructWithObjectID)
	err := c.Bind(inputVideo)
	errCheck(err)

	updateResult, err := collection["video"].UpdateOne(
		ctx,
		bson.M{
			"_id": inputVideo.ObjectID,
		},
		bson.M{
			"$set": bson.M{
				"finish": inputVideo.Finish,
			},
		},
	)
	errCheck(err)

	logger.Info("SUCCESS updateVideo : %s", inputVideo.ObjectID)

	return c.JSON(http.StatusOK, updateResult)
}

func deleteVideo(c echo.Context) error {
	hex := c.QueryParam("objectid")
	objectID, err := primitive.ObjectIDFromHex(hex)
	errCheck(err)

	deleteResult, err := collection["video"].DeleteOne(
		ctx,
		bson.M{
			"_id": objectID,
		},
	)
	errCheck(err)

	logger.Info("SUCCESS deleteVideo : %s", hex)

	return c.JSON(http.StatusOK, deleteResult)
}
