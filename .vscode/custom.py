try:
  if len(sys.argv) > 1:
    if sys.argv[1] == '-p':
        # 启动javahost进程
        subprocess.Popen('dll\ElementSDKV1\II.RPA.JavaHost\II.RPA.JavaBridgeHost.exe')
        # 启动触发器服务器进程
        subprocess.Popen('dll\II.RPA.EventMonitor\II.RPA.EventMonitor.exe')

        log.info('engine启动端口为{0}'.format(sys.argv[2]))
        port = sys.argv[2]
        factory_name = 'Z-Factory.exe' if port == '6444' else 'Z-Bot.exe'
        ws_server.run(port, factory_name)
    elif sys.argv[1] == '-t':
        log.info('engine启动端口为{0}'.format(sys.argv[2]))
        port = sys.argv[2]
        factory_name = 'Z-Factory_trace' if port == '6444' else 'Z-Bot_trace'
        ws_server.run(port,factory_name)
    else:
        try:
            opts, args = getopt.getopt(sys.argv[1:], "hpzd:", ["processFile=", "zparam=", "directRun="])
        except getopt.GetoptError as ex:
            log.error('bootstrap.py --processFile=<processFile>')
            sys.exit(2)
        # for opt, arg in opts:
        #     log.info(opt + ' ' + arg)
        #     if opt == '-h':
        #         log.info(
        #             'y.py -i <inputfile> -o <outputfile>'
        #         )
        #         sys.exit()
        #     elif opt in ("-p", "--processFile"):
        #         processFile = arg
        #         log.info('输入的文件路徑为：' + processFile)
        #     elif opt in ("-d", "--directRun"):
        #         directRunDir = arg
        #         log.info('directRun的文件路徑为：' + directRunDir)

        if not directRunDir:
            pass
        else:
            directRun(directRunDir,args)
            sys.exit()
  else:
      status = get_port_status(port)
      if status:
          os._exit(1)
      ws_server.run(port, factory_name)
except Exception as e:
  log.exception(str(e))