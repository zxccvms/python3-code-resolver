import { ENodeType, ETokenType, IStarred } from 'src/types'
import { createLoc, isToken } from 'src/utils'
import BaseHandler from '../BaseHandler'
import { ENodeEnvironment } from '../types'

/** 赋值的参数 */
class Starred extends BaseHandler {
  handle(): IStarred {
    const xToken = this.tokens.getToken()
    this.check({
      checkToken: () => isToken(xToken, ETokenType.operator, '*')
    })

    this.tokens.next()
    const value = this.astGenerator.expression.handleMaybeIf(ENodeEnvironment.bracket)

    const Starred = this.createNode(ENodeType.Starred, {
      value,
      loc: createLoc(xToken, value)
    })

    return Starred
  }
}

export default Starred
