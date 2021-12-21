import { ENodeType, ETokenType, IKeyword, TNode, TNotAssignmentExpressionNode } from 'src/types'
import { createLoc, isToken } from 'src/utils'
import BaseHandler from '../BaseHandler'
import { EEnvironment } from '../types'

/** 赋值的参数 */
class Keyword extends BaseHandler {
  handle(environment: EEnvironment, lastNode?: TNode<ENodeType.Identifier>): IKeyword {
    const operatorToken = this.output(ETokenType.operator, ['=', '**'])

    let name: string = lastNode?.name || null

    const value = this.astGenerator.expression.handleMaybeIf(environment)

    const Keyword = this.createNode(ENodeType.Keyword, {
      name,
      value,
      loc: createLoc(lastNode || operatorToken, value)
    })

    return Keyword
  }
}

export default Keyword
