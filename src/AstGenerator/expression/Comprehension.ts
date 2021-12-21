import {
  ENodeType,
  ETokenType,
  IComprehension,
  TAssignableExpressionNode,
  TExpressionNode,
  TNotAssignmentExpressionNode
} from 'src/types'
import { isToken, createLoc, isNode } from 'src/utils'
import AstGenerator from '../AstGenerator'
import BaseHandler from '../BaseHandler'
import { EEnvironment } from '../types'

interface IHandleComprehensionsParams {
  lastNode?: TExpressionNode
  comprehensionStack?: IComprehension[]
  rightBracket: ')' | ']' | '}'
}

/** 解析表达式 */
class Comprehension extends BaseHandler {
  handleComprehensions(lastNode: TExpressionNode): IComprehension[] {
    if (lastNode && isNode(lastNode, ENodeType.StarredExpression)) {
      throw new SyntaxError('iterable unpacking cannot be used in comprehension')
    }

    return this._handleComprehensions()
  }

  private _handleComprehensions(comprehensionStack: IComprehension[] = []): IComprehension[] {
    const forToken = this.tokens.getToken()
    if (!isToken(forToken, ETokenType.keyword, 'for')) return comprehensionStack

    this.tokens.next()
    const { code, payload: tokens } = this.findTokens(token => isToken(token, ETokenType.keyword, 'in'))
    if (code === 1) throw new SyntaxError("Expected 'in'")

    const astGenerator = new AstGenerator(tokens)
    const target = astGenerator.expression.handleMaybeTuple(
      EEnvironment.bracket | EEnvironment.assign
    ) as TAssignableExpressionNode

    const inToken = this.tokens.getToken()
    this.check({
      checkToken: () => isToken(inToken, ETokenType.keyword, 'in')
    })

    this.tokens.next()
    const iterable = this.astGenerator.expression.handleMaybeLogical(EEnvironment.bracket)

    const ifs = this._handleMaybeIfs()

    const Comprehension = this.createNode(ENodeType.Comprehension, {
      target,
      iterable,
      ifs,
      loc: createLoc(forToken, iterable)
    })
    comprehensionStack.push(Comprehension)

    return this._handleComprehensions(comprehensionStack)
  }

  private _handleMaybeIfs(nodeStack: TNotAssignmentExpressionNode[] = []): TNotAssignmentExpressionNode[] {
    const ifToken = this.tokens.getToken()
    if (!isToken(ifToken, ETokenType.keyword, 'if')) return nodeStack

    this.tokens.next()
    const expression = this.astGenerator.expression.handleMaybeLogical(EEnvironment.bracket)
    nodeStack.push(expression)

    return this._handleMaybeIfs(nodeStack)
  }
}

export default Comprehension
