import AstGenerator from 'src/AstGenerator/AstGenerator'
import { ETokenType, TBasicExpressionNode, TExpressionNode } from 'src/types'
import { addBaseNodeAttr, getPositionInfo, getTokenExtra, hasParenthesized, isToken } from 'src/utils'
import BaseHandler from '../BaseHandler'
import { ENodeEnvironment } from '../types'

import ArrayExpression from './ArrayExpression'
import AssignmentExpression from './AssignmentExpression'
import BinaryExpression from './BinaryExpression'
import BooleanLiteral from './BooleanLiteral'
import CallExpression from './CallExpression'
import CompareExpression from './CompareExpression'
import DictionaryExpression from './DictionaryExpression'
import Identifier from './Identifier'
import IfExpression from './IfExpression'
import MemberExpression from './MemberExpression'
import NoneLiteral from './NoneLiteral'
import NumberLiteral from './NumberLiteral'
import StringLiteral from './StringLiteral'
import TemplateLiteral from './TemplateLiteral'
import TupleExpression from './TupleExpression'
import UnaryExpression from './UnaryExpression'
import SubscriptExpression from './SubscriptExpression'
import LogicalExpression from './LogicalExpression'

class Expression extends BaseHandler {
  // 基础表达式
  noneLiteral: NoneLiteral
  booleanLiteral: BooleanLiteral
  numberLiteral: NumberLiteral
  stringLiteral: StringLiteral
  templateLiteral: TemplateLiteral
  identifier: Identifier

  // 表达式
  unaryExpression: UnaryExpression
  ifExpression: IfExpression
  tupleExpression: TupleExpression
  arrayExpression: ArrayExpression
  dictionaryExpression: DictionaryExpression
  binaryExpression: BinaryExpression
  assignmentExpression: AssignmentExpression
  memberExpression: MemberExpression
  subscriptExpression: SubscriptExpression
  callExpression: CallExpression
  compareExpression: CompareExpression
  logicalExpression: LogicalExpression

  constructor(astGenerator: AstGenerator) {
    super(astGenerator)

    this.noneLiteral = new NoneLiteral(astGenerator)
    this.booleanLiteral = new BooleanLiteral(astGenerator)
    this.numberLiteral = new NumberLiteral(astGenerator)
    this.stringLiteral = new StringLiteral(astGenerator)
    this.templateLiteral = new TemplateLiteral(astGenerator)
    this.identifier = new Identifier(astGenerator)
    this.unaryExpression = new UnaryExpression(astGenerator)
    this.ifExpression = new IfExpression(astGenerator)
    this.tupleExpression = new TupleExpression(astGenerator)
    this.arrayExpression = new ArrayExpression(astGenerator)
    this.dictionaryExpression = new DictionaryExpression(astGenerator)
    this.binaryExpression = new BinaryExpression(astGenerator)
    this.assignmentExpression = new AssignmentExpression(astGenerator)
    this.memberExpression = new MemberExpression(astGenerator)
    this.subscriptExpression = new SubscriptExpression(astGenerator)
    this.callExpression = new CallExpression(astGenerator)
    this.compareExpression = new CompareExpression(astGenerator)
    this.logicalExpression = new LogicalExpression(astGenerator)
  }

  /** 解析表达式 */
  handle(environment: ENodeEnvironment = ENodeEnvironment.normal): TExpressionNode {
    return this.handleMaybeAssignment(environment)
  }

  /** 处理可能是赋值表达式 */
  handleMaybeAssignment(environment: ENodeEnvironment = ENodeEnvironment.normal) {
    const lastNode = this.handleMaybeTuple(environment)
    return this.assignmentExpression.handleMaybe(lastNode, environment)
  }

  /** 处理可能是元组表达式 */
  handleMaybeTuple(environment: ENodeEnvironment = ENodeEnvironment.normal) {
    const lastNode = this.handleMaybeIf(environment)
    return this.tupleExpression.handleMaybe(lastNode, environment)
  }

  /** 处理可能是条件表达式 */
  handleMaybeIf(environment: ENodeEnvironment = ENodeEnvironment.normal) {
    const lastNode = this.handleMaybeLogical(environment)
    return this.ifExpression.handleMaybe(lastNode, environment)
  }

  /** 处理可能是逻辑表达式 */
  handleMaybeLogical(environment: ENodeEnvironment = ENodeEnvironment.normal, disableOr: boolean = false) {
    const lastNode = this.handleMaybeCompare(environment)
    return this.logicalExpression.handleMaybe(lastNode, environment, disableOr)
  }

  /** 处理可能是比较表达式 */
  handleMaybeCompare(environment: ENodeEnvironment = ENodeEnvironment.normal) {
    const lastNode = this.handleMaybeBinary(environment)
    return this.compareExpression.handleMaybe(lastNode, environment)
  }

  /** 处理可能是二元表达式 */
  handleMaybeBinary(environment: ENodeEnvironment = ENodeEnvironment.normal) {
    const lastNode = this.handleMaybeMemberOrSubscriptOrCall(environment)
    return this.binaryExpression.handleMaybe(lastNode, environment)
  }

  /** 处理可能是 MemberExpression or SubscriptExpression or CallExpression */
  handleMaybeMemberOrSubscriptOrCall(
    environment: ENodeEnvironment = ENodeEnvironment.normal,
    lastNode: TExpressionNode = this.handleFirstExpression(environment)
  ): TExpressionNode {
    if (!this.isContinue(environment)) return lastNode

    const currentToken = this.tokens.getToken()
    if (isToken(currentToken, ETokenType.punctuation, '.')) {
      const memberExpression = this.memberExpression.handle(lastNode, environment)
      return this.handleMaybeMemberOrSubscriptOrCall(environment, memberExpression)
    } else if (isToken(currentToken, ETokenType.bracket, '[')) {
      const subscriptExpression = this.subscriptExpression.handle(lastNode, environment)
      return this.handleMaybeMemberOrSubscriptOrCall(environment, subscriptExpression)
    } else if (isToken(currentToken, ETokenType.bracket, '(')) {
      const callExpression = this.callExpression.handle(lastNode, environment)
      return this.handleMaybeMemberOrSubscriptOrCall(environment, callExpression)
    }
    return lastNode
  }

  handleFirstExpression(environment: ENodeEnvironment = ENodeEnvironment.normal): TExpressionNode {
    const currentToken = this.tokens.getToken()
    if (isToken(currentToken, ETokenType.bracket, '(')) {
      return this.handleSmallBracket()
    } else if (isToken(currentToken, ETokenType.bracket, '[')) {
      return this.arrayExpression.handle()
    } else if (isToken(currentToken, ETokenType.bracket, '{')) {
      return this.dictionaryExpression.handle()
    } else if (
      isToken(currentToken, ETokenType.operator, ['+', '-']) ||
      isToken(currentToken, ETokenType.keyword, 'not')
    ) {
      return this.unaryExpression.handle(environment)
    } else {
      return this.handleBasicExpression()
    }
  }

  /** 处理小括号token */
  handleSmallBracket(handleExpressionCb = () => this.handleMaybeTuple(ENodeEnvironment.bracket)): TExpressionNode {
    const currentToken = this.tokens.getToken()
    if (!isToken(currentToken, ETokenType.bracket, '(')) {
      throw new TypeError("handleSmallBracket err: current token is not bracket '('")
    }

    this.tokens.next()
    const expression = handleExpressionCb()
    if (!isToken(this.tokens.getToken(), ETokenType.bracket, ')')) {
      throw new TypeError("handleSmallBracket err: current token is not bracket ')'")
    }

    this.tokens.next()

    return hasParenthesized(expression)
      ? expression
      : addBaseNodeAttr(expression, {
          extra: {
            parenthesized: true,
            parentStart: getPositionInfo(currentToken, 'start')
          }
        })
  }

  /** 基础基础表达式 */
  handleBasicExpression(): TBasicExpressionNode {
    const currentToken = this.tokens.getToken()
    switch (currentToken.type) {
      case ETokenType.string: {
        if (getTokenExtra(currentToken).prefix === 'f') {
          return this.templateLiteral.handle()
        } else {
          return this.stringLiteral.handle()
        }
      }
      case ETokenType.identifier:
        return this.identifier.handle()
      case ETokenType.number:
        return this.numberLiteral.handle()
      case ETokenType.keyword:
        switch (currentToken.value) {
          case 'None':
            return this.noneLiteral.handle()
          case 'True':
          case 'False':
            return this.booleanLiteral.handle()
        }
      default: {
        const position = getPositionInfo(currentToken, 'start')
        throw new TypeError(
          `Unexpected token: value: ${currentToken.value} line: ${position.line} column: ${position.column}`
        )
      }
    }
  }
}

export default Expression
