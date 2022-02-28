import { ENodeType, ETokenType, IWithStatement } from 'src/types'
import { createLoc, isToken } from 'src/utils'
import BaseHandler from '../BaseHandler'
import { EEnvironment } from '../types'

/** with语句 */
class WithStatement extends BaseHandler {
  handle(environment: EEnvironment): IWithStatement {
    const withToken = this.output(ETokenType.keyword, 'with')

    const left = this._handleLeft(environment)

    this.output(ETokenType.keyword, 'as')

    const right = this._handleRight(environment)

    const body = this.astGenerator.statement.blockStatement.handle(withToken)

    const WithStatement = this.createNode(ENodeType.WithStatement, {
      left,
      right,
      body,
      loc: createLoc(withToken, body)
    })

    return WithStatement
  }

  private _handleLeft(environment: EEnvironment): IWithStatement['left'] {
    const { payload } = this.findNodes({
      end: token => isToken(token, ETokenType.keyword, 'as'),
      step: () => this.astGenerator.expression.handleMaybeIf(environment),
      isSlice: true
    })

    return payload
  }

  private _handleRight(environment: EEnvironment): IWithStatement['right'] {
    const { payload } = this.findNodes({
      end: token => isToken(token, ETokenType.punctuation, ':'),
      step: () => this.astGenerator.expression.handleMaybeIf(environment), // todo
      isSlice: true
    })

    return payload as any // todo
  }
}

export default WithStatement
