ASYNCIO STUFF
=============
* create your venv with python3.5 as default interpreter
* clone https://github.com/rethinkdb/rethinkdb
* the PR : https://github.com/rethinkdb/rethinkdb/pull/5354
* switch to branch dalanmiller_aiter_and_anext
* check my comments and modifications and apply them on your local repo : https://github.com/rethinkdb/rethinkdb/pull/5354/files
* copy the ultrabug_patch.patch from this repository to your local clone rethinkdb and apply ``git apply ultrabug_patch.patch``
* copy the ql2_pb2.py from this repository to your local clone in the drivers/python/rethinkdb/ folder
* activate your venv
* pip install -e .

Basic usage
-----------
* bahn_server.py is the asyncio API server with autobahn support (this is the one that should work)
* client.html to test queries and see responses (console log of the browser)
* changes.py is the file where I experimented and validated each type of queries
* generate_docs.py to generate the documents etc to test changes and init the db (fixed user ids hardcoded on client.html !)


Go STUFF
========

requirements
------------
```yaml
go get github.com/gorilla/mux
go get gopkg.in/dancannon/gorethink.v2
go get github.com/rs/cors

export EP16_PORT=7070
export RETHINK_ADDRESS=localhost:28015
export RETHINK_DB=ep16
```

run
---
```yaml
go run *.go
```

API
---

### users
```
# GET
http://localhost:7070/users

# GET
http://localhost:7070/user/{id_user}

# POST
http://localhost:7070/users
    email           string
    name            string
    country/team    string
    cool            bool
```

### questions
```
# GET
# questions pool
http://localhost:7070/questions

return:
    {"data": [Questions]}


# POST
# validate a question
http://localhost:7070/question/{id_question}

params:
    id_user         string
    answer_index    string

return:
    {"data": true/false}
```
