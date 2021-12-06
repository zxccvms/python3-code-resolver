import multiprocessing
import threading
from common.util.log_util import log
from core import processGlobal
from time import sleep
import psutil
import os
import shutil
import socket
from core.ws.ws_util import sendToMessage
import json
import subprocess
from common.util import sandbox_util, env_util,decryption_util
import time
processPool = None
toolsPool = None
# pingsPool = None
loglevelQueue = None
MobileMessageQueue = None
# 屏幕录制标识
screenQueue = None
websocketSendQueue = None
browserChromeHwndWindowMap = None
browserChromeHwndWindowLatest = None
browserChromeInspecting = None
requests = None
syncRequests = None
syncRequestResults = None

websocketLastPingTime = None
s = None
Trigger_list = None
Trigger_appId = None
ProcessCallbackDict = None

# 智能流程录制信号
ProcessesRecordSignal = None

address = ('127.0.0.1', 6446)

ws_conn = {
    'message': None,
    'chrome': None,
    'firefox': None,
}

# 获取共享变量token
CommanderConnectQueue = None
# 用户信息MAC_ID
UserInfo = None
# 中枢变密码量类型列表
PasswordList = None


def init(factory_name):
    mm = multiprocessing.Manager()
    global MobileMessageQueue
    MobileMessageQueue = mm.Queue()
    global screenQueue
    screenQueue = mm.dict()
    global loglevelQueue
    loglevelQueue = mm.Queue()
    global websocketSendQueue
    websocketSendQueue = mm.Queue()
    global browserChromeHwndWindowMap
    browserChromeHwndWindowMap = mm.dict()
    global browserChromeHwndWindowLatest
    browserChromeHwndWindowLatest = mm.dict()
    browserChromeHwndWindowLatest['windowId'] = 0
    browserChromeHwndWindowLatest['time'] = 0
    global requests
    requests = mm.dict()
    global syncRequests
    syncRequests = mm.dict()
    global browserChromeInspecting
    browserChromeInspecting = mm.dict()
    global syncRequestResults
    syncRequestResults = mm.dict()
    global websocketLastPingTime
    websocketLastPingTime = mm.dict()
    websocketLastPingTime['message'] = 0
    websocketLastPingTime['chrome'] = 0
    websocketLastPingTime['firefox'] = 0
    global Trigger_list
    Trigger_list = mm.list()
    global ProcessCallbackDict
    ProcessCallbackDict = mm.dict()
    global ProcessesRecordSignal
    ProcessesRecordSignal = mm.Queue()
    global Trigger_appId
    Trigger_appId = mm.list()

    global processPool
    global toolsPool
    # global pingsPool

    if factory_name and 'Z-Bot' in factory_name:
        processPool = multiprocessing.Pool(5, initializer=processGlobal.toolsInit)
    else:
        processPool = multiprocessing.Pool(1, initializer=processGlobal.toolsInit)

    # toolsPool = multiprocessing.Pool(1, initializer=processGlobal.toolsInit)
    # pingsPool = multiprocessing.Pool(1)
    shareMonitor_exit = threading.Thread(target=monitor_exit, name='shareMonitor',args=(factory_name,))
    shareMonitor_exit.start()
    shareMonitor = threading.Thread(target=monitor, name='shareMonitor')
    shareMonitor.start()

    global s
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    try:
        s.connect(address)
        log.info('触发器服务连接成功')
    except:
        pass
    sharemonitor_resv = threading.Thread(target=monitor_resv, name='monitor_resv', args=())
    sharemonitor_resv.start()
    sharemonitor_socket = threading.Thread(target=monitor_socket, name='monitor_socket', args=())
    sharemonitor_socket.start()
    getmobilemsg_socket = threading.Thread(target=Get_Msg_Usb, name='Get_Msg_Usb',
                                           args=(factory_name,))
    # getmobilemsg_socket = threading.Thread(target=Get_Msg_Usb, name='Get_Msg_Usb',
    #                                        args=('ZFACTORY_SMS',))
    getmobilemsg_socket.start()
    global CommanderConnectQueue
    CommanderConnectQueue = mm.dict()
    global UserInfo
    UserInfo = mm.dict()
    global PasswordList
    PasswordList = mm.list()





def get():
    return [
        websocketSendQueue,
        browserChromeHwndWindowMap,
        browserChromeHwndWindowLatest,
        requests,
        syncRequests,
        browserChromeInspecting,
        syncRequestResults,
        websocketLastPingTime,
        loglevelQueue,
        screenQueue,
        MobileMessageQueue,
        s,
        Trigger_list,
        ProcessCallbackDict,
        ProcessesRecordSignal,
        Trigger_appId,
        CommanderConnectQueue,
        UserInfo,
        PasswordList
    ]


def restore(param):

    global websocketSendQueue
    websocketSendQueue = param[0]
    global browserChromeHwndWindowMap
    browserChromeHwndWindowMap = param[1]
    global browserChromeHwndWindowLatest
    browserChromeHwndWindowLatest = param[2]
    global requests
    requests = param[3]
    global syncRequests
    syncRequests = param[4]
    global browserChromeInspecting
    browserChromeInspecting = param[5]
    global syncRequestResults
    syncRequestResults = param[6]
    global websocketLastPingTime
    websocketLastPingTime = param[7]
    global loglevelQueue
    loglevelQueue = param[8]
    global screenQueue
    screenQueue = param[9]
    global MobileMessageQueue
    MobileMessageQueue = param[10]
    global s
    s = param[11]
    global Trigger_list
    Trigger_list = param[12]
    global ProcessCallbackDict
    ProcessCallbackDict = param[13]
    global ProcessesRecordSignal
    ProcessesRecordSignal = param[14]
    global Trigger_appId
    Trigger_appId = param[15]
    global CommanderConnectQueue
    CommanderConnectQueue = param[16]
    global UserInfo
    UserInfo = param[17]
    global PasswordList
    PasswordList = param[18]


def monitor_resv():
    global s,Trigger_list
    num = 0
    while True:
        if num >= 10:
            log.error('触发器服务器无法连接，无法收取信息')
            return
        size = 2*1024*1024
        try:
            data = s.recv(size)
        except Exception as e:
            num += 1
            sleep(5)
            continue
        data = data.decode('utf8').split('\r\n')
        for i in data:

            if i == '1' or i == '' or i == '{"status":0,"message":"Welcome to Trigger Telnet Server","info":"","postBack":null}':
                continue
            log.info('触发器收到信息为{0}'.format(i))
            i = json.loads(i)


            # 判断是否是bot触发器
            if i['postBack']['source'] == 'bot':
                # 开始（添加）触发器成功
                if i['status'] == 1001:
                    sendToMessage('trigger', {
                        'status': 1001,
                        'appId': i['postBack']['appId']
                    }, i['postBack']['requestId'])

                # 关闭（删除）触发器成功
                elif i['status'] == 1002:
                    sendToMessage('trigger', {
                        'status': 1002,
                        'appId': i['postBack']['appId']
                    }, i['postBack']['requestId'])

                #触发器触发成功
                elif i['status'] == 1003:
                    sendToMessage('trigger', {
                        'status': 1003,
                        'appId': i['postBack']['appId']
                    }, i['postBack']['requestId'])

                #触发器校验成功
                elif i['status'] == 1004:
                    sendToMessage('verifyTriggerConfig', {
                        'status': 1004,
                        'msg':'触发器校验成功',
                    }, i['postBack']['requestId'])

                # 触发器异常
                else:
                    if str(i['status']).startswith('4004'):
                        sendToMessage('verifyTriggerConfig', {
                            'status': 0,
                            'msg': i['message']
                        }, i['postBack']['requestId'])
                    else:
                        sendToMessage('trigger', {
                            'status': 0,
                            'appId': i['postBack']['appId'],
                            'id': i['postBack']['targetTriggers'],
                            'msg': i['message']
                        }, i['postBack']['requestId'])



            elif i['postBack']['source'] == 'factory':

                # 开始（添加）触发器成功
                if i['status'] == 1001:
                    log.info({'status': 1001, 'appId': i['postBack']['appId'],
                                      'message':i['message']})


                # 关闭（删除）触发器成功
                elif i['status'] == 1002:
                    log.info({'status': 1002, 'appId': i['postBack']['appId'],
                                      'message': i['message']})

                # 触发器触发成功
                elif i['status'] == 1003:

                    Trigger_list.append({'status': 1003, 'appId': i['postBack']['appId'],
                                      'message': i['message']})

                # 触发器异常
                else:
                    log.error({'status': 0, 'appId': i['postBack']['appId'],
                                      'message': i['message']})
                    Trigger_list.append({'status': 0, 'appId': i['postBack']['appId'],
                                      'message': i['message']})


def monitor_socket():
    global s
    num = 0

    while True:
        # 重试次数
        if num >= 5:
            log.error('重连触发器服务器多次后仍失败！')
            sendToMessage('trigger', {
                'status': -1,
                'message': '触发器服务异常'
            }, '')
            return

        try:
            s.send('KeepLive 0\r\n'.encode('utf8'))
        except Exception as e:
            log.error(e)
            num += 1

            # 尝试重新链接
            try:
                log.error('触发器链接失败，正在重新链接')
                s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
                s.connect(address)
            except:
                log.error('触发器重连失败，正在重新启动服务')
                # 重启触发器服务端
                os.system('taskkill -f -im II.RPA.EventMonitor.exe')
                subprocess.Popen(env_util.root('dll\II.RPA.EventMonitor\II.RPA.EventMonitor.exe'))
                log.error('触发器启动成功,正在重新链接')
                sleep(5)
                s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
                try:
                    s.connect(address)
                    log.error('重新链接成功')
                    sendToMessage('trigger',{
                        'status': 2,
                        'message': '连接异常'
                    }, '')
                except:
                    log.error('重新链接失败')

                continue

        sleep(30)


def monitor_exit(factory_name):
    while True:
        if factory_name and 'trace' not in factory_name:
            pids = psutil.pids()
            pid_name = []
            for pid in pids:
                try:
                    p = psutil.Process(pid)
                    pid_name.append(p.name())
                except:
                    continue

            P = psutil.Process(os.getpid())
            if factory_name not in pid_name:
                log.info('{0}已关闭'.format(factory_name))
                if 'Z-Factory.exe' not in pid_name and 'Z-Bot.exe' not in pid_name:
                    log.info('无程序运行，开始关闭javaHonst')
                    with os.popen('taskkill -f -im II.RPA.JavaBridgeHost.exe', 'r') as f:
                        text = f.read()
                    log.info(text)
                    log.info('无程序运行，开始关闭adb')
                    with os.popen('taskkill -f -im adb.exe', 'r') as f:
                        text = f.read()
                    log.info(text)
                else:
                    log.info('仍有程序在运行，暂不关闭javaHonst')
                    log.info('仍有程序在运行，暂不关闭adb')


                for i in P.children():
                    if i.name() == 'II.RPA.JavaBridgeHost.exe':
                        pass
                    else:
                        i.terminate()
                        log.info('关闭进程：{0}'.format(i))


                log.info('Engine关闭')
                P.terminate()
        else:
            break
        sleep(5)


def monitor():

    log.info('share monitor start')

    # pool status
    # pingPoolState = toolsPool._state
    processPoolState = processPool._state

    # pingPoolStateLog = 'pingPoolState = ' + str(pingPoolState)
    processPoolStateLog = 'processPoolState = ' + str(processPoolState)

    # log.info(pingPoolStateLog)
    log.info(processPoolStateLog)

    # machine status
    virtual_memory = psutil.virtual_memory()
    total = virtual_memory.total  # unit byte
    used = virtual_memory.used
    memory = "Memory usage:%d" % (int(round(virtual_memory.percent))) + "%" + " "
    cpu = "CPU:%0.2f" % psutil.cpu_percent(interval=1) + "%"

    log.info(memory + cpu)
    log.info('memorey total={} used={}'.format(total, used))

    sleep(60)

# 通过Usb获取短信
def Get_Msg_Usb(name):
    global MobileMessageQueue

    st = subprocess.STARTUPINFO()
    st.dwFlags = subprocess.STARTF_USESHOWWINDOW
    st.wShowWindow = subprocess.SW_HIDE

    adbAppdata_path = os.environ["AppData"]+'\\adb'

    if not os.path.exists(adbAppdata_path):

        shutil.copytree(env_util.root('resource/adb'), adbAppdata_path)

    # 正式
    if name:
        factory_name = 'ZFACTORY_SMS' if name == 'Z-Factory.exe' or not name else 'ZBOT_SMS'
        adb_path = env_util.root(os.environ["AppData"]+'\\adb\\adb.exe')
    #开发
    else:
        factory_name = 'ZFACTORY_SMS'
        adb_path = env_util.root(os.environ["AppData"]+'\\adb\\adb.exe')

    log.info(adb_path)
    log.info('开始监控adb')
    while True:

        connect_order = 'cd {0} && adb.exe devices'.format(os.environ["AppData"]+'\\adb')

        pi = subprocess.Popen(connect_order,shell=True, stdin=subprocess.PIPE,stdout=subprocess.PIPE,stderr=subprocess.PIPE,startupinfo=st)

        result = pi.stdout.read().decode('utf8').split('\r\n')


        if result[0] != '':
            if result[1] == '':
                pass
            else:
                log.info('{0} 已链接'.format(result[1]))

                msg_order = 'cd {0} && adb.exe logcat [{1}]:W *:S'.format(os.environ["AppData"]+'\\adb', factory_name)

                pi = subprocess.Popen(msg_order,shell=True,stdin=subprocess.PIPE,stdout=subprocess.PIPE,stderr=subprocess.PIPE,startupinfo=st)

                strlist = ''
                for line in iter(pi.stdout.readline, ''):
                    if line.decode('utf8') == '':
                        break
                    data = line.rstrip().decode('utf8')
                    if data == '--------- beginning of system' or data == '--------- beginning of main' or data == '--------- beginning of crash':
                        continue
                    if 'SMS-START' in data:
                        continue
                    strlist += data.split(':')[-1]
                    strlist = strlist.replace(' ', '').replace('\r','')
                    if 'SMS-END' in data:
                        strlist = strlist.strip('SMS-END')
                        MobileMessageQueue.put(strlist)
                        strlist = ''
                        continue

        time.sleep(5)





