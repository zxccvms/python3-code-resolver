import { ENodeType, ETokenType, IRaiseStatement } from '../../types'
import { createLoc, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'
import { EEnvironment } from '../types'

/** raise语句 raise a */
class RaiseStatement extends BaseHandler {
  handle(environment: EEnvironment): IRaiseStatement {
    const raiseToken = this.output(ETokenType.keyword, 'raise')
    const target = this.astGenerator.expression.handleMaybeIf(environment)

    const RaiseStatement = this.createNode(ENodeType.RaiseStatement, {
      target,
      loc: createLoc(raiseToken, target)
    })

    return RaiseStatement
  }
}

export default RaiseStatement
