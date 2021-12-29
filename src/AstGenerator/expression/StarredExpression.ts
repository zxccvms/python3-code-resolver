import { ENodeType, ETokenType, IStarredExpression } from 'src/types'
import { createLoc } from 'src/utils'
import BaseHandler from '../BaseHandler'
import { EEnvironment } from '../types'

/** 解压表达式 *a */
class StarredExpression extends BaseHandler {
  handle(environment: EEnvironment): IStarredExpression {
    // todo
    // if () {
    // 	throw new SyntaxError('Unpack operation not allowed in this context')
    // }

    this.check({ environment, isAfter: true })

    const xToken = this.output(ETokenType.operator, '*')

    const value = this.astGenerator.expression.handleMaybeIf(environment)

    const Starred = this.createNode(ENodeType.StarredExpression, {
      value,
      loc: createLoc(xToken, value)
    })

    return Starred
  }
}

export default StarredExpression
