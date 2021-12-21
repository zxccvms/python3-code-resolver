import {
  ENodeType,
  ETokenType,
  ICallExpression,
  IKeyword,
  TExpressionNode,
  TNotAssignmentExpressionNode
} from '../../types'
import { createLoc, isNode, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'
import { EEnvironment } from '../types'

interface IState {
  enableExpression: boolean
  enableStarred: boolean
  enableGeneratorExpression: boolean
}

/** 函数调用表达式 */
class CallExpression extends BaseHandler {
  handle(lastNode: TExpressionNode, environment: EEnvironment): ICallExpression {
    this.check({
      environment,
      isBefore: true,
      isDecorativeExpression: true
    })

    this.output(ETokenType.bracket, '(')

    const { args, keywords } = this.handleArgsAndKeywords(true)

    const rightBracket = this.output(ETokenType.bracket, ')')
    const CallExpression = this.createNode(ENodeType.CallExpression, {
      callee: lastNode,
      args,
      keywords,
      loc: createLoc(lastNode, rightBracket)
    })

    return CallExpression
  }

  handleArgsAndKeywords(
    generatorExpression: boolean,
    state: IState = { enableExpression: true, enableStarred: true, enableGeneratorExpression: true }
  ): {
    args: TNotAssignmentExpressionNode[]
    keywords: IKeyword[]
  } {
    const { payload } = this.findNodes({
      end: token => isToken(token, ETokenType.bracket, ')'),
      step: () => this._handleCurrentStep(generatorExpression, state),
      isSlice: true
    })

    const args: TNotAssignmentExpressionNode[] = []
    const keywords: IKeyword[] = []
    for (const node of payload) {
      if (node.type === ENodeType.Keyword) keywords.push(node)
      else args.push(node)
    }

    return { args, keywords }
  }

  private _handleCurrentStep(generatorExpression: boolean, state: IState): TNotAssignmentExpressionNode | IKeyword {
    let expression

    const currentToken = this.tokens.getToken()
    if (isToken(currentToken, ETokenType.operator, '**')) {
      state.enableExpression = false
      state.enableStarred = false
      expression = this.astGenerator.expression.keyword.handle(EEnvironment.bracket)
    } else {
      expression = this.astGenerator.expression.handleMaybeIf(EEnvironment.bracket)

      const keywordOrOperatorToken = this.tokens.getToken()
      if (generatorExpression && isToken(keywordOrOperatorToken, ETokenType.keyword, 'for')) {
        expression = this.astGenerator.expression.smallBracket.handleGeneratorExpression(expression)

        const rightBracket = this.tokens.getToken()
        if (!state.enableGeneratorExpression || !isToken(rightBracket, ETokenType.bracket, ')')) {
          throw new SyntaxError('Generator expression must be parenthesized')
        }
      } else if (
        isNode(expression, ENodeType.Identifier) &&
        isToken(keywordOrOperatorToken, ETokenType.operator, '=')
      ) {
        state.enableExpression = false
        expression = this.astGenerator.expression.keyword.handle(EEnvironment.bracket, expression)
      }

      const isStarred = isNode(expression, ENodeType.StarredExpression)
      if (!isStarred && !state.enableExpression) {
        throw new SyntaxError('Positional argument cannot appear after keyword arguments')
      } else if (isStarred && !state.enableStarred) {
        throw new SyntaxError('Iterable argument unpacking follows keyword argument unpacking')
      }
    }

    state.enableGeneratorExpression = false
    return expression
  }
}

export default CallExpression
