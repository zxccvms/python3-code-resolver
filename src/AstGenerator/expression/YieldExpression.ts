import { ENodeType, ETokenType, IYieldExpression } from 'src/types'
import { createLoc, checkBit, isToken } from 'src/utils'
import BaseHandler from '../BaseHandler'
import { EEnvironment } from '../types'

/** yield表达式 yield a */ // todo 只能当作开头
class YieldExpression extends BaseHandler {
  handle(environment: EEnvironment): IYieldExpression {
    // if (!checkBit(environment, EEnvironment.functionBody | EEnvironment.lambda)) {
    //   throw new SyntaxError('"yield" not allowed outside of a function or lambda')
    // }

    const yieldToken = this.tokens.getToken()
    this.check({
      checkToken: () => isToken(yieldToken, ETokenType.keyword, 'yield'),
      environment,
      isAfter: true
    })

    this.tokens.next()
    const value = this.astGenerator.expression.handleMaybeTuple()

    const YieldExpression = this.createNode(ENodeType.YieldExpression, {
      value,
      loc: createLoc(yieldToken, value)
    })

    return YieldExpression
  }
}

export default YieldExpression
