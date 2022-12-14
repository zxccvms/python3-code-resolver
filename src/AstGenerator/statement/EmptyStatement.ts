import { ENodeType, ETokenType, IEmptyStatement } from '../../types'
import { createLoc, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'

/** 处理空语句 */
class EmptyStatement extends BaseHandler {
  handle(): IEmptyStatement {
    const passToken = this.output(ETokenType.keyword, 'pass')

    const EmptyStatement = this.createNode(ENodeType.EmptyStatement, {
      loc: createLoc(passToken)
    })

    return EmptyStatement
  }
}

export default EmptyStatement
