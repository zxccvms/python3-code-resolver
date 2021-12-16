import { ENodeType, ETokenType, IFunctionDeclaration, TDecorativeExpressionNode } from '../../types'
import { createLoc, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'
import { EEnvironment } from '../types'

/** 处理函数定义节点 */
class FunctionDeclaration extends BaseHandler {
  /** 处理函数定义节点 */
  handle(environment: EEnvironment, decorators?: TDecorativeExpressionNode[]): IFunctionDeclaration {
    const defToken = this.tokens.getToken()
    this.check({
      checkToken: () => isToken(defToken, ETokenType.keyword, 'def'),
      isAfter: true
    })

    this.tokens.next()
    const identifier = this.astGenerator.expression.identifier.handle()

    const leftBracketToken = this.tokens.getToken()
    this.check({
      checkToken: () => isToken(leftBracketToken, ETokenType.bracket, '(')
    })

    this.tokens.next()
    const args = this.astGenerator.expression.arguments.handle(token => isToken(token, ETokenType.bracket, ')'))

    this.tokens.next()
    const body = this.astGenerator.statement.blockStatement.handle(defToken, environment | EEnvironment.functionBody)

    const FunctionDeclaration = this.createNode(ENodeType.FunctionDeclaration, {
      name: identifier.name,
      args,
      body,
      decorators,
      loc: createLoc(decorators?.[0] || defToken, body)
    })

    return FunctionDeclaration
  }
}

export default FunctionDeclaration
