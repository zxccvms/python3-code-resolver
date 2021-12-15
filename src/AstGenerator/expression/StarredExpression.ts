import { ENodeType, ETokenType, IStarredExpression } from 'src/types'
import { createLoc, isToken } from 'src/utils'
import BaseHandler from '../BaseHandler'
import { ENodeEnvironment } from '../types'

/** 解压表达式 */
class StarredExpression extends BaseHandler {
  handle(environment: ENodeEnvironment): IStarredExpression {
    // todo
    // if () {
    // 	throw new SyntaxError('Unpack operation not allowed in this context')
    // }

    const xToken = this.tokens.getToken()
    this.check({
      checkToken: () => isToken(xToken, ETokenType.operator, '*'),
      environment,
      isAfter: true
    })

    this.tokens.next()
    const value = this.astGenerator.expression.handleMaybeIf(ENodeEnvironment.bracket)

    const Starred = this.createNode(ENodeType.StarredExpression, {
      value,
      loc: createLoc(xToken, value)
    })

    return Starred
  }
}

export default StarredExpression
