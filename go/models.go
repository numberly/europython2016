package main

type User struct {
	Cool  bool   `json:"cool"`
	Email string `json:"email"`
	ID    string `json:"id"`
	Name  string `json:"name"`
	Team  string `json:"team"`
}

type rethinkUser struct {
	Cool  bool   `gorethink:"cool"`
	Email string `gorethink:"email"`
	ID    string `gorethink:"id"`
	Name  string `gorethink:"name"`
	Team  string `gorethink:"team"`
}

type responseUser struct {
	User User `json:"data"`
}

type responseUsers struct {
	User []User `json:"data"`
}

type Question struct {
	Index   int      `json:"answer_index"`
	Answers []string `json:"answers"`
	ID      int      `json:"id"`
	Text    string   `json:"text"`
}

type checkQuestion struct {
	AnswerIndex int    `json:"answer_index"`
	IDUser      string `json:"id_user"`
}

type rethinkQuestion struct {
	AnswerIndex int      `gorethink:"answer_index"`
	Answers     []string `gorethink:"answers"`
	ID          int      `gorethink:"id"`
	Text        string   `gorethink:"text"`
}

type responseQuestions struct {
	Question []Question `json:"data"`
}

type responseQuestion struct {
	Question Question `json:"data"`
}

type validQuestion struct {
	Data bool `json:"data"`
}

type Score struct {
	Date       string `json:"date"`
	ID         string `json:"id"`
	IDUser     string `json:"id_user"`
	TotalScore int    `json:"total_score"`
}

type rethinkScore struct {
	Date       string `gorethink:"date"`
	ID         string `gorethink:"id"`
	IDUser     string `gorethink:"id_user"`
	TotalScore int    `gorethink:"total_score"`
}

type apiError struct {
	Error string `json:"error"`
}
