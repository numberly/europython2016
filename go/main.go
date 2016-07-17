package main

import (
	"encoding/json"
	"fmt"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	r "gopkg.in/dancannon/gorethink.v2"
	"log"
	"net/http"
	"os"
)

var session *r.Session

// genericError return a json error
func genericError(err string, res http.ResponseWriter) {
	e := new(apiError)
	e.Error = err
	data, _ := json.Marshal(e)
	res.Header().Set("Content-Type", "application/json")
	res.Write(data)
}

func initDb() (session *r.Session) {
	rethinkAddress := os.Getenv("RETHINK_ADDRESS")
	rethinkDB := os.Getenv("RETHINK_DB")

	session, err := r.Connect(r.ConnectOpts{
		Address:  rethinkAddress,
		Database: rethinkDB,
	})
	if err != nil {
		log.Fatal(err)
		return
	}

	respDB, err := r.DBCreate(rethinkDB).RunWrite(session)
	if err != nil {
		fmt.Printf(err.Error())
	} else {
		fmt.Printf("initdb :: %d DB created\n", respDB.DBsCreated)
	}

	respTableUsers, err := r.TableCreate("users").RunWrite(session)
	if err != nil {
		fmt.Printf(err.Error())
	} else {
		fmt.Printf("initdb :: %d Table created\n", respTableUsers.TablesCreated)
	}

	respTableQuestions, err := r.TableCreate("questions").RunWrite(session)
	if err != nil {
		fmt.Printf(err.Error())
	} else {
		fmt.Printf("initdb :: %d Table created\n", respTableQuestions.TablesCreated)
	}
	return session
}

func main() {
	port := os.Getenv("EP16_PORT")
	fmt.Printf("\n\nlaunch the server :: 0.0.0.0:%v\n", port)

	session = initDb()

	r := mux.NewRouter()

	r.HandleFunc("/api/users", getUsersHandler).Methods("GET", "OPTIONS")
	r.HandleFunc("/api/users", postUsersHandler).Methods("POST")
	r.HandleFunc("/api/user/{id}", getUserHandler).Methods("GET")

	r.HandleFunc("/api/questions", getQuestionsHandler).Methods("GET")
	r.HandleFunc("/api/question/{id}", postQuestionHandler).Methods("POST")

	loggerHandler := handlers.LoggingHandler(os.Stdout, r)
	errHTTP := http.ListenAndServe(fmt.Sprintf(":%v", port), loggerHandler)
	if errHTTP != nil {
		log.Fatal("ListenAndServe: ", errHTTP)
	}
}
