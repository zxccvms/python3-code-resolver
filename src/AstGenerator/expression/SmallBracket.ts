import { ENodeType, ETokenType, IGeneratorExpression, TExpressionNode, TNotAssignmentExpressionNode } from '../../types'
import { createLoc, getPositionInfo, isToken, hasParenthesized, addBaseNodeAttr, getLatest } from '../../utils'
import BaseHandler from '../BaseHandler'
import { EEnvironment } from '../types'

class SmallBracket extends BaseHandler {
  handle(environment: EEnvironment): TNotAssignmentExpressionNode {
    const leftBracket = this.output(ETokenType.bracket, '(')

    let expression: TExpressionNode
    let rightBracketToken = this.tokens.getToken()
    if (isToken(rightBracketToken, ETokenType.bracket, ')')) {
      expression = this.createNode(ENodeType.TupleExpression, {
        elements: [],
        loc: {
          start: getPositionInfo(rightBracketToken, 'start'),
          end: getPositionInfo(rightBracketToken, 'start')
        }
      })
    } else {
      const handleEnvironment = environment | EEnvironment.bracket

      expression = this.astGenerator.expression.handleMaybeTuple(handleEnvironment)

      const currentToken = this.tokens.getToken()
      if (isToken(currentToken, ETokenType.keyword, 'for')) {
        expression = this.handleGeneratorExpression(expression)
      }

      rightBracketToken = this.tokens.getToken()
      if (!isToken(rightBracketToken, ETokenType.bracket, ')')) {
        throw new SyntaxError("Expected ')'")
      }
    }

    this.tokens.next()

    return hasParenthesized(expression)
      ? expression
      : addBaseNodeAttr(expression, {
          extra: {
            parenthesized: true,
            parentLoc: createLoc(leftBracket, rightBracketToken)
          }
        })
  }

  handleGeneratorExpression(element: TExpressionNode): IGeneratorExpression {
    const generators = this.astGenerator.expression.comprehension.handleComprehensions(element)

    const GeneratorExpression = this.createNode(ENodeType.GeneratorExpression, {
      element,
      generators,
      loc: createLoc(element, getLatest(generators))
    })

    return GeneratorExpression
  }
}

export default SmallBracket
