import { ENodeType, ETokenType, ISetExpression } from 'src/types'
import { createLoc, isToken } from 'src/utils'
import BaseHandler from '../BaseHandler'
import { ENodeEnvironment } from '../types'

/** set表达式 */
class SetExpression extends BaseHandler {
  handle(): ISetExpression {
    const leftBigBracket = this.tokens.getToken()
    this.check({
      checkToken: () => isToken(leftBigBracket, ETokenType.bracket, '{')
    })

    this.tokens.next()
    const elements = this._handleElements()

    const rightBigBracket = this.tokens.getToken()
    this.check({
      checkToken: () => isToken(rightBigBracket, ETokenType.bracket, '}')
    })

    const SetExpression = this.createNode(ENodeType.SetExpression, {
      elements,
      loc: createLoc(leftBigBracket, rightBigBracket)
    })

    return SetExpression
  }

  private _handleElements(): ISetExpression['elements'] {
    const { payload } = this.findNodes({
      end: token => isToken(token, ETokenType.bracket, '}'),
      step: () => this.astGenerator.expression.handleMaybeIf(ENodeEnvironment.bracket),
      slice: token => isToken(token, ETokenType.punctuation, ',')
    })

    return payload
  }
}

export default SetExpression
