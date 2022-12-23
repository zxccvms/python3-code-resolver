import { ENodeType, ETokenType, IWithItem, IWithStatement, TAssignableExpressionNode } from '../../types'
import { createLoc, createNode } from '../../utils'
import Node from '../utils/Node'
import { EEnvironment } from '../types'

/** with语句 */
class WithStatement extends Node {
  handle(environment: EEnvironment): IWithStatement {
    const withToken = this.output(ETokenType.keyword, 'with')

    const withItems: IWithItem[] = []
    do {
      const withItem = this._handleWithItem(environment)
      withItems.push(withItem)
    } while (this.eatLine(ETokenType.punctuation, ','))

    const body = this.astGenerator.statement.handleBody(environment, withToken)

    const WithStatement = createNode(ENodeType.WithStatement, {
      withItems,
      body,
      loc: createLoc(withToken, body.at(-1))
    })

    return WithStatement
  }

  private _handleWithItem(environment: EEnvironment): IWithItem {
    const expression = this.astGenerator.expression.handleMaybeIf(environment)

    let optionalVars: TAssignableExpressionNode = null
    if (this.eat(ETokenType.keyword, 'as')) {
      optionalVars = this.astGenerator.expression.handleMaybeTuple(
        environment | EEnvironment.assign
      ) as TAssignableExpressionNode
    }

    const withItem = createNode(ENodeType.WithItem, {
      expression,
      optionalVars,
      loc: createLoc(expression, optionalVars || expression)
    })

    return withItem
  }
}

export default WithStatement
