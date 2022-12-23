import { ENodeType, ETokenType } from '../../types'
import { createLoc, createNode } from '../../utils'
import Node from '../utils/Node'
import { EEnvironment } from '../types'

/** Await表达式 */
class AwaitExpression extends Node {
  handle(environment: EEnvironment) {
    // todo asyncFunction环境校验
    this.check({ environment, isAfter: true })

    const awaitToken = this.output(ETokenType.keyword, 'await')

    const value = this.astGenerator.expression.handleMaybeTuple(environment)

    const AwaitExpression = createNode(ENodeType.AwaitExpression, {
      value,
      loc: createLoc(awaitToken, value)
    })

    return AwaitExpression
  }
}

export default AwaitExpression
