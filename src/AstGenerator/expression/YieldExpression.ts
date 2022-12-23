import { ENodeType, ETokenType, IYieldExpression, IYieldFromExpression } from '../../types'
import { createLoc, checkBit, isToken, isSameRank, createNode } from '../../utils'
import Node from '../utils/Node'
import { EEnvironment } from '../types'

/** yield表达式 yield a */ // todo 只能当作开头
class YieldExpression extends Node {
  handle(environment: EEnvironment): IYieldExpression | IYieldFromExpression {
    // if (!checkBit(environment, EEnvironment.functionBody | EEnvironment.lambda)) {
    //   throw new SyntaxError('"yield" not allowed outside of a function or lambda')
    // }
    this.check({ environment })

    const yieldToken = this.output(ETokenType.keyword, 'yield')
    let formToken
    let value
    const currentToken = this.tokens.getToken()
    if (
      !isToken(currentToken, ETokenType.bracket, ')') &&
      (isSameRank([yieldToken, currentToken], 'endAndStartLine') || checkBit(environment, EEnvironment.bracket))
    ) {
      formToken = this.eat(ETokenType.keyword, 'from')
      value = this.astGenerator.expression.handleMaybeTuple(environment)
    }
    return createNode(formToken ? ENodeType.YieldFromExpression : ENodeType.YieldExpression, {
      value,
      loc: createLoc(yieldToken, value)
    })
  }
}

export default YieldExpression
