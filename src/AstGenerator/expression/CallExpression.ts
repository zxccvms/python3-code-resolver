import { ENodeType, ETokenType, ICallExpression, IKeyword, TExpressionNode } from '../../types'
import { createLoc, isNode, isToken, createNode } from '../../utils'
import Node from '../utils/Node'
import { EEnvironment } from '../types'

interface IState {
  enableExpression?: boolean
  enableStarred?: boolean
  enableGeneratorExpression?: boolean
}

/** 函数调用表达式 */
class CallExpression extends Node {
  handle(lastNode: TExpressionNode, environment: EEnvironment): ICallExpression {
    this.check({
      environment,
      isBefore: true,
      isDecorativeExpression: true
    })

    this.output(ETokenType.bracket, '(')

    const { args, keywords } = this.handleArgsAndKeywords(EEnvironment.bracket)

    const rightBracket = this.output(ETokenType.bracket, ')')

    const CallExpression = createNode(ENodeType.CallExpression, {
      callee: lastNode,
      args,
      keywords,
      loc: createLoc(lastNode, rightBracket)
    })

    return CallExpression
  }

  handleArgsAndKeywords(
    environment: EEnvironment,
    { enableExpression = true, enableStarred = true, enableGeneratorExpression = true }: IState = {}
  ): {
    args: TExpressionNode[]
    keywords: IKeyword[]
  } {
    const state = { enableExpression, enableStarred, enableGeneratorExpression }
    const { payload } = this.findNodes({
      end: token => isToken(token, ETokenType.bracket, ')'),
      step: () => this._handleCurrentStep(environment, state),
      isSlice: true
    })

    const args: TExpressionNode[] = []
    const keywords: IKeyword[] = []
    for (const node of payload) {
      if (node.type === ENodeType.Keyword) keywords.push(node)
      else args.push(node)
    }

    return { args, keywords }
  }

  private _handleCurrentStep(environment: EEnvironment, state: IState): TExpressionNode | IKeyword {
    let expression
    // Keyword
    if (this.isToken(ETokenType.operator, '**')) {
      state.enableExpression = false
      state.enableStarred = false
      expression = this.astGenerator.expression.keyword.handle(environment)
    } else {
      expression = this._handleExpression(environment)
      // StarredExpression
      if (isNode(expression, ENodeType.StarredExpression)) {
        if (!state.enableStarred) {
          throw new SyntaxError('Iterable argument unpacking follows keyword argument unpacking')
        }
      }
      // GeneratorExpression
      else if (this.astGenerator.expression.comprehension.isConformToken(environment)) {
        expression = this.astGenerator.expression.smallBracket.handleGeneratorExpression(expression, environment)

        if (!state.enableGeneratorExpression || !this.isToken(ETokenType.bracket, ')')) {
          throw new SyntaxError('Generator expression must be parenthesized')
        }
      }
      // Keyword
      else if (this.isToken(ETokenType.operator, '=') && isNode(expression, ENodeType.Identifier)) {
        state.enableExpression = false
        expression = this.astGenerator.expression.keyword.handle(environment, expression)
      }
      // 普通表达式
      else if (!state.enableExpression) {
        throw new SyntaxError('Positional argument cannot appear after keyword arguments')
      }
    }

    state.enableGeneratorExpression = false
    return expression
  }

  private _handleExpression(environment: EEnvironment) {
    const expression = this.astGenerator.expression.handleMaybeIf(environment)
    return this.astGenerator.expression.namedExpression.handleMaybe(expression, environment)
  }
}

export default CallExpression
