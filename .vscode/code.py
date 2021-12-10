ACTION_ERROR = 'error'
ACTION_LOG = 'log'
ACTION_PING = 'ping'
ACTION_PONG = 'pong'
ACTION_RUN = 'run'
ACTION_STOP = 'stop'
ACTION_CLOSE = 'close'
ACTION_SCREENSHOT = 'screenshot'
ACTION_SCREENREGION = 'screenregion'
ACTION_UISELECTOR = 'uiselector'
ACTION_VALIDATERULE = 'validaterule'
ACTION_UIWINDOWSELECTOR = 'uiwindowselector'
ACTION_TRACE_LOG = 'trace_log'
ACTION_PLUGINSETUP = "pluginsetup"
USB_GETCOMS = "USB_getcoms"
Mouse_Record = "mouseRecord"


import multiprocessing
import time
from common.util.log_util import log
from core.ws.ws_util import sendToScreen,sendToMobileMessage
from core import share, processGlobal
from core.handler.base import WebSocketHandlerBase
from core.ws.ws_util import sendToMessage
import gc
import tornado.web
import json
import os
import psutil
import sys
# from core.handler.action import screen_capture
from core.processGlobal import getpluginsLoaderSDK

handleName = 'websocket.message'
listeners = {}
runningProcessMap = {}
runningPings = []
runningProcessStatus = {}


def uiSubscribe(name, action, listener):
    if name not in listeners:
        if type(action) == str:
            action = [action]
        listeners[name] = {}
        listeners[name]['action'] = action
        listeners[name]['callback'] = listener
    from common.util.log_util import log

    log.info('[message] subscribe %s - %s - %s', name, action, listener)


def uiInit():
    # pub.subscribe(uiHandle, handleName)
    from core.handler.action import message_ping, message_run, ui_selector_cs, ui_selector_cv, ui_selector_window,\
        screen_shot, data_crawler, screen_region, USB_Get_Coms, mouse_get_location, Plug_Installation, verifySelector,ui_selector_ocr,\
        Trigger, TriggerVerify, StartProcessRecode,ControlProcessRecode,collectData,share_variable,user_info,DB_Test,pluinsVerify,\
        Stop_Action, checkHidDrive, selfDevelopment_Browser,setOptions, ExportPackage,Debug_action
    # from core.handler.action.plugin_install_action import java_plugin
    uiSubscribe(message_ping.name, message_ping.action, message_ping.execute)
    uiSubscribe(message_run.name, message_run.action, message_run.execute)
    uiSubscribe(screen_shot.name, screen_shot.action, screen_shot.execute)
    uiSubscribe(screen_region.name, screen_region.action, screen_region.execute)
    uiSubscribe(ui_selector_cv.name, ui_selector_cv.action, ui_selector_cv.execute)
    uiSubscribe(ui_selector_cs.name, ui_selector_cs.action, ui_selector_cs.execute)
    uiSubscribe(ui_selector_window.name, ui_selector_window.action, ui_selector_window.execute)
    uiSubscribe(data_crawler.name, data_crawler.action, data_crawler.execute)
    uiSubscribe(USB_Get_Coms.name, USB_Get_Coms.action, USB_Get_Coms.execute)
    uiSubscribe(mouse_get_location.name, mouse_get_location.action, mouse_get_location.execute)
    uiSubscribe(Plug_Installation.name, Plug_Installation.action, Plug_Installation.execute)
    uiSubscribe(verifySelector.name, verifySelector.action, verifySelector.execute)
    uiSubscribe(ui_selector_ocr.name, ui_selector_ocr.action, ui_selector_ocr.execute)
    uiSubscribe(Trigger.name, Trigger.action, Trigger.execute)
    uiSubscribe(TriggerVerify.name, TriggerVerify.action, TriggerVerify.execute)
    uiSubscribe(StartProcessRecode.name, StartProcessRecode.action, StartProcessRecode.execute)
    uiSubscribe(ControlProcessRecode.name, ControlProcessRecode.action, ControlProcessRecode.execute)
    uiSubscribe(collectData.name, collectData.action, collectData.execute)
    uiSubscribe(share_variable.name, share_variable.action, share_variable.execute)
    uiSubscribe(user_info.name, user_info.action, user_info.execute)
    uiSubscribe(DB_Test.name, DB_Test.action, DB_Test.execute)
    uiSubscribe(pluinsVerify.name, pluinsVerify.action, pluinsVerify.execute)
    uiSubscribe(selfDevelopment_Browser.name, selfDevelopment_Browser.action, selfDevelopment_Browser.execute)
    # uiSubscribe(Stop_Action.name, Stop_Action.action, Stop_Action.execute)
    uiSubscribe(checkHidDrive.name, checkHidDrive.action, checkHidDrive.execute)
    uiSubscribe(setOptions.name, setOptions.action, setOptions.execute)
    uiSubscribe(ExportPackage.name, ExportPackage.action, ExportPackage.execute),
    uiSubscribe(Debug_action.name, Debug_action.action, Debug_action.execute)



def filter_queued_log_msg():
    res = []
    while not share.websocketSendQueue.empty():
        message = share.websocketSendQueue.get()
        share.websocketSendQueue.task_done()
        ws_type, msg = message
        if ws_type == 'message' and 'log' in msg:
            pass
        else:
            res.append(message)

    while res:
        share.websocketSendQueue.put(res.pop())


class serve(WebSocketHandlerBase):
    name = 'message'

    def handle(self, package):
        if package['action'] == ACTION_STOP:
            # # 关闭管道
            # getpluginsLoaderSDK().Run("GUIChrome.ChromeRelease", "Excute", "{}")
            # getpluginsLoaderSDK().Run("GUIFireFox.FireFoxRelease", "Excute", "{}")

            # 关闭触发器
            if list(share.Trigger_appId) != []:
                try:
                    # 关闭触发器
                    share.s.send(
                        'CloseTrigger {0}\r\n'.format(json.dumps(list(share.Trigger_appId), ensure_ascii=False)).encode(
                            'utf8'))
                except:
                    log.info('关闭触发器{0}'.format(share.Trigger_appId))
                finally:
                    for i in share.Trigger_appId:
                        share.Trigger_appId.remove(i)



            filter_queued_log_msg()
            if 'source' in package['payload']:
                share.screenQueue[package['payload']['id']] = 'Stop'
                log.info(share.screenQueue)
                # while True:
                #     if share.processPool and share.screenQueue[package['payload']['id']] == 'StopSuccess':
                #         # pid_dict = share.ProcessCallbackDict
                #         # p = psutil.Process(pid_dict[package['payload']['id']])
                #         # # p.terminate()
                #         # share.ProcessCallbackDict.pop(package['payload']['id'])
                #         # share.screenQueue.pop(package['payload']['id'])
                #         break
            else:
                if share.processPool:
                    share.processPool.terminate()
                share.processPool = multiprocessing.Pool(1, initializer=processGlobal.toolsInit,
                                                         initargs=(package['payload']['root'],))
            # send msg after rebuild pool
                sendToMessage(ACTION_RUN, {'id': package['payload']['id'], 'status': 'stopped'}, package['requestId'])
                gc.collect()

        elif package['action'] == ACTION_CLOSE:
            pids = psutil.pids()

            pid_name = []
            for pid in pids:
                try:
                    p = psutil.Process(pid)
                    pid_name.append(p.name())
                except:
                    continue
            log.info('开始关闭engine')
            if share.processPool:
                share.processPool.terminate()
                # share.toolsPool.terminate()
                log.info('已关闭进程池')
            try:

                if 'Z-Factory.exe' in pid_name and 'Z-Bot.exe' in pid_name:
                    log.info('仍有程序在运行，暂不关闭javaHonst')
                    log.info('仍有程序在运行，暂不关闭adb')
                else:
                    log.info('无程序运行，开始关闭javaHonst')
                    with os.popen('taskkill -f -im II.RPA.JavaBridgeHost.exe', 'r') as f:
                        text = f.read()

                    log.info(text)
                    log.info('无程序运行，开始关闭adb')
                    with os.popen('taskkill -f -im adb.exe', 'r') as f:
                        text = f.read()
                    log.info(text)

                P = psutil.Process(os.getpid())
                for i in P.children():
                    if i.name() == 'II.RPA.JavaBridgeHost.exe':
                        pass
                    else:
                        i.terminate()
                        log.info('关闭进程：{0}'.format(i))
            except Exception as e:
                log.info(e)

            log.info('engine关闭完成')
            os._exit(0)

        elif package['action'] == 'stopAction':
            share.processPool.terminate()
            share.processPool = multiprocessing.Pool(1, initializer=processGlobal.toolsInit)
            sendToMessage('stopAction', {
                'code': '0',
                'message': ''
            }, package['requestId'])

        else:
            for n in listeners:
                if package['action'] in listeners[n]['action']:
                    if package['action'] == ACTION_PING:
                        sendToMessage(ACTION_PONG, package['payload'], package['requestId'])
                        share.websocketLastPingTime['message'] = int(time.time())
                    elif package['action'] == ACTION_RUN:
                        log.info(ACTION_RUN)
                        share.processPool.apply_async(listeners[n]['callback'], (package, share.get()))
                        share.processPool.apply_async(gc.collect())
                    else:
                        log.info(listeners[n]['action'])
                        # 判断为Factory 插件校验，插件清单，并进行dll Init
                        if package['action'] == 'pluginsVerify' and os.path.isfile(str(package['payload']['pluginsPath']))\
                                and 'root' not in package['payload']:
                            share.processPool.terminate()
                            share.processPool = multiprocessing.Pool(1, initializer=processGlobal.toolsInit,
                                                                     initargs=(os.path.dirname(package['payload']['pluginsPath']),))
                        # single task process. should use apply and catch TimeoutError then send error msg //TODO
                        share.processPool.apply_async(listeners[n]['callback'], (package, share.get()))
                        share.processPool.apply_async(gc.collect())


# 获取手机验证码
class Mobile_Message(tornado.web.RequestHandler):


    def post(self):

        try:
            post_data = json.loads(self.request.body.decode('utf8'))

            sendToMobileMessage(eval(post_data['data'])['encryData'].replace('\n',''))

            data = {'code':0, 'msg':'SUCCESS'}

        except Exception as e:

            data = {'code': 1, 'msg': 'FAILD'}

        self.set_header("Content-Type", "application/json;charset=UTF-8")

        self.write(json.dumps(data))


# 检查与手机网络连接
class check_connection(tornado.web.RequestHandler):

    def get(self):


        data = {'code':0, 'msg':'SUCCESS'}

        self.set_header("Content-Type", "application/json;charset=UTF-8")

        self.write(json.dumps(data))







