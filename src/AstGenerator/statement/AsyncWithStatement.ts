import { ENodeType, ETokenType, IAsyncWithStatement, IWithItem, TAssignableExpressionNode } from '../../types'
import { createLoc, createNode } from '../../utils'
import Node from '../utils/Node'
import { EEnvironment } from '../types'

/** async with语句 */
class AsyncWithStatement extends Node {
  handle(environment: EEnvironment): IAsyncWithStatement {
    const asyncToken = this.output(ETokenType.keyword, 'async')
    this.outputLine(ETokenType.keyword, 'with')

    const withItems: IWithItem[] = []
    do {
      const withItem = this._handleWithItem(environment)
      withItems.push(withItem)
    } while (this.eatLine(ETokenType.punctuation, ','))

    const body = this.astGenerator.statement.handleBody(environment, asyncToken)

    const AsyncWithStatement = createNode(ENodeType.AsyncWithStatement, {
      withItems,
      body,
      loc: createLoc(asyncToken, body.at(-1))
    })

    return AsyncWithStatement
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

export default AsyncWithStatement
