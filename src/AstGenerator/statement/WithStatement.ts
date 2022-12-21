import { ENodeType, ETokenType, IWithItem, IWithStatement, TAssignableExpressionNode } from '../../types'
import { createLoc } from '../../utils'
import BaseHandler from '../BaseHandler'
import { EEnvironment } from '../types'

/** with语句 */
class WithStatement extends BaseHandler {
  handle(environment: EEnvironment): IWithStatement {
    const withToken = this.output(ETokenType.keyword, 'with')

    const withItems: IWithItem[] = []
    do {
      const withItem = this._handleWithItem(environment)
      withItems.push(withItem)
    } while (this.eat(ETokenType.punctuation, ','))

    const body = this.astGenerator.statement.blockStatement.handle(withToken, environment)

    const WithStatement = this.createNode(ENodeType.WithStatement, {
      withItems,
      body,
      loc: createLoc(withToken, body)
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

    const withItem = this.createNode(ENodeType.WithItem, {
      expression,
      optionalVars,
      loc: createLoc(expression, optionalVars || expression)
    })

    return withItem
  }
}

export default WithStatement
