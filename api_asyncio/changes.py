#!/usr/bin/python3.5
# -*- coding: utf-8 -*-
"""
USE ME.

TEST OF RETHINKDB CHANGES QUERIES AND THEIR RESULT, ALL WORKS UNTIL Q5.
"""

import json
from random import choice, randint
import rethinkdb as r

conn = r.connect(host='localhost', port=28015, db='ep16').repl()


def show(q):
    for d in q.run(conn):
        print(d)

q1 = r.table('users').pluck('country', 'name', 'scores')
# show(q1)

# total score par user feed
q2 = r.table('users').pluck('country', 'name', 'total_score').changes(include_initial=True)
# show(q2)

# top 5 total score feed (offset based, 0=higher score)
q3 = r.table('users').order_by(index=r.desc('total_score')).limit(5).changes(include_initial=True, include_offsets=True)
# show(q3)

# trop 5 score by date feed
q4 = r.table('scores').order_by(index=r.desc('date_score_user')).limit(5).changes(include_initial=True, include_offsets=True)
show(q4)

# top 5 users by country feed (offset based, 0=higher score)
# TODO: fix me
q5 = r.table('users_countries').order_by(index=r.desc('total_score')).limit(5).changes(include_initial=True, include_offsets=True)
# show(q5)
