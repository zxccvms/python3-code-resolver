import { ENodeType, ETokenType, IIfExpression, TExpressionNode } from '../../types'
import { createLoc, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'
import { EEnvironment } from '../types'

/** if表达式
 * 'Z-Factory.exe' if port == '6444' else 'Z-Bot.exe'
 */
class IfExpression extends BaseHandler {
  handleMaybe(lastNode: TExpressionNode, environment: EEnvironment) {
    const currentToken = this.tokens.getToken()
    if (isToken(currentToken, ETokenType.keyword, 'if') && this.isContinue(environment)) {
      return this.handle(lastNode, environment)
    }

    return lastNode
  }

  handle(lastNode: TExpressionNode, environment: EEnvironment): IIfExpression {
    const ifToken = this.tokens.getToken()
    this.check({
      checkToken: () => isToken(ifToken, ETokenType.keyword, 'if'),
      environment,
      isAfter: true,
      isBefore: true
    })

    this.tokens.next()
    const test = this.astGenerator.expression.handleMaybeLogical(environment)

    const elseToken = this.tokens.getToken()
    this.check({
      checkToken: () => isToken(elseToken, ETokenType.keyword, 'else'),
      environment,
      isAfter: true,
      isBefore: true
    })

    this.tokens.next()
    const alternate = this.astGenerator.expression.handleMaybeIf(environment)

    const IfExpression = this.createNode(ENodeType.IfExpression, {
      test,
      body: lastNode,
      alternate,
      loc: createLoc(lastNode, alternate)
    })

    return IfExpression
  }
}

export default IfExpression
