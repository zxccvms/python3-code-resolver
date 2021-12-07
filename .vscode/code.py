#!/usr/bin/python3
# encoding=utf-8

import time
from core import share


def putSyncRequest(requrestId, data=None, timeout=60.0):
    share.syncRequests[requrestId] = {
        'data': data,
        'expire': time.time() + timeout,
    }


def pullSyncRequest(requestId):
    if requestId in share.syncRequests:
        data = share.syncRequests[requestId].copy()
        del share.syncRequests[requestId]
        return data['data']
    return None


def putSyncRequestResult(requestId, package):
    share.syncRequestResults[requestId] = package


def getSyncRequestResult(requestId, timeout=10.0):
    start = time.time()
    while start + timeout > time.time():
        if requestId in share.syncRequestResults:
            result = share.syncRequestResults[requestId].copy()
            del share.syncRequestResults[requestId]
            return result
        time.sleep(0.05)
    return None


def put(requestId, biz, data=None, timeout=60.0):
    share.requests[requestId] = {
        'biz': biz,
        'data': data,
        'expire': time.time() + timeout,
    }


def get(requestId):
    if requestId in share.requests:
        if share.requests[requestId]['expire'] > time.time():
            return (share.requests[requestId]['biz'], share.requests[requestId]['data'])
        del share.requests[requestId]
    return (None, None)


def pull(requestId):
    if requestId in share.requests:
        expire = share.requests[requestId]['expire']
        data = share.requests[requestId]['data']
        biz = share.requests[requestId]['biz']
        del share.requests[requestId]
        if expire > time.time():
            return (biz, data)
    return (None, None)
