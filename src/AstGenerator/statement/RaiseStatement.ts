import { ENodeType, ETokenType, IRaiseStatement, TExpressionNode } from '../../types'
import { createLoc, isSameRank, createNode } from '../../utils'
import Node from '../utils/Node'
import { EEnvironment } from '../types'

/** raise语句 raise a */
class RaiseStatement extends Node {
  handle(environment: EEnvironment): IRaiseStatement {
    const raiseToken = this.output(ETokenType.keyword, 'raise')

    let target: TExpressionNode = null
    if (isSameRank([raiseToken, this.tokens.getToken()], 'endAndStartLine')) {
      target = this.astGenerator.expression.handleMaybeIf(environment)
    }

    let cause: TExpressionNode = null
    if (this.eatLine(ETokenType.keyword, 'from')) {
      cause = this.astGenerator.expression.handleMaybeIf(environment)
    }

    const RaiseStatement = createNode(ENodeType.RaiseStatement, {
      target,
      cause,
      loc: createLoc(raiseToken, target)
    })

    return RaiseStatement
  }
}

export default RaiseStatement
