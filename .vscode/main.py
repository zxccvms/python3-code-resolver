import ast
from ast2json import ast2json
import json 

with open('.vscode/code.py') as f:
    code = f.read()
    node = ast.parse(code, mode='exec')
    node_j = ast2json(node)
    print(json.dumps(node_j, indent=4))