package main

import (
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	r "gopkg.in/dancannon/gorethink.v2"
	"net/http"
)

// getUsersHandler retrieves all user from rethinkdb
func getUsersHandler(res http.ResponseWriter, req *http.Request) {
	cursor, err := r.Table("users").Run(session)
	if err != nil {
		genericError(err.Error(), res)
		return
	}
	defer cursor.Close()

	var users []User
	err = cursor.All(&users)
	data, err := json.Marshal(responseUsers{users})
	if err != nil {
		genericError(fmt.Sprintf("users :: unable to serialize %v\n", err), res)
		return
	}
	res.Header().Set("Content-Type", "application/json")
	res.Write(data)
}

// getUserHandler return a specific user
func getUserHandler(res http.ResponseWriter, req *http.Request) {
	err := req.ParseForm()
	if err != nil {
		genericError(err.Error(), res)
		return
	}
	muxVars := mux.Vars(req)
	id := muxVars["id"]

	cursor, err := r.Table("users").Get(id).Run(session)
	if err != nil {
		genericError(err.Error(), res)
	}
	defer cursor.Close()

	var user User
	err = cursor.One(&user)
	if err == r.ErrEmptyResult {
		genericError(fmt.Sprintf("user not found :: %v", id), res)
		return
	}
	data, err := json.Marshal(responseUser{user})
	if err != nil {
		genericError(fmt.Sprintf("users :: unable to serialize %v\n", err), res)
		return
	}
	res.Header().Set("Content-Type", "application/json")
	res.Write(data)
}

// postUsersHandler retrieves all user from rethinkdb
func postUsersHandler(res http.ResponseWriter, req *http.Request) {
	decoder := json.NewDecoder(req.Body)
	var jsonUser User
	err := decoder.Decode(&jsonUser)
	if err != nil {
		genericError(err.Error(), res)
		return
	}

	// prepare rethink user stuff
	user := new(rethinkUser)
	email := jsonUser.Email
	user.Email = email
	user.ID = getMD5Hash(email)
	user.Name = jsonUser.Name
	user.Country = jsonUser.Country
	user.Cool = jsonUser.Cool
	jsonUser.ID = user.ID

	cursor, err := r.Table("users").Insert(user).RunWrite(session)
	if err != nil {
		genericError(err.Error(), res)
		return
	}
	fmt.Printf("%d row inserted :: %v\n", cursor.Inserted, user.ID)

	data, err := json.Marshal(responseUser{jsonUser})
	if err != nil {
		genericError(fmt.Sprintf("users :: unable to serialize %v\n", err), res)
		return
	}
	res.Header().Set("Content-Type", "application/json")
	res.Write(data)
}
