# python3-code-resolver

## python3 代码解析器

- 目前版本仅支持表达式解析，解析语句时，会放入 tokens 类型的 AST 节点中。

### 功能模块

- CodeScanner: Python3 代码 转 Token 列表
- AstGenerator: Token 列表 转 AST
- AstTraverser: AST 遍历器
- AstToCode: AST 转 Python3 代码

### 启动项目

```
1、yarn
2、更改项目中 .vscode/code.py 文件内容
3、使用 vscode的运行和调试面板选择typescript配置项,对 code.py 文件内容进行解析生成AST
```
