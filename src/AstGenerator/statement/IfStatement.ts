import { ENodeType, ETokenType, IIfStatement } from '../../types'
import { createLoc, createNode } from '../../utils'
import Node from '../utils/Node'
import { EEnvironment } from '../types'

/** if语句 */
class IfStatement extends Node {
  handle(environment: EEnvironment, keyword: 'if' | 'elif' = 'if'): IIfStatement {
    const currentToken = this.output(ETokenType.keyword, keyword)
    const test = this.astGenerator.expression.handleMaybeIf(environment)
    const body = this.astGenerator.statement.handleBody(environment, currentToken)
    const orelse = this._handleOrelse(environment)

    const IfStatement = createNode(ENodeType.IfStatement, {
      test,
      body,
      orelse,
      loc: createLoc(currentToken, (orelse || body).at(-1))
    })

    return IfStatement
  }

  private _handleOrelse(environment: EEnvironment): IIfStatement['orelse'] {
    const elseToken = this.eat(ETokenType.keyword, 'else')
    if (elseToken) {
      return this.astGenerator.statement.handleBody(environment, elseToken)
    } else if (this.isToken(ETokenType.keyword, 'elif')) {
      return [this.handle(environment, 'elif')]
    } else {
      return null
    }
  }
}

export default IfStatement
