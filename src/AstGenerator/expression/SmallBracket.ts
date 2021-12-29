import { ENodeType, ETokenType, IGeneratorExpression, TExpressionNode } from '../../types'
import { createLoc, getPositionInfo, hasParenthesized, addBaseNodeAttr, getLatest } from '../../utils'
import BaseHandler from '../BaseHandler'
import { EEnvironment } from '../types'

class SmallBracket extends BaseHandler {
  handle(environment: EEnvironment): TExpressionNode {
    const leftBracket = this.output(ETokenType.bracket, '(')
    environment = environment | EEnvironment.bracket

    let expression: TExpressionNode
    let rightBracketToken = this.eat(ETokenType.bracket, ')')
    if (rightBracketToken) {
      expression = this.createNode(ENodeType.TupleExpression, {
        elements: [],
        loc: {
          start: getPositionInfo(rightBracketToken, 'start'),
          end: getPositionInfo(rightBracketToken, 'start')
        }
      })
    } else {
      expression = this._handleExpression(environment)

      if (this.astGenerator.expression.comprehension.isConformToken(environment)) {
        expression = this.handleGeneratorExpression(expression, environment)
      } else {
        expression = this.astGenerator.expression.tupleExpression.handleMaybe(expression, environment, environment =>
          this._handleExpression(environment)
        )
      }

      rightBracketToken = this.output(ETokenType.bracket, ')')
    }

    return hasParenthesized(expression)
      ? expression
      : addBaseNodeAttr(expression, {
          extra: {
            parenthesized: true,
            parentLoc: createLoc(leftBracket, rightBracketToken)
          }
        })
  }

  handleGeneratorExpression(element: TExpressionNode, environment: EEnvironment): IGeneratorExpression {
    const generators = this.astGenerator.expression.comprehension.handleComprehensions(element, environment)

    const GeneratorExpression = this.createNode(ENodeType.GeneratorExpression, {
      element,
      generators,
      loc: createLoc(element, getLatest(generators))
    })

    return GeneratorExpression
  }

  private _handleExpression(environment: EEnvironment) {
    let expression = this.astGenerator.expression.handleMaybeIf(environment)
    return this.astGenerator.expression.namedExpression.handleMaybe(expression, environment)
  }
}

export default SmallBracket
