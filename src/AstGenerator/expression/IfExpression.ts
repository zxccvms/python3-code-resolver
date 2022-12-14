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
    this.check({
      environment,
      isAfter: true,
      isBefore: true
    })

    const ifToken = this.output(ETokenType.keyword, 'if')
    const test = this.astGenerator.expression.handleMaybeLogical(environment)

    this.check({
      environment,
      isAfter: true,
      isBefore: true
    })

    const elseToken = this.output(ETokenType.keyword, 'else')
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
