import { ENodeType, ETokenType, IEmptyStatement } from '../../types'
import { addBaseNodeAttr, createLoc, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'
import { EHandleCode } from '../types'

/** 处理关键字 */
class EmptyStatement extends BaseHandler {
  handle() {
    const EmptyStatement = this.handleEmptyStatement()
    return { code: EHandleCode.single, payload: EmptyStatement }
  }

  handleEmptyStatement(): IEmptyStatement {
    const passToken = this.tokens.getToken()
    if (!isToken(passToken, ETokenType.keyword, 'pass')) {
      throw new TypeError("handlePass err: currentToken is not keyword 'pass'")
    }

    const EmptyStatement = this.createNode(ENodeType.EmptyStatement, {
      loc: createLoc(passToken, passToken)
    })

    this.tokens.next()

    return EmptyStatement
  }
}

export default EmptyStatement
