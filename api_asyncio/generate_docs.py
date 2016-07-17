#!/usr/bin/python3.5
# -*- coding: utf-8 -*-
"""
GENERATE DOCS TO USE AND QUERY FOR.

RUN ME TO GENERATE CHANGES AND SEE THE RESULTS (OR TO INITIALIZE THE DB).
"""

import json
from random import choice, randint
import rethinkdb as r

from rethinkdb import ReqlOpFailedError

conn = r.connect(host='localhost', port=28015, db='ep16').repl()

dates = ['2016-07-14', '2016-07-15', '2016-07-16', '2016-07-17']

users = [{
    "cool": True,
    "country": "france",
    "email": "julien@test.fr",
    "id": "0853409603dc5025bb80f48011109397",
    "name": "coconut"
}, {
    "cool": True,
    "country": "france",
    "email": "julien@test.com",
    "id": "e280100b00b2eecabe6aab4bee4a4b51",
    "name": "coconut"
}, {
    "cool": False,
    "country": "serbia",
    "email": "istanbul@test.fr",
    "id": "36e7128e08226b70af347d5dc8b4b491",
    "name": "Captain"
}, {
    "cool": True,
    "country": "serbia",
    "email": "sarajevo@test.fr",
    "id": "ea06c17de2571f8b702860d3609c8365",
    "name": "Stone"
}, {
    "cool": False,
    "country": "serbia",
    "email": "dakar@test.fr",
    "id": "54bacfe40bb60e6a3d7ecc1014c5b1fc",
    "name": "brouteur",
    "scores": {
        '2016-07-14': 12
    },
    "total_score": 0
}]


def delete_scores():
    deleted = r.table('scores').delete().run(conn)
    print(deleted)

def delete_users():
    deleted = r.table('users').delete().run(conn)
    print(deleted)

def create_db_and_table():
    """
    BASE DB AND TABLES
    """
    try:
        r.db_create('ep16').run(conn)
    except ReqlOpFailedError:
        pass
    try:
        r.db('ep16').table_create('scores').run(conn)
    except ReqlOpFailedError:
        pass
    try:
        r.db('ep16').table_create('users_countries').run(conn)
    except ReqlOpFailedError:
        pass
    try:
        r.db('ep16').table_create('users').run(conn)
    except ReqlOpFailedError:
        pass


def generate_users():
    """
    DROP AND RECREATE USERS
    """
    delete_users()
    for doc in users:
        result = r.table('users').insert(doc).run(conn)
        print(result)
    r.table('users').index_create('total_score').run(conn)
    r.table('users').index_create('country').run(conn)


def generate_scores():
    """
    DROP AND RECREATE SCORES
    """
    delete_scores()
    for _ in range(10):
        s = {
            'date': choice(dates),
            'id_user': choice(users)['id'],
            'total_score': 0
        }
        result = r.table('scores').insert(s).run(conn)
    try:
        r.table('scores').index_create('id_user').run(conn)
    except ReqlOpFailedError:
        pass
    try:
        r.table('scores').index_create('date_score_user', [r.row["date"], r.row["total_score"], r.row["id_user"]]).run(conn)
    except ReqlOpFailedError:
        pass

def increment_scores():
    """
    RUN ME TO TEST FEEDS
    """
    user = choice(users)
    date = choice(dates)
    plus = randint(1, 10)

    # q3
    r.table('users').get(user['id']).update({'total_score': (r.row['total_score'] + plus).default(0)}).run(conn)
    
    # q4
    result = r.table('scores').get_all(user['id'], index='id_user').update({'total_score': (r.row['total_score'] + plus).default(0)}).run(conn)
    print(result, user['id'], plus)


def generate_user_countries():
    """
    TODO: pas bon encore
    """
    deleted = r.table('users_countries').delete().run(conn)
    for u in users:
        c = u['country']
        d = {
            'id': c,
            'users': []
        }
        r.table('users_countries').insert(d).run(conn)
        r.table('users_countries').get(c).update({'users': (r.row['users'] + [{'id': u['id'], 'total_score': 0}])}).run(conn)


if __name__ == '__main__':

    create_db_and_table()

    # generate_scores()
    # generate_users()
    # generate_user_countries()

    increment_scores()
