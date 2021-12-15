import { ENodeType, ETokenType, IArrayExpression } from '../../types'
import { createLoc, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'
import { ENodeEnvironment } from '../types'

/** 数组表达式 */
class ArrayExpression extends BaseHandler {
  handle(): IArrayExpression {
    const leftBracket = this.tokens.getToken()

    this.check({
      checkToken: () => isToken(leftBracket, ETokenType.bracket, '[')
    })

    this.tokens.next()
    const elements = this._handleElements()

    const rightBracket = this.tokens.getToken()

    const ArrayExpression = this.createNode(ENodeType.ArrayExpression, {
      elements,
      loc: createLoc(leftBracket, rightBracket)
    })

    this.tokens.next()

    return ArrayExpression
  }

  private _handleElements(): IArrayExpression['elements'] {
    const { code, payload } = this.findNodes({
      end: token => isToken(token, ETokenType.bracket, ']'),
      step: () => this.astGenerator.expression.handleMaybeIf(ENodeEnvironment.bracket),
      slice: token => isToken(token, ETokenType.punctuation, ',')
    })

    if (code === 1) {
      throw new SyntaxError("Expected ']'")
    }

    return payload
  }
}

export default ArrayExpression
