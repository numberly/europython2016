#!/usr/bin/python3.5
# -*- coding: utf-8 -*-
"""
Single client test code (not used). IGNORE ME.
"""

import rethinkdb as r

from autobahn.asyncio.websocket import WebSocketServerProtocol, \
    WebSocketServerFactory
from rethinkdb.errors import ReqlOpFailedError

conn = r.connect(host="localhost", port=28015).repl()


class ScoresProtocol(WebSocketServerProtocol):

    def onConnect(self, request):
        print("Client connecting: {0}".format(request.peer))

    def onOpen(self):
        print("WebSocket connection open.")

    def onMessage(self, payload, isBinary):
        if isBinary:
            print("Binary message received: {0} bytes".format(len(payload)))
        else:
            print("Text message received: {0}".format(payload.decode('utf8')))

        # echo back message verbatim
        self.sendMessage(payload, isBinary)

    def onClose(self, wasClean, code, reason):
        print("WebSocket connection closed: {0}".format(reason))


def create_db_and_table():
    try:
        r.db_create('ep16').run(conn)
    except ReqlOpFailedError:
        pass
    try:
        r.db('ep16').table_create('scores').run(conn)
    except ReqlOpFailedError:
        pass


if __name__ == '__main__':

    try:
        import asyncio
    except ImportError:
        # Trollius >= 0.3 was renamed
        import trollius as asyncio

    create_db_and_table()

    factory = WebSocketServerFactory(u"ws://127.0.0.1:9000")
    factory.protocol = ScoresProtocol

    loop = asyncio.get_event_loop()
    coro = loop.create_server(factory, '0.0.0.0', 9000)
    server = loop.run_until_complete(coro)

    try:
        loop.run_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.close()
        loop.close()
