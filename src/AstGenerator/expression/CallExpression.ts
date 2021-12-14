import {
  ENodeType,
  ETokenType,
  ICallExpression,
  IKeyword,
  IStarred,
  TExpressionNode,
  TNotAssignmentExpressionNode
} from '../../types'
import { createLoc, isExpressionNode, isToken } from '../../utils'
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
    const { args, keywords } = this._handleArgsAndKeywords()

    const rightBracket = this.tokens.getToken()
    const CallExpression = this.createNode(ENodeType.CallExpression, {
      callee: lastNode,
      args,
      keywords,
      loc: createLoc(lastNode, rightBracket)
    })

    this.tokens.next()

    return CallExpression
  }

  private _handleArgsAndKeywords(): { args: ICallExpression['args']; keywords: ICallExpression['keywords'] } {
    const state = { enableExpression: true, enableStarred: true }
    const { code, payload } = this.findNodes({
      end: token => isToken(token, ETokenType.bracket, ')'),
      step: () => this._handleCurrentStep(state),
      slice: token => isToken(token, ETokenType.punctuation, ',')
    })

    if (code === 1) {
      throw new SyntaxError("Expected ')'")
    }

    const args: ICallExpression['args'] = []
    const keywords: ICallExpression['keywords'] = []
    for (const node of payload) {
      if (node.type === ENodeType.Keyword) keywords.push(node)
      else args.push(node)
    }

    return { args, keywords }
  }

  private _handleCurrentStep(state: {
    enableExpression: boolean
    enableStarred: boolean
  }): TNotAssignmentExpressionNode | IStarred | IKeyword {
    const currentToken = this.tokens.getToken()
    if (isToken(currentToken, ETokenType.operator, '*')) {
      if (!state.enableStarred) {
        throw new SyntaxError('Iterable argument unpacking follows keyword argument unpacking')
      }

      return this.astGenerator.expression.starred.handle()
    } else if (isToken(currentToken, ETokenType.operator, '**')) {
      state.enableExpression = false
      state.enableStarred = false
      return this.astGenerator.expression.keyword.handle()
    } else if (
      isToken(currentToken, ETokenType.identifier) &&
      isToken(this.tokens.getToken(1), ETokenType.operator, '=')
    ) {
      state.enableExpression = false
      return this.astGenerator.expression.keyword.handle()
    } else {
      if (!state.enableExpression) {
        throw new SyntaxError('Positional argument cannot appear after keyword arguments')
      }

      return this.astGenerator.expression.handleMaybeIf()
    }
  }
}

export default CallExpression
