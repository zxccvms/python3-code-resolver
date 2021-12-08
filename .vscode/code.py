#!/usr/bin/python3
# encoding=utf-8
import queue
import json
import tornado
import tornado.httpserver
import tornado.ioloop
import tornado.web
from common.util.log_util import log
from core import share
from core.handler import chrome, message
import asyncio
from common.util.plugins_util import getPluginsConfig
from core.ws.ws_util import sendToMessage
from common.util.DynamicPort_util import get_free_port
import os
payload_level = None

def send_queued_msg():
    global payload_level

    try:
        payload_level = share.loglevelQueue.get(True,0.1)
    except queue.Empty:
        pass
    try:
        message = share.websocketSendQueue.get(True, 0.1)
    except queue.Empty:
        # Handle empty queue here
        pass
    else:
        try:
            level = payload_level[0]
            payload_id = payload_level[1]
        except Exception:
            level = -1
            payload_id = ''
        if message is None:
            return
        ws_type, msg = message
        if not share.ws_conn[ws_type]:
            share.websocketSendQueue.put(message)
            share.loglevelQueue.put(payload_level)
            return

        # log.info('[%s] queue send -> %s', ws_type, msg)
        if ws_type in {'message', 'chrome', 'firefox'} and share.ws_conn[ws_type]:
            if json.loads(msg)['action'] != 'trace_log':
                share.ws_conn[ws_type].write_message(msg.encode('utf8',errors = 'ignore'))
            else:
                if level == -2:
                    pass
                else:
                    msg = json.loads(msg)
                    msg['payload']['id'] = payload_id
                    share.ws_conn[ws_type].write_message(msg)


class RPAServer:
    def __init__(self, port,factory_name):
        share.init(factory_name)
        message.uiInit()
        # pluginsResult = getPluginsConfig('Z-Factory' if factory_name == 'Z-Factory.exe' else 'Z-Bot')
        # if pluginsResult:
        #     sendToMessage('reloadComponent', {
        #         'code': '0',
        #         'message': ''
        #     }, 'XXX')
        # chrome.uiInit()
        self.start(port)

    def start(self, port):
        log.info('ws server started')
        app = tornado.web.Application([
            (r"/server", message.serve),
            (r"/mobile_msg", message.Mobile_Message),
            (r"/check_connection", message.check_connection)
        ])
        http_server = tornado.httpserver.HTTPServer(app)
        asyncio.set_event_loop(asyncio.new_event_loop())

        if int(port) != 6444:
            while True:
                port = get_free_port()
                log.info('当前空闲为{0}'.format(port))
                try:
                    http_server.listen(port)
                    with open(os.environ["AppData"]+'\\Z-Bot\\Port.json','w') as f:
                        f.write(json.dumps({'Port':port}))
                    log.info('Z-Bot端口已确定')
                    break
                except Exception as e:
                    log.error(e)
                    continue
        else:
            http_server.listen(port)
        log.info('服务已正常启动')
        tornado.ioloop.PeriodicCallback(callback=send_queued_msg, callback_time=1).start()
        tornado.ioloop.IOLoop.current().start()


def run(port,factory_name):
    rpaServer = RPAServer(port, factory_name)

