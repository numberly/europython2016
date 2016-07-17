#!/usr/bin/python3.5
# -*- coding: utf-8 -*-
"""
THIS IS THE AUTOBAHN ASYNCIO API SERVER CODE !

RUN ME and TRY me by opening the client.html on your browser (check your browser console too).
"""

import logging
import asyncio
import json
import rethinkdb as r

from autobahn.asyncio.websocket import WebSocketServerProtocol, \
    WebSocketServerFactory
from datetime import datetime
from rethinkdb.errors import ReqlOpFailedError

logging.root.setLevel(logging.DEBUG)
r.set_loop_type("asyncio")

# 172.17.15.179  # JTHE
# 172.17.15.2    # AJM
DB_HOST = "localhost"
DB_PORT = 28015
DB_NAME = 'ep16'


def json_default(obj):
    if isinstance(obj, datetime):
        return obj.strftime('%Y%m%dT%H:%M:%S+00:00')


def json_dump(doc):
    return json.dumps(doc, default=json_default, ensure_ascii=False).encode('utf8')


class ScoresProtocol(WebSocketServerProtocol):

    def onConnect(self, request):
        print("Client connecting: {0}".format(request.peer))

    def onOpen(self):
        print("WebSocket connection open.")

    def onClose(self, wasClean, code, reason):
        print("WebSocket connection closed: {0}".format(reason))

    async def onMessage(self, payload, isBinary):
        cmd = payload.decode('utf8').split()[0]
        args = payload.decode('utf8').split()[1:]
        print('onMessage cmd=', cmd, 'args=', args)
        try:
            await getattr(self, cmd)(args)
        except Exception as err:
            logging.exception(err)

    async def rt_scores(self, args):
        conn = await r.connect(host=DB_HOST, port=DB_PORT, db=DB_NAME)
        if len(args) == 1:
            id_user = args[0]
            documents = await r.table('scores').filter({'id_user': id_user}).changes(include_initial=True).run(conn)
        else:
            documents = await r.table('scores').changes(include_initial=True).run(conn)
        async for document in documents:
            self.sendMessage(json_dump(document))

    async def get_scores(self, args):
        conn = await r.connect(host=DB_HOST, port=DB_PORT, db=DB_NAME)
        id_user = args[0]
        documents = await r.table('scores').filter({'id_user': id_user}).run(conn)

        async for document in documents:
            self.sendMessage(json_dump(document))

    async def rt_top_overall(self, args):
        conn = await r.connect(host=DB_HOST, port=DB_PORT, db=DB_NAME)
        documents = await r.table('scores').order_by(index=r.desc('total_score')).limit(10).changes(include_initial=True, include_offsets=True).run(conn)
        async for document in documents:
            self.sendMessage(json_dump(document))

    async def rt_top_by_day(self, args):
        conn = await r.connect(host=DB_HOST, port=DB_PORT, db=DB_NAME)
        date = args[0]
        documents = await r.table('scores').order_by(index=r.desc('date_score_user')).limit(10).changes(include_initial=True, include_offsets=True).run(conn)
        async for document in documents:
            self.sendMessage(json_dump(document))


if __name__ == '__main__':

    loop = asyncio.get_event_loop()

    factory = WebSocketServerFactory(u"ws://127.0.0.1:9000")
    factory.protocol = ScoresProtocol

    coro = loop.create_server(factory, '0.0.0.0', 9000)
    server = loop.run_until_complete(coro)

    try:
        loop.run_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.close()
        loop.close()

else:
    application = ScoresProtocol()
    print(application)
