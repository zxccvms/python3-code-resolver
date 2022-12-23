import { ENodeType, ETokenType, IKeyword, TNode } from '../../types'
import { createLoc, isToken, createNode } from '../../utils'
import Node from '../utils/Node'
import { EEnvironment } from '../types'

/** 赋值的参数 */
class Keyword extends Node {
  handle(environment: EEnvironment, lastNode?: TNode<ENodeType.Identifier>): IKeyword {
    const operatorToken = this.output(ETokenType.operator, ['=', '**'])

    let name: string = lastNode?.name || null

    const value = this.astGenerator.expression.handleMaybeIf(environment)

    const Keyword = createNode(ENodeType.Keyword, {
      name,
      value,
      loc: createLoc(lastNode || operatorToken, value)
    })

    return Keyword
  }
}

export default Keyword
