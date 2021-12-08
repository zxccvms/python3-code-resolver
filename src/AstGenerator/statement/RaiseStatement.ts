import { ENodeType, ETokenType, IRaiseStatement } from 'src/types'
import { createLoc, isToken } from 'src/utils'
import BaseHandler from '../BaseHandler'

/** raise语句 raise a*/
class RaiseStatement extends BaseHandler {
  handle(): IRaiseStatement {
    const raiseToken = this.tokens.getToken()
    this.check({
      checkToken: () => isToken(raiseToken, ETokenType.keyword, 'raise')
    })

    this.tokens.next()
    const target = this.astGenerator.expression.handleMaybeIf()

    const RaiseStatement = this.createNode(ENodeType.RaiseStatement, {
      target,
      loc: createLoc(raiseToken, target)
    })

    return RaiseStatement
  }
}

export default RaiseStatement
