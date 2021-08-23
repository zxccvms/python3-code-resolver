import { PYTHON } from './const'
import {
  ENodeType,
  IArrayExpression,
  IAssignmentExpression,
  IAssignmentParam,
  IBinaryExpression,
  IBlockStatement,
  IBooleanLiteral,
  ICallExpression,
  IClassDeclaration,
  IDictionaryExpression,
  IDictionaryProperty,
  IEmptyStatement,
  IExceptHandler,
  IFunctionDeclaration,
  IIdentifier,
  IIfExpression,
  IIfStatement,
  IImportStatement,
  IMemberExpression,
  INumberLiteral,
  IProgram,
  ISliceExpression,
  IStringLiteral,
  ITryStatement,
  ITupleExpression,
  IUnaryExpression,
  IVariableDeclaration,
  TNode
} from './types'

class AstToCode {
  generate(node: TNode): string {
    try {
      const type = node.type as any
      return this[type]?.(node)
    } catch (e) {
      console.error('AstToCode generate err: ', e)
      return ''
    }
  }

  // 特殊节点
  private [ENodeType.DictionaryProperty](node: IDictionaryProperty) {
    return PYTHON.INDENT + this.generate(node.key) + ': ' + this.generate(node.value)
  }
  private [ENodeType.AssignmentParam](node: IAssignmentParam) {
    return this.generate(node.name) + ' = ' + this.generate(node.value)
  }
  private [ENodeType.ExceptHandler](node: IExceptHandler) {
    return 'Except ' + this.generate(node.name) + ' as ' + this.generate(node.errName) + ':'
  }

  private [ENodeType.NumberLiteral](node: INumberLiteral) {
    return node.raw
  }

  private [ENodeType.StringLiteral](node: IStringLiteral) {
    return node.raw
  }

  private [ENodeType.Identifier](node: IIdentifier) {
    return node.name
  }

  //表达式
  private [ENodeType.NoneLiteral]() {
    return 'None'
  }
  private [ENodeType.BooleanLiteral](node: IBooleanLiteral) {
    return node.value ? 'True' : 'False'
  }
  private [ENodeType.UnaryExpression](node: IUnaryExpression) {
    return node.operator + this.generate(node.argument)
  }
  private [ENodeType.IfExpression](node: IIfExpression) {
    return `${this.generate(node.body)} if ${this.generate(node.test)} else ${this.generate(node.alternate)}`
  }
  private [ENodeType.TupleExpression](node: ITupleExpression) {
    const codes = node.elements.map(element => this.generate(element))
    return codes.join(', ')
  }
  private [ENodeType.ArrayExpression](node: IArrayExpression) {
    const codes = node.elements.map(element => this.generate(element))
    return `[${codes.join(', ')}]`
  }
  private [ENodeType.DictionaryExpression](node: IDictionaryExpression) {
    const codes = node.properties.map(property => this.generate(property))
    return `{${PYTHON.LINE_BREAK}${codes.join(`,${PYTHON.LINE_BREAK}`)}${PYTHON.LINE_BREAK}}`
  }
  private [ENodeType.BinaryExpression](node: IBinaryExpression) {
    return `${this.generate(node.left)} ${node.operator} ${this.generate(node.right)}`
  }
  private [ENodeType.VariableDeclaration](node: IVariableDeclaration) {
    const codes = node.declarations.map(declaration => this.generate(declaration))

    return `${node.kind} ${codes.join(', ')}`
  }
  private [ENodeType.AssignmentExpression](node: IAssignmentExpression) {
    const codes = node.targets.map(target => this.generate(target))

    return `${codes.join(', ')} = ${this.generate(node.value)}`
  }
  private [ENodeType.SliceExpression](node: ISliceExpression) {}

  private [ENodeType.MemberExpression](node: IMemberExpression) {
    const objectCode = this.generate(node.object)
    const propertyCode = this.generate(node.property)

    return objectCode + '.' + propertyCode
  }

  private [ENodeType.CallExpression](node: ICallExpression) {
    const calleeCode = this.generate(node.callee)

    const paramCodes = node.params.map(param => this.generate(param))
    const keywordCodes = node.keywords.map(keyword => this.generate(keyword))

    const paramsCode = [...paramCodes, ...keywordCodes].join(', ')

    return calleeCode + '(' + paramsCode + ')'
  }

  // 语句
  private [ENodeType.ImportStatement](node: IImportStatement) {}
  private [ENodeType.FunctionDeclaration](node: IFunctionDeclaration) {}
  private [ENodeType.ClassDeclaration](node: IClassDeclaration) {}
  private [ENodeType.BlockStatement](node: IBlockStatement) {}
  private [ENodeType.EmptyStatement](node: IEmptyStatement) {}
  private [ENodeType.IfStatement](node: IIfStatement) {}
  private [ENodeType.TryStatement](node: ITryStatement) {}

  private [ENodeType.Program](node: IProgram) {
    let code = ''
    for (const item of node.body) {
      code += this.generate(item)
    }

    return code
  }
}

export default AstToCode
