import { ENodeType, ETokenType, IRaiseStatement } from 'src/types'
import { createLoc, isToken } from 'src/utils'
import BaseHandler from '../BaseHandler'
import { EEnvironment } from '../types'

/** raise语句 raise a */
class RaiseStatement extends BaseHandler {
  handle(environment: EEnvironment): IRaiseStatement {
    const raiseToken = this.tokens.getToken()
    this.check({
      checkToken: () => isToken(raiseToken, ETokenType.keyword, 'raise')
    })

    this.tokens.next()
    const target = this.astGenerator.expression.handleMaybeIf(environment)

    const RaiseStatement = this.createNode(ENodeType.RaiseStatement, {
      target,
      loc: createLoc(raiseToken, target)
    })

    return RaiseStatement
  }
}

export default RaiseStatement
