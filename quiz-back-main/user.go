package main

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/crypto/bcrypt"
)

type userStruct struct {
	UserType    string `json:"user_type" bson:"user_type"`
	ID          string `json:"id" bson:"id"`
	Password    string `json:"password" bson:"password"`
	Email       string `json:"email" bson:"email"`
	UserName    string `json:"user_name" bson:"user_name"`
	UserPhone   string `json:"user_phone" bson:"user_phone"`
	ParentName  string `json:"parent_name" bson:"parent_name"`
	ParentPhone string `json:"parent_phone" bson:"parent_phone"`
	Age         int    `json:"age" bson:"age"`
}

type userStructWithID struct {
	ObjectID    primitive.ObjectID `json:"_id" bson:"_id"`
	UserType    string             `json:"user_type" bson:"user_type"`
	ID          string             `json:"id" bson:"id"`
	Password    string             `json:"password" bson:"password"`
	Email       string             `json:"email" bson:"email"`
	UserName    string             `json:"user_name" bson:"user_name"`
	UserPhone   string             `json:"user_phone" bson:"user_phone"`
	ParentName  string             `json:"parent_name" bson:"parent_name"`
	ParentPhone string             `json:"parent_phone" bson:"parent_phone"`
	Age         int                `json:"age" bson:"age"`
}

func initUser(e *echo.Echo) {
	e.POST("/users", createUser)
	e.GET("/users/:id", readUser)
	e.GET("/users/is-exist/:user_id", readIsExistID)
	e.PUT("/users/:id", updateUser)
	e.PUT("/users/no-password/:id", updateUserWithoutPassword)
	e.DELETE("/users/:id", deleteUser)
}

func createUser(c echo.Context) error {
	newUser := new(userStruct)

	err := c.Bind(newUser)
	errCheck(err)

	hash, err := bcrypt.GenerateFromPassword([]byte(newUser.Password), bcrypt.DefaultCost)
	errCheck(err)
	newUser.Password = string(hash)

	insertOneResult, err := collection["user"].InsertOne(
		ctx,
		newUser,
	)
	errCheck(err)

	logger.Info("SUCCESS createUser : %s", newUser.ID)

	return c.JSON(http.StatusCreated, insertOneResult)
}

// readUser : 회원 정보 불러오기
func readUser(c echo.Context) error {
	id := c.Param("id")
	userID, err := primitive.ObjectIDFromHex(id)
	errCheck(err)

	var getResult userStruct
	err = collection["user"].FindOne(
		ctx,
		bson.M{
			"_id": userID,
		},
	).Decode(&getResult)
	errCheck(err)

	logger.Info("SUCCESS readUser : %s", userID)

	return c.JSON(http.StatusOK, bson.M{
		"user_id":      getResult.ID,
		"email":        getResult.Email,
		"user_name":    getResult.UserName,
		"user_phone":   getResult.UserPhone,
		"parent_name":  getResult.ParentName,
		"parent_phone": getResult.ParentPhone,
		"age":          getResult.Age,
	})
}

// readIsExistID : 존재하는 아이디인지 확인
// 회원가입할 때 아이디 중복체크에 사용
func readIsExistID(c echo.Context) error {
	userID := c.Param("user_id")

	itemCount, err := collection["user"].CountDocuments(
		ctx,
		bson.M{
			"id": userID,
		},
	)
	errCheck(err)

	logger.Info("SUCCESS readIsExistID : %s", userID)

	// 이미 아이디가 있으면
	if 0 < itemCount {
		return c.JSON(http.StatusOK, bson.M{
			"is_exist": true,
		})
	}

	// 아이디가 없으면
	return c.JSON(http.StatusOK, bson.M{
		"is_exist": false,
	})
}

func updateUser(c echo.Context) error {
	id := c.Param("id")
	userID, err := primitive.ObjectIDFromHex(id)
	errCheck(err)

	inputUser := new(userStruct)
	err = c.Bind(inputUser)
	errCheck(err)

	// 비밀번호를 bcrypt hash값으로 변경
	hash, err := bcrypt.GenerateFromPassword([]byte(inputUser.Password), bcrypt.DefaultCost)
	errCheck(err)
	inputUser.Password = string(hash)

	updateResult, err := collection["user"].UpdateOne(
		ctx,
		bson.M{
			"_id": userID,
		},
		bson.M{
			"$set": bson.M{
				"password":     inputUser.Password,
				"email":        inputUser.Email,
				"user_phone":   inputUser.UserPhone,
				"parent_name":  inputUser.ParentName,
				"parent_phone": inputUser.ParentPhone,
				"age":          inputUser.Age,
			},
		},
	)
	errCheck(err)

	logger.Info("SUCCESS updateUser : %s", id)

	return c.JSON(http.StatusOK, updateResult)
}

func updateUserWithoutPassword(c echo.Context) error {
	id := c.Param("id")
	userID, err := primitive.ObjectIDFromHex(id)
	errCheck(err)

	inputUser := new(userStruct)
	err = c.Bind(inputUser)
	errCheck(err)

	updateResult, err := collection["user"].UpdateOne(
		ctx,
		bson.M{
			"_id": userID,
		},
		bson.M{
			"$set": bson.M{
				"email":        inputUser.Email,
				"user_phone":   inputUser.UserPhone,
				"parent_name":  inputUser.ParentName,
				"parent_phone": inputUser.ParentPhone,
				"age":          inputUser.Age,
			},
		},
	)
	errCheck(err)

	logger.Info("SUCCESS updateUser : %s", id)

	return c.JSON(http.StatusOK, updateResult)
}

func deleteUser(c echo.Context) error {
	id := c.Param("id")

	deleteResult, err := collection["user"].DeleteOne(
		ctx,
		bson.M{
			"id": id,
		},
	)
	errCheck(err)

	logger.Info("SUCCESS deleteUser : %s", id)

	return c.JSON(http.StatusOK, deleteResult)
}

// getUserNameByUserID : userID 이름 불러오기
func getUserNameByUserID(userID primitive.ObjectID) (userName string) {
	var getUserResult userStruct
	err := collection["user"].FindOne(
		ctx,
		bson.M{
			"_id": userID,
		},
	).Decode(&getUserResult)
	errCheck(err)

	userName = getUserResult.UserName

	return
}
