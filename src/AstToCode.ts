import { inject } from 'src/base/common/injector'
import LogService from 'src/platform/log/browser'
import {
  ENodeType,
  ICallExpression,
  IIdentifier,
  IMemberExpression,
  INumberLiteral,
  IProgram,
  IStringLiteral,
  TNode
} from './types.d'

class AstToCode {
  @inject() logService!: LogService
  log = this.logService.tag('AstToCode')

  generate(node: TNode) {
    try {
      const type = node.type
      return this[type]?.(node) ?? node.value // todo 部分token未转成node
    } catch (e) {
      this.log.error('generate err: ', e)
      return ''
    }
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

  private [ENodeType.MemberExpression](node: IMemberExpression) {
    const objectCode = this.generate(node.object)
    const propertyCode = this.generate(node.property)

    return objectCode + '.' + propertyCode
  }

  private [ENodeType.CallExpression](node: ICallExpression) {
    const calleeCode = this.generate(node.callee)

    let paramsCode = ''
    for (const param of node.params) {
      paramsCode += this.generate(param)
    }

    return calleeCode + '(' + paramsCode + ')'
  }

  private [ENodeType.Program](node: IProgram) {
    let code = ''
    for (const item of node.body) {
      code += this.generate(item)
    }

    return code
  }
}

export default AstToCode
