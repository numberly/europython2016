package main

import (
	rethink "gopkg.in/gorethink/gorethink.v3"
)

type Score struct {
	Date string `json:"date" gorethink:"date"`
	Hit  int    `json:"total_score gorethink:"total_score"`
}

type User struct {
	ID      string `json:"id" gorethink:"id"`
	Cool    bool   `json:"cool" gorethink:"cool"`
	Email   string `json:"email" gorethink:"email"`
	Name    string `json:"name" gorethink:"name"`
	Country string `json:"country" gorethink:"country"`
	Scores  []Score
}

func (u *User) getUser(session *rethink.Session) error {
	res, err := rethink.Table("users").Get(u.ID).Run(session)
	if err != nil {
		return err
	}

	err = res.One(&u)
	if err == rethink.ErrEmptyResult {
		return err
	}

	return nil
}

func (u *User) createUser(session *rethink.Session) error {
	_, err := rethink.Table("users").Insert(u).RunWrite(session)

	if err != nil {
		return err
	}

	return nil
}

func getUsers(cursor *rethink.Cursor) ([]User, error) {
	users := []User{}
	err := cursor.All(&users)
	if err != nil {
		return users, err
	}
	return users, nil
}

type Question struct {
	AnswerIndex int      `json:"answer_index" gorethink:"answer_index"`
	Answers     []string `json:"answers" gorethink:"answers`
	ID          int      `json:"id" gorethink:"id"`
	Text        string   `json:"text" gorethink:"text"`
}

func getQuestions(cursor *rethink.Cursor) ([]Question, error) {
	questions := []Question{}
	err := cursor.All(&questions)
	if err != nil {
		return questions, err
	}
	return questions, nil
}

//
//type checkQuestion struct {
//	AnswerIndex int    `json:"answer_index"`
//	IDUser      string `json:"id_user"`
//}
//
