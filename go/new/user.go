package main

import (
	"errors"

	rethink "gopkg.in/gorethink/gorethink.v3"
)

type User struct {
	Cool    bool   `json:"cool" gorethink:"cool"`
	Email   string `json:"email" gorethink:"email"`
	Name    string `json:"name" gorethink:"name"`
	Country string `json:"country" gorethink:"country"`
}

func (u *User) getUser() error {
	return errors.New("Not implementend")
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

//type Question struct {
//	Index   int      `json:"index" gorethink:"index"`
//	Answers []string `json:"answers" gorethink:"answers`
//	ID      int      `json:"id" gorethink:"id"`
//	Text    string   `json:"text" gorethink:"text"`
//}
//
//type checkQuestion struct {
//	AnswerIndex int    `json:"answer_index"`
//	IDUser      string `json:"id_user"`
//}
//
//type Score struct {
//	Date       string `json:"date" gorethink:"date"`
//	ID         string `json:"id" gorethink:"id"`
//	IDUser     string `json:"id_user" gorethink:"id_user"`
//	TotalScore int    `json:"total_score gorethink:"total_score"`
//}
