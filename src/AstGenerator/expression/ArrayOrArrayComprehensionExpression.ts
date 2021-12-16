import AstGenerator from '../AstGenerator'
import {
  ENodeType,
  ETokenType,
  IArrayComprehensionExpression,
  IArrayExpression,
  IComprehension,
  TAssignableExpressionNode,
  TNotAssignmentExpressionNode
} from '../../types'
import { createLoc, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'
import { EEnvironment } from '../types'

/** 数组 or 数组解析 表达式 */
class ArrayOrArrayComprehensionExpression extends BaseHandler {
  handle(environment: EEnvironment = EEnvironment.normal): IArrayExpression | IArrayComprehensionExpression {
    const leftBracket = this.tokens.getToken()
    this.check({
      checkToken: () => isToken(leftBracket, ETokenType.bracket, '[')
    })
    this.tokens.next()

    const rightBracketToken = this.tokens.getToken()
    if (isToken(rightBracketToken, ETokenType.bracket, ']')) {
      this.tokens.next()
      const ArrayExpression = this.createNode(ENodeType.ArrayExpression, {
        elements: [],
        loc: createLoc(leftBracket, rightBracketToken)
      })

      return ArrayExpression
    }

    const element = this.astGenerator.expression.handleMaybeIf(EEnvironment.bracket)

    const currentToken = this.tokens.getToken()
    if (isToken(currentToken, ETokenType.keyword, 'for')) {
      this.check({ environment })
      const generators = this._handleGenerators()

      const ArrayComprehension = this.createNode(ENodeType.ArrayComprehensionExpression, {
        element,
        generators,
        loc: createLoc(leftBracket, this.tokens.getToken(-1))
      })

      return ArrayComprehension
    } else {
      this.check({
        environment,
        isAssignableExpression: true
      })
      const elements = [element, ...this._handleElements(environment)]

      const ArrayExpression = this.createNode(ENodeType.ArrayExpression, {
        elements,
        loc: createLoc(leftBracket, this.tokens.getToken(-1))
      })

      return ArrayExpression
    }
  }

  private _handleElements(environment: EEnvironment): TNotAssignmentExpressionNode[] {
    const { code, payload } = this.findNodes({
      end: token => isToken(token, ETokenType.bracket, ']'),
      step: () => this.astGenerator.expression.handleMaybeIf(environment | EEnvironment.bracket),
      slice: token => isToken(token, ETokenType.punctuation, ',')
    })

    if (code === 1) {
      throw new SyntaxError("Expected ']'")
    }

    this.tokens.next()

    return payload
  }

  private _handleGenerators() {
    const comprehensions = this._handleComprehensions()

    if (!isToken(this.tokens.getToken(), ETokenType.bracket, ']')) {
      throw new SyntaxError("Expected ']'")
    }

    this.tokens.next()

    return comprehensions
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

export default ArrayOrArrayComprehensionExpression
