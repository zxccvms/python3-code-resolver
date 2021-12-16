import logging
import multiprocessing
import socket
import sys
import os
import warnings
import win32pipe, win32file
import time
import threading
import subprocess
import ctypes
import importlib
import getopt
import json
import traceback

from common.util import env_util
from common.util.log_util import log
from version import VERSION
from core.ws import ws_server
from core.processGlobal import toolsInit
from core import share
from common.error.ComponentError import ComponentError, get_syntax_error_info
from common.util import str_util

import requests
import warnings
from config import cvPort
warnings.filterwarnings("ignore", "(?s).*MATPLOTLIBDATA.*", category=UserWarning)

# 禁用 pyautogui 安全保护机制
import pyautogui
pyautogui.FAILSAFE = False
# 第三方包管理
sys.path.insert(-1, env_util.root('resource/extend/python'))
# 标准插件管理
sys.path.insert(0, env_util.root('plugins'))
# 临时插件管理
sys.path.insert(1, env_util.GetAppDataPath(''))

env_util.setMode(env_util.MODE_SERVER)
# 虚拟桌面消息队列
virtual_desktop_message_list = []
PIPE_NAME = r'\\.\\pipe\\engine'
# 线程退出标识
virtual_desktop_stop_tag = False


def virtual_desktop_run(root, path: str):
    log.info('------------ rpa.main() start -----------')
    global virtual_desktop_message_list
    global virtual_desktop_stop_tag
    sys.path.insert(0, root)
    json_path = path.replace("main.py", "package.json")
    with open(json_path, 'r', encoding="utf-8") as load_f:
        package = json.load(load_f)
    # 加载代码
    try:
        log.info("加载代码")
        module_spec = importlib.util.spec_from_file_location("RPAProject", path)
        module = importlib.util.module_from_spec(module_spec)
        module_spec.loader.exec_module(module)
        rpa = module.RPAProject()
        log.info("代码记载完成，开始运行")
        rpa.main()
        log.info("代码运行完成")
        share.LogMessageQueue.put(("log", {'id': package['payload']['id'], 'text': 'project [%s] run end' % package['payload']['id']},
                                            package['requestId']))

        share.LogMessageQueue.put(("run", {"id": package['payload']['id'], "status": "success", "video": ""},
                                                package['requestId']))
    except SystemExit as e:
        share.LogMessageQueue.put(("log",
                                               {'id': package['payload']['id'], 'text': 'project [%s] run end' % package['payload']['id']},
                                                package['requestId']))
    except SyntaxError as e:
        log.exception(e)
        etype, value, tb = sys.exc_info()
        a_list = traceback.format_exception(etype, value, tb)
        err_no = None
        taskName = None
        with open(path, 'r', encoding="utf8") as f:
            code = f.read()
        for i in a_list:
            if "main.py" in i:
                err_no = i.split("line")[-1].strip()
                err_no = int(err_no)
            if "#@!" in i:
                taskName = i.strip()

        if not taskName:
            codelist = code.split('\n')[err_no:]
            for c in codelist:
                if "#@!" in c:
                    taskName = c.strip()
                    break

        share.LogMessageQueue.put(("error", {'id': package['payload']['id'], 'status': 'error',
                                     'text': 'run error : %s' % get_syntax_error_info(e),
                                     'type': 'commponents', 'position': [err_no, taskName]}, package['requestId']))
    except Exception as e:
        err_no = None
        taskName = None

        log.exception(e)
        _, _, exc_tb = sys.exc_info()

        if path:
            for err in traceback.extract_tb(exc_tb):
                if err.filename.replace('/', '\\') == path.replace('/',
                                                                             '\\') + '\main.py' and err.name != 'main':
                    err_no = err.lineno
                    taskName = err.line
        if taskName:
            if '#@!' not in taskName:
                with open(path, 'rb') as f:
                    code = f.read().decode('utf8')
                codelist = code.split('\n')[err_no:]
                for l in codelist:
                    if '#@!' in l:
                        share.LogMessageQueue.put(("error",
                                      {'id': package['payload']['id'], 'status': 'error',
                                       'text': 'run error : %s' % get_syntax_error_info(e),
                                       'type': 'commponents', 'position': [err_no, l]}, package['requestId']))
                        break

            else:
                share.LogMessageQueue.put(("error",
                              {'id': package['payload']['id'], 'status': 'error',
                               'text': 'run error : %s' % get_syntax_error_info(e),
                               'type': 'commponents', 'position': [err_no, taskName]},
                              package['requestId']))


        share.LogMessageQueue.put(("error",
                                                {'id': package['payload']['id'], 'status': 'error',
                                                 'text': 'run error : %s' % get_syntax_error_info(e),
                                                 'type': 'commponents', 'position': []},
                                                package['requestId']))

        share.LogMessageQueue.put(("run",
                                                {"id": package['payload']['id'], "status": "error", "video": ""},
                                                package['requestId']))
        log.error(e)

    log.info('------------ rpa.main() end -----------')

    while True:
        try:
            if share.LogMessageQueue.qsize() == 0:
                virtual_desktop_stop_tag = True
        except Exception as e:
            virtual_desktop_stop_tag = True



def sub_engine_client():
    log.info("start sub engine")
    while True:
        global virtual_desktop_stop_tag
        global virtual_desktop_message_list
        try:
            file_handle = win32file.CreateFile(
                PIPE_NAME,
                win32file.GENERIC_READ | win32file.GENERIC_WRITE,
                win32file.FILE_SHARE_WRITE,
                None,
                win32file.OPEN_EXISTING, 0, None)

            try:
                message = win32file.ReadFile(file_handle, 65535)
                if message:
                    message = message[1]
                    message = message.decode()

                if isinstance(message, str):
                    message = message.strip()

                if str(message) == '"stop"':
                    virtual_desktop_stop_tag = True
                    share.LogMessageQueue.put( ("run",
                                                         {'id': "", 'status': 'stopped'},
                                                         ""))
            except Exception as e:
                pass

            try:
                msg = share.LogMessageQueue.get(True, 0.1)
                msg = json.dumps(msg, ensure_ascii=False)
                log.info(msg)
                msg = msg.encode('utf8')
                win32file.WriteFile(file_handle, msg)
            except Exception as e:
                pass

            win32file.CloseHandle(file_handle)

        except Exception as e:
            pass


def is_admin():
    try:
        return ctypes.windll.shell32.IsUserAnAdmin()
    except:
        return False

def directRun(runDir,path):
    # 复制文件到debug目录
    if path:
        sys.path.insert(0, path[0])
        toolsInit(path=path[0])

    # 动态加载该文件
    module = importlib.import_module('sandbox.'+runDir+'.main')
    rpa = module.RPAProject()
    rpa.sandbox = {'name': 'debug', 'path': 'debug'}

    log.info('------------ rpa.main() start -----------')
    try:
        rpa.main()
    except:
        pass
    log.info('------------ rpa.main() end -----------')
    # 执行需要debug的文件


def get_port_status(port):
    ip = "127.0.0.1"
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    try:
        server.connect((ip, port))
        log.info('端口 port {1} 被占用'.format(ip, port))
        return True
    except Exception as err:
        log.info('{0} port {1} is not open'.format(ip, port))
        return False
    finally:
        server.close()


if __name__ == '__main__':
    multiprocessing.freeze_support()

    logging.info(' =============================================== ')
    log.info('|   _____ ______           _____  _____        ')
    log.info('|  / ____|___  /          |  __ \|  __ \ /\    ')
    log.info('| | (___    / /   ______  | |__) | |__) /  \   ')
    log.info('|  \___ \  / /   |______| |  _  /|  ___/ /\ \  ')
    log.info('|  ____) |/ /__           | | \ \| |  / ____ \ ')
    log.info('| |_____//_____|          |_|  \_\_| /_/    \_')
    log.info('|')
    log.info('|                      Core.Version : v%s ', VERSION)
    log.info('|                Bootstrap as Admin : %s ' % (is_admin()))
    log.info(' =============================================== ')
    log.info(sys.argv)

    port = 6444
    factory_name = None

    try:
        log.info(sys.argv)
        num = None
        for i in sys.argv:
            if '-N' in i:
                num = int(i.split("==")[1])
        log.info(f"bot 启动数量 {num}")
        if len(sys.argv) > 1:
            if sys.argv[1] == '-p':
                # 启动javahost进程
                subprocess.Popen(r'dll\ElementSDKV1\II.RPA.JavaHost\II.RPA.JavaBridgeHost.exe')
                # 启动触发器服务器进程
                subprocess.Popen(r'dll\II.RPA.EventMonitor\II.RPA.EventMonitor.exe')
                # bot 启动录屏
                if port != '6444':
                    subprocess.Popen(r'dll\\ElementSDKV1\\II.RPA.RecordScreen\\II.RPA.NativeMessagingHostLp.exe')
                # 启动Z-Brain
                subprocess.Popen(r'resource\Z-Brain\Z-Brain.exe -P {0}'.format(cvPort), shell=True)


                log.info('engine启动端口为{0}'.format(sys.argv[2]))
                port = sys.argv[2]
                factory_name = 'Z-Factory.exe' if port == '6444' else 'Z-Bot.exe'
                if num:
                    ws_server.run(port, factory_name, num=num)
                else:
                    ws_server.run(port, factory_name)
            elif sys.argv[1] == '-t':
                log.info('engine启动端口为{0}'.format(sys.argv[2]))
                port = sys.argv[2]
                factory_name = 'Z-Factory_trace' if port == '6444' else 'Z-Bot_trace'
                ws_server.run(port, factory_name)
            elif sys.argv[1] == '-s':
                engine_path = sys.argv[0]
                project_path = sys.argv[2]
                main_path = sys.argv[3]
                # DLL及消息队列初始化
                share.init(factory_name, "pipe", (engine_path, project_path))
                # message.uiInit()
                # 运行 main.py 线程
                run_thread = threading.Thread(target=virtual_desktop_run, args=(project_path, main_path))
                run_thread.daemon = True
                run_thread.start()
                # pipe 客户端线程
                pipe_thread = threading.Thread(target=sub_engine_client)
                pipe_thread.daemon = True
                pipe_thread.start()


                while True:
                    if virtual_desktop_stop_tag:
                        sys.exit()
                    time.sleep(1)
            else:
                try:
                    opts, args = getopt.getopt(sys.argv[1:], "hpzd:", ["processFile=", "zparam=", "directRun="])
                except getopt.GetoptError as ex:
                    log.error('bootstrap.py --processFile=<processFile>')
                    sys.exit(2)
                for opt, arg in opts:
                    log.info(opt + ' ' + arg)
                    if opt == '-h':
                        log.info(
                            'y.py -i <inputfile> -o <outputfile>'
                        )
                        sys.exit()
                    elif opt in ("-p", "--processFile"):
                        processFile = arg
                        log.info('输入的文件路徑为：' + processFile)
                    elif opt in ("-d", "--directRun"):
                        directRunDir = arg
                        log.info('directRun的文件路徑为：' + directRunDir)

                if not directRunDir:
                    pass
                else:
                    directRun(directRunDir,args)
                    sys.exit()
        else:
            status = get_port_status(port)
            if status:
                os._exit(1)
            if not num:
                ws_server.run(port, factory_name)
            else:
                ws_server.run(port, factory_name, num=num)
    except Exception as e:
        log.exception(str(e))
