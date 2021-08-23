import { ENodeType, ETokenType, IEmptyStatement } from '../../types'
import { createLoc, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'

/** 处理空语句 */
class EmptyStatement extends BaseHandler {
  handle(): IEmptyStatement {
    const passToken = this.tokens.getToken()
    if (!isToken(passToken, ETokenType.keyword, 'pass')) {
      throw new TypeError("handlePass err: currentToken is not keyword 'pass'")
    }

    const EmptyStatement = this.createNode(ENodeType.EmptyStatement, {
      loc: createLoc(passToken)
    })

    this.tokens.next()

    return EmptyStatement
  }
}

export default EmptyStatement
