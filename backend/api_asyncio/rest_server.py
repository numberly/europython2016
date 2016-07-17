#!/usr/bin/python3.5
# -*- coding: utf-8 -*-
"""
ATTEMPT TO TEST A SIMPLE AIOHTTP ASYNCIO API SERVER (without AUTOBAHN).
"""

import asyncio
import json
import rethinkdb as r

from aiohttp import web
from datetime import datetime
from rethinkdb.errors import ReqlOpFailedError
from uuid import uuid4

r.set_loop_type("asyncio")

def create_db_and_table():
    try:
        r.db_create('ep16').run(conn)
    except ReqlOpFailedError:
        pass
    try:
        r.db('ep16').table_create('scores').run(conn)
    except ReqlOpFailedError:
        pass

def json_default(obj):
    if isinstance(obj, datetime):
        return obj.strftime('%Y%m%dT%H:%M:%S+00:00')

def json_dump(doc):
    return json.dumps(doc, default=json_default)

async def get_scores(request):
    result = {
        'scores': []
    }

    conn = await r.connect(host="localhost", port=28015, db='ep16')
    documents = await r.table('scores').run(conn)
    for document in documents.items:
        result['scores'].append(document)
    return web.json_response(result, dumps=json_dump)

application = web.Application()
application.router.add_route('GET', '/scores', get_scores)

if __name__ == '__main__':

    try:
        import asyncio
    except ImportError:
        # Trollius >= 0.3 was renamed
        import trollius as asyncio

    # create_db_and_table()

    web.run_app(application, port=8000)
