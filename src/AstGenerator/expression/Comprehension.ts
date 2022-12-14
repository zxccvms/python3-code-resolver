import { ENodeType, ETokenType, IComprehension, TAssignableExpressionNode, TExpressionNode } from '../../types'
import { isToken, createLoc, isNode } from '../../utils'
import AstGenerator from '../AstGenerator'
import BaseHandler from '../BaseHandler'
import { EEnvironment } from '../types'

/** 解析表达式 */
class Comprehension extends BaseHandler {
  handleComprehensions(lastNode: TExpressionNode, environment: EEnvironment): IComprehension[] {
    if (isNode(lastNode, ENodeType.StarredExpression)) {
      throw new SyntaxError('iterable unpacking cannot be used in comprehension')
    }

    return this._handleComprehensions(environment)
  }

  private _handleComprehensions(
    environment: EEnvironment,
    comprehensionStack: IComprehension[] = []
  ): IComprehension[] {
    const startToken = this.tokens.getToken()
    if (!this.isConformToken(environment)) return comprehensionStack
    const isAsync = startToken.value === 'async'

    this.tokens.next(isAsync ? 2 : 1)
    const target = this._handleTarget(environment)

    this.output(ETokenType.keyword, 'in')

    const iterable = this.astGenerator.expression.handleMaybeLogical(environment)

    const ifs = this._handleMaybeIfs(environment)

    const Comprehension = this.createNode(ENodeType.Comprehension, {
      isAsync,
      target,
      iterable,
      ifs,
      loc: createLoc(startToken, iterable)
    })
    comprehensionStack.push(Comprehension)

    return this._handleComprehensions(environment, comprehensionStack)
  }

  private _handleTarget(environment: EEnvironment): TAssignableExpressionNode {
    const { payload: tokens } = this.findTokens(token => isToken(token, ETokenType.keyword, 'in'))

    const astGenerator = new AstGenerator(tokens)
    const target = astGenerator.expression.handleMaybeTuple(environment)

    if (!this.astGenerator.expression.assignmentExpression.isConformNode(target)) {
      throw new TypeError('Expression cannot be assignment target')
    }

    return target
  }

  private _handleMaybeIfs(environment: EEnvironment, nodeStack: TExpressionNode[] = []): TExpressionNode[] {
    const ifToken = this.tokens.getToken()
    if (!isToken(ifToken, ETokenType.keyword, 'if')) return nodeStack

    this.tokens.next()
    const expression = this.astGenerator.expression.handleMaybeLogical(environment)
    nodeStack.push(expression)

    return this._handleMaybeIfs(environment, nodeStack)
  }

  isConformToken(environment: EEnvironment) {
    if (this.isToken(ETokenType.keyword, 'for')) return true
    else if (!this.isTokens([ETokenType.keyword, 'async'], [ETokenType.keyword, 'for'])) return false
    else if (!this.isContinue(environment, 'after')) return false

    return true
  }
}

export default Comprehension
