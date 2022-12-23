import { ENodeType, ETokenType, IEmptyStatement } from '../../types'
import { createLoc, createNode } from '../../utils'
import Node from '../utils/Node'

/** 处理空语句 */
class EmptyStatement extends Node {
  handle(): IEmptyStatement {
    const passToken = this.output(ETokenType.keyword, 'pass')

    const EmptyStatement = createNode(ENodeType.EmptyStatement, {
      loc: createLoc(passToken)
    })

    return EmptyStatement
  }
}

export default EmptyStatement
