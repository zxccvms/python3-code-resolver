import { ENodeType, ETokenType, IArrayComprehensionExpression, IArrayExpression, TExpressionNode } from '../../types'
import { addBaseNodeAttr, createLoc, isNode, isToken, createNode } from '../../utils'
import Node from '../utils/Node'
import { EEnvironment } from '../types'

/** 数组 or 数组解析 表达式 */
class MiddleBracket extends Node {
  handle(environment: EEnvironment): IArrayExpression | IArrayComprehensionExpression {
    const leftBracket = this.output(ETokenType.bracket, '[')
    environment = environment | EEnvironment.bracket

    let Node: IArrayExpression | IArrayComprehensionExpression
    let element: TExpressionNode
    if (!this.isToken(ETokenType.bracket, ']')) {
      element = this._handleElement(environment)

      if (this.astGenerator.expression.comprehension.isConformToken(environment)) {
        this.check({ environment })
        const generators = this.astGenerator.expression.comprehension.handleComprehensions(element, environment)

        Node = createNode(ENodeType.ArrayComprehensionExpression, {
          element,
          generators
        })
      }
    }

    if (!Node) {
      this.check({ environment, isAssignableExpression: true })
      const elements = [element, ...this._handleElements(environment)]

      Node = createNode(ENodeType.ArrayExpression, {
        elements
      })
    }

    const rightBracketToken = this.output(ETokenType.bracket, ']')

    return addBaseNodeAttr(Node, {
      loc: createLoc(leftBracket, rightBracketToken)
    })
  }

  private _handleElements(environment: EEnvironment): TExpressionNode[] {
    const { payload } = this.findNodes({
      end: token => isToken(token, ETokenType.bracket, ']'),
      step: () => this._handleElement(environment),
      isSlice: true
    })

    return payload
  }

  private _handleElement(environment: EEnvironment) {
    const expression = this.astGenerator.expression.handleMaybeIf(environment)
    return this.astGenerator.expression.namedExpression.handleMaybe(expression, environment)
  }
}

export default MiddleBracket
