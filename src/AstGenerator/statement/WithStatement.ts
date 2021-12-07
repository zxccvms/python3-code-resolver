import { ENodeType, ETokenType, IWithStatement } from 'src/types'
import { createLoc, isToken } from 'src/utils'
import BaseHandler from '../BaseHandler'

/** with语句 */
class WithStatement extends BaseHandler {
  handle(): IWithStatement {
    const withToken = this.tokens.getToken()
    this.check({
      checkToken: () => isToken(withToken, ETokenType.keyword, 'with')
    })

    this.tokens.next()
    const left = this._handleLeft()

    const asToken = this.tokens.getToken()
    this.check({
      checkToken: () => isToken(asToken, ETokenType.keyword, 'as')
    })

    this.tokens.next()
    const right = this._handleRight()
    const body = this.astGenerator.statement.blockStatement.handle(withToken)

    const WithStatement = this.createNode(ENodeType.WithStatement, {
      left,
      right,
      body,
      loc: createLoc(withToken, body)
    })

    return WithStatement
  }

  private _handleLeft(): IWithStatement['left'] {
    const { payload } = this.findNodes({
      end: token => isToken(token, ETokenType.keyword, 'as'),
      step: () => this.astGenerator.expression.handleMaybeIf(),
      slice: token => isToken(token, ETokenType.punctuation, ',')
    })

    return payload
  }

  private _handleRight(): IWithStatement['right'] {
    const { payload } = this.findNodes({
      end: token => isToken(token, ETokenType.punctuation, ':'),
      step: () => this.astGenerator.expression.handleMaybeIf(), // todo
      slice: token => isToken(token, ETokenType.punctuation, ',')
    })

    return payload
  }
}

export default WithStatement
