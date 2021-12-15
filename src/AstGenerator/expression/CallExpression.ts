import {
  ENodeType,
  ETokenType,
  ICallExpression,
  IKeyword,
  TExpressionNode,
  TNotAssignmentExpressionNode
} from '../../types'
import { createLoc, isExpressionNode, isNode, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'
import { ENodeEnvironment } from '../types'

/** 函数调用表达式 */
class CallExpression extends BaseHandler {
  handle(lastNode: TExpressionNode, environment: ENodeEnvironment): ICallExpression {
    const leftBracket = this.tokens.getToken()

    this.check({
      checkToken: () => isToken(leftBracket, ETokenType.bracket, '('),
      extraCheck: () => isExpressionNode(lastNode),
      environment,
      isBefore: true
    })

    this.tokens.next()
    const { args, keywords } = this.handleArgsAndKeywords()

    const rightBracket = this.tokens.getToken(-1)
    const CallExpression = this.createNode(ENodeType.CallExpression, {
      callee: lastNode,
      args,
      keywords,
      loc: createLoc(lastNode, rightBracket)
    })

    return CallExpression
  }

  handleArgsAndKeywords(): { args: TNotAssignmentExpressionNode[]; keywords: IKeyword[] } {
    const state = { enableExpression: true, enableStarred: true }
    const { code, payload } = this.findNodes({
      end: token => isToken(token, ETokenType.bracket, ')'),
      step: () => this._handleCurrentStep(state),
      slice: token => isToken(token, ETokenType.punctuation, ',')
    })

    if (code === 1) {
      throw new SyntaxError("Expected ')'")
    }

    this.tokens.next()

    const args: TNotAssignmentExpressionNode[] = []
    const keywords: IKeyword[] = []
    for (const node of payload) {
      if (node.type === ENodeType.Keyword) keywords.push(node)
      else args.push(node)
    }

    return { args, keywords }
  }

  private _handleCurrentStep(state: {
    enableExpression: boolean
    enableStarred: boolean
  }): TNotAssignmentExpressionNode | IKeyword {
    const currentToken = this.tokens.getToken()
    if (isToken(currentToken, ETokenType.operator, '**')) {
      state.enableExpression = false
      state.enableStarred = false
      return this.astGenerator.expression.keyword.handle(ENodeEnvironment.bracket)
    } else if (
      isToken(currentToken, ETokenType.identifier) &&
      isToken(this.tokens.getToken(1), ETokenType.operator, '=')
    ) {
      state.enableExpression = false
      return this.astGenerator.expression.keyword.handle(ENodeEnvironment.bracket)
    } else {
      if (!state.enableExpression) {
        throw new SyntaxError('Positional argument cannot appear after keyword arguments')
      }

      const expression = this.astGenerator.expression.handleMaybeIf(ENodeEnvironment.bracket)

      if (!state.enableStarred && isNode(expression, ENodeType.StarredExpression)) {
        throw new SyntaxError('Iterable argument unpacking follows keyword argument unpacking')
      }

      return expression
    }
  }
}

export default CallExpression
