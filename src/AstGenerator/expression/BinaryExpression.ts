import { ENodeType, ETokenType, IBinaryExpression, TExpressionNode, TToken } from '../../types'
import { createLoc, isExpressionNode, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'
import { EEnvironment } from '../types'

/** 二进制表达式 */
class BinaryExpression extends BaseHandler {
  handleMaybe(lastNode: TExpressionNode, environment: EEnvironment): TExpressionNode {
    const currentToken = this.tokens.getToken()
    if (this._isConformToken(currentToken) && this.isContinue(environment)) {
      const binaryExpression = this.handle(lastNode, environment)
      return this.handleMaybe(binaryExpression, environment)
    }

    return lastNode
  }

  handle(lastNode: TExpressionNode, environment: EEnvironment): IBinaryExpression {
    const currentToken = this.tokens.getToken()
    this.check({
      checkToken: () => this._isConformToken(currentToken),
      extraCheck: () => isExpressionNode(lastNode),
      environment,
      isBefore: true,
      isAfter: true
    })

    this.tokens.next()
    const rightNode = this.astGenerator.expression.handleMaybeMemberOrSubscriptOrCall()

    const BinaryExpression = this.createNode(ENodeType.BinaryExpression, {
      operator: currentToken.value as
        | '+'
        | '-'
        | '*'
        | '/'
        | '%'
        | '//'
        | '**'
        | '=='
        | '!='
        | '>='
        | '<='
        | '<'
        | '>'
        | '|'
        | '&',
      left: lastNode,
      right: rightNode,
      loc: createLoc(lastNode, rightNode)
    })

    return BinaryExpression
  }

  private _isConformToken(token: TToken) {
    return isToken(token, ETokenType.operator, [
      '+',
      '-',
      '*',
      '/',
      '%',
      '//',
      '**',
      '==',
      '!=',
      '>=',
      '<=',
      '<',
      '>',
      '|',
      '&'
    ])
  }
}

export default BinaryExpression
