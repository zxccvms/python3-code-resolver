import { ENodeType, ETokenType, IWhileStatement, TNode } from '../../types'
import { createLoc, createNode } from '../../utils'
import Node from '../utils/Node'
import { EEnvironment } from '../types'

/** while循环语句 */
class WhileStatement extends Node {
  handle(environment: EEnvironment): IWhileStatement {
    this.check({ isAfter: true })
    const whileToken = this.output(ETokenType.keyword, 'while')
    const test = this.astGenerator.expression.handleMaybeIf(environment)
    const body = this.astGenerator.statement.handleBody(environment | EEnvironment.loopBody, whileToken)

    let elseBody: TNode[] = null
    const elseToken = this.eat(ETokenType.keyword, 'else')
    if (elseToken) {
      elseBody = this.astGenerator.statement.handleBody(environment, elseToken)
    }

    const WhileStatement = createNode(ENodeType.WhileStatement, {
      test,
      body,
      elseBody,
      loc: createLoc(whileToken, (elseBody || body).at(-1))
    })

    return WhileStatement
  }
}

export default WhileStatement
