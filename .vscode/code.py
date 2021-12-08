#!/usr/bin/python3
# encoding=utf-8

import json
import time
import uuid

import core.handler.chrome
from common.util import str_util
from core import share
from core.ws import ws_req_manager


def generateRequestId():
    return str_util.randomString(10)


def build(action, payload={}, requestId=None):
    package = {}
    if requestId is None:
        requestId = str_util.randomString(10)
    package['requestId'] = requestId
    package['action'] = action
    package['payload'] = payload
    dumps = json.dumps(package, ensure_ascii=False)
    return dumps


if __name__ == '__main__':
    j = {'a': '{  ControlType: WindowControl    ClassName: Window • - Sublime Text (UNREGISTERED) - 1 个运行窗口'
         }
    dumps = json.dumps(j, ensure_ascii=False)
    # print(dumps)


def sendToMessage(action, payload={}, requestId=None):
    if not share.websocketSendQueue:
        return

    if action == "trace_log":
        task_id = str(uuid.uuid1())
        if payload.get("args", None):
            count = 20000
            if payload.get("retData", None):
                if len(payload["retData"]) > count:
                    payload["retData"] = payload["retData"][:count] + "..."

            if len(str(payload["args"])) > count:
                num = 1
                start_index = 0
                step = count
                import copy
                data = copy.copy(payload["args"])
                while True:
                    num_list = task_id.split('-')[:-1]
                    num_str = str(num).zfill(12)
                    num_list.append(num_str)
                    payload["taskNum"] = '-'.join(num_list)
                    payload["args"] = data[start_index:start_index + step]
                    if not payload["args"]:
                        break
                    start_index += step
                    num += 1
                    share.websocketSendQueue.put(('message', build(action, payload, requestId=requestId)))
            else:
                num_list = task_id.split('-')[:-1]
                num_str = str(1).zfill(12)
                num_list.append(num_str)
                payload["taskNum"] = '-'.join(num_list)
                share.websocketSendQueue.put(('message', build(action, payload, requestId=requestId)))
        else:
            num_list = task_id.split('-')[:-1]
            num_str = str(1).zfill(12)
            num_list.append(num_str)
            payload["taskNum"] = '-'.join(num_list)
            share.websocketSendQueue.put(('message', build(action, payload, requestId=requestId)))

    elif action == "log":
        task_id = str(uuid.uuid1())
        if payload.get("text", None):
            count = 20000
            if len(str(payload["text"])) > count:
                num = 1
                start_index = 0
                step = count
                import copy
                data = copy.copy(payload["text"])
                while True:
                    num_list = task_id.split('-')[:-1]
                    num_str = str(num).zfill(12)
                    num_list.append(num_str)
                    payload["taskNum"] = '-'.join(num_list)
                    payload["text"] = data[start_index:start_index+step]
                    if not payload["text"]:
                        break
                    start_index += step
                    num += 1
                    share.websocketSendQueue.put(('message', build(action, payload, requestId=requestId)))
            else:
                num_list = task_id.split('-')[:-1]
                num_str = str(1).zfill(12)
                num_list.append(num_str)
                payload["taskNum"] = '-'.join(num_list)
                share.websocketSendQueue.put(('message', build(action, payload, requestId)))
        else:
            num_list = task_id.split('-')[:-1]
            num_str = str(1).zfill(12)
            num_list.append(num_str)
            payload["taskNum"] = '-'.join(num_list)
            share.websocketSendQueue.put(('message', build(action, payload, requestId)))

    else:
        share.websocketSendQueue.put(('message', build(action, payload, requestId)))


def sendToLogLevel(level):
    if not share.loglevelQueue:
        return

    share.loglevelQueue.put(level)

def sendToScreen(record):
    if not share.screenQueue:
        return

    share.screenQueue.put(record)

def sendToMobileMessage(record):
    if not share.MobileMessageQueue:
        return
    share.MobileMessageQueue.put(record)




def sendToChrome(action, payload={}, requestId=None):
    share.websocketSendQueue.put(('chrome', build(action, payload, requestId)))


def sendToChromeCommand(name, param, requestId=None):
    sendToChrome(core.handler.chrome.ACTION_RUN, {'name': name, 'param': param}, requestId)


def sendToChromeCommandSync(name, param, requestId=None):
    if requestId is None:
        requestId = generateRequestId()
    ws_req_manager.putSyncRequest(requestId, True)
    sendToChrome(core.handler.chrome.ACTION_RUN, {'name': name, 'param': param}, requestId)
    result = ws_req_manager.getSyncRequestResult(requestId)
    if result is None:
        return None
    return result['payload']


def sendToChromeCommandSyncWithRetry(checkFunc, name, param, requestId=None, timeout=30.0):
    start = time.time()
    while start + timeout > time.time():
        ret = sendToChromeCommandSync(name, param, requestId)
        if checkFunc(ret):
            return ret
        time.sleep(1.0)
    if start + timeout <= time.time():
        raise Exception("execute %s timeout" % name)


def sendToFirefox(action, payload={}, requestId=None):
    share.websocketSendQueue.put(('firefox', build(action, payload, requestId)))


def sendToCommanderConnect(record):
    share.CommanderConnectQueue['url'] = record['url']
    share.CommanderConnectQueue['token'] = record['token']


def sendToUserInfo(record):
    share.UserInfo['CLIENT-USER'] = record['CLIENT-USER']
    share.UserInfo['CLIENT-MAC'] = record['CLIENT-MAC']
