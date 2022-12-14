import { ENodeType, ETokenType } from '../../types'
import { createLoc } from '../../utils'
import BaseHandler from '../BaseHandler'
import { EEnvironment } from '../types'

/** Await表达式 */
class AwaitExpression extends BaseHandler {
  handle(environment: EEnvironment) {
    // todo asyncFunction环境校验
    this.check({ environment, isAfter: true })

    const awaitToken = this.output(ETokenType.keyword, 'await')

    const value = this.astGenerator.expression.handleMaybeTuple(environment)

    const AwaitExpression = this.createNode(ENodeType.AwaitExpression, {
      value,
      loc: createLoc(awaitToken, value)
    })

    return AwaitExpression
  }
}

export default AwaitExpression
