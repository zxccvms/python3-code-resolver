import logging
import multiprocessing
import socket
import sys
from common.util import env_util
from common.util.log_util import log
from version import VERSION
import subprocess
import ctypes
import importlib
import getopt
from core.ws import ws_server
import os
from core.processGlobal import toolsInit
# import pynput
import warnings
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
        1
    except Exception as e:
        log.exception(str(e))
