package main

import (
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	r "gopkg.in/dancannon/gorethink.v2"
	"net/http"
	"strconv"
)

// getUsersHandler retrieves all user from rethinkdb
func getQuestionsHandler(res http.ResponseWriter, req *http.Request) {
	cursor, err := r.Table("questions").Sample(200).Run(session)
	if err != nil {
		genericError(err.Error(), res)
		return
	}
	defer cursor.Close()

	if cursor.IsNil() {
		genericError("questions not found", res)
		return
	}

	var questions []Question
	err = cursor.All(&questions)
	data, err := json.Marshal(responseQuestions{questions})
	if err != nil {
		genericError(fmt.Sprintf("users :: unable to serialize %v\n", err), res)
		return
	}
	res.Header().Set("Content-Type", "application/json")
	res.Write(data)
}

// postQuestionHandler valid a question/answer throught the index
func postQuestionHandler(res http.ResponseWriter, req *http.Request) {
	decoder := json.NewDecoder(req.Body)
	var jsonQuestion checkQuestion
	err := decoder.Decode(&jsonQuestion)
	if err != nil {
		genericError(err.Error(), res)
		return
	}
	IDUser := jsonQuestion.IDUser
	muxVars := mux.Vars(req)
	id, idErr := strconv.Atoi(muxVars["id"])
	if idErr != nil {
		genericError(fmt.Sprintf("questions :: id is not valid :: %v", idErr), res)
		return
	}

	cursor, err := r.Table("users").Get(IDUser).Run(session)
	if err != nil {
		genericError(err.Error(), res)
		return
	}

	var user User
	err = cursor.One(&user)
	if err == r.ErrEmptyResult {
		genericError(fmt.Sprintf("user not found :: %v", IDUser), res)
		return
	}
	// TODO: dry this part
	cursorQuestion, errQuestion := r.Table("questions").Get(id).Run(session)
	if errQuestion != nil {
		genericError(errQuestion.Error(), res)
		return
	}

	var question Question
	err = cursorQuestion.One(&question)
	if err == r.ErrEmptyResult {
		genericError(fmt.Sprintf("question not found :: %v", id), res)
		return
	}
	defer cursor.Close()
	defer cursorQuestion.Close()

	var answer validQuestion
	answer.Data = false
	if question.Index == jsonQuestion.AnswerIndex {
		answer.Data = true
		var score rethinkScore
		var IDScore = fmt.Sprintf("%v_%v", "2016-07-07", IDUser)

		cursorScore, err := r.Table("scores").Get(IDScore).Run(session)
		err = cursorScore.One(&score)
		if err == r.ErrEmptyResult {
			// TODO: dynamic date
			score.Date = "2016-07-07"
			score.ID = IDScore
			score.IDUser = IDUser
			score.TotalScore = 1
			_, err := r.Table("scores").Insert(score).RunWrite(session)
			if err != nil {
				genericError(err.Error(), res)
			}
		} else {
			cursor, err := r.Table("scores").Get(IDScore).Update(map[string]interface{}{
				"total_score": score.TotalScore + 1}).RunWrite(session)
			if err != nil {
				genericError(err.Error(), res)
			}
			fmt.Printf("update score :: %v :: %v\n", cursor.Inserted, user.ID)
		}
	}

	data, err := json.Marshal(answer)
	if err != nil {
		genericError(fmt.Sprintf("users :: unable to serialize %v\n", err), res)
		return
	}
	res.Header().Set("Content-Type", "application/json")
	res.Write(data)
}
