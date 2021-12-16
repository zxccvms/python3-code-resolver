import AstGenerator from 'src/AstGenerator/AstGenerator'
import { ENodeType, ETokenType, TBasicExpressionNode, TExpressionNode } from 'src/types'
import { addBaseNodeAttr, deleteBit, getPositionInfo, getTokenExtra, hasParenthesized, isToken } from 'src/utils'
import BaseHandler from '../BaseHandler'
import { EEnvironment } from '../types'

import AssignmentExpression from './AssignmentExpression'
import BinaryExpression from './BinaryExpression'
import BooleanLiteral from './BooleanLiteral'
import CallExpression from './CallExpression'
import CompareExpression from './CompareExpression'
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
import SetOrDictionaryExpression from './SetOrDictionaryExpression'
import LambdaExpression from './LambdaExpression'
import YieldExpression from './YieldExpression'
import Arguments from './Arguments'
import Keyword from './Keyword'
import StarredExpression from './StarredExpression'
import ArrayOrArrayComprehensionExpression from './ArrayOrArrayComprehensionExpression'

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
  arrayOrArrayComprehensionExpression: ArrayOrArrayComprehensionExpression
  binaryExpression: BinaryExpression
  assignmentExpression: AssignmentExpression
  memberExpression: MemberExpression
  subscriptExpression: SubscriptExpression
  callExpression: CallExpression
  compareExpression: CompareExpression
  logicalExpression: LogicalExpression
  setOrDictionaryExpression: SetOrDictionaryExpression
  lambdaExpression: LambdaExpression
  yieldExpression: YieldExpression
  starredExpression: StarredExpression

  // 特殊表达式
  arguments: Arguments
  keyword: Keyword

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
    this.arrayOrArrayComprehensionExpression = new ArrayOrArrayComprehensionExpression(astGenerator)
    this.binaryExpression = new BinaryExpression(astGenerator)
    this.assignmentExpression = new AssignmentExpression(astGenerator)
    this.memberExpression = new MemberExpression(astGenerator)
    this.subscriptExpression = new SubscriptExpression(astGenerator)
    this.callExpression = new CallExpression(astGenerator)
    this.compareExpression = new CompareExpression(astGenerator)
    this.logicalExpression = new LogicalExpression(astGenerator)
    this.setOrDictionaryExpression = new SetOrDictionaryExpression(astGenerator)
    this.lambdaExpression = new LambdaExpression(astGenerator)
    this.yieldExpression = new YieldExpression(astGenerator)
    this.starredExpression = new StarredExpression(astGenerator)

    this.arguments = new Arguments(astGenerator)
    this.keyword = new Keyword(astGenerator)
  }

  /** 解析表达式 */
  handle(environment: EEnvironment = EEnvironment.normal): TExpressionNode {
    return this.handleMaybeAssignment(environment)
  }

  /** 处理可能是赋值表达式 */
  handleMaybeAssignment(environment: EEnvironment = EEnvironment.normal) {
    const lastNode = this.handleMaybeTuple(environment)
    return this.assignmentExpression.handleMaybe(lastNode, environment)
  }

  /** 处理可能是元组表达式 */
  handleMaybeTuple(environment: EEnvironment = EEnvironment.normal) {
    const lastNode = this.handleMaybeIf(environment)
    return this.tupleExpression.handleMaybe(lastNode, environment)
  }

  /** 处理可能是条件表达式 */
  handleMaybeIf(environment: EEnvironment = EEnvironment.normal) {
    const lastNode = this.handleMaybeLogical(environment)
    return this.ifExpression.handleMaybe(lastNode, environment)
  }

  /** 处理可能是逻辑表达式 */
  handleMaybeLogical(environment: EEnvironment = EEnvironment.normal, disableOr: boolean = false) {
    const lastNode = this.handleMaybeCompare(environment)
    return this.logicalExpression.handleMaybe(lastNode, environment, disableOr)
  }

  /** 处理可能是比较表达式 */
  handleMaybeCompare(environment: EEnvironment = EEnvironment.normal) {
    const lastNode = this.handleMaybeBinary(environment)
    return this.compareExpression.handleMaybe(lastNode, environment)
  }

  /** 处理可能是二元表达式 */
  handleMaybeBinary(environment: EEnvironment = EEnvironment.normal) {
    const lastNode = this.handleMaybeMemberOrSubscriptOrCall(environment)
    return this.binaryExpression.handleMaybe(lastNode, environment)
  }

  /** 处理可能是 MemberExpression or SubscriptExpression or CallExpression */
  handleMaybeMemberOrSubscriptOrCall(
    environment: EEnvironment = EEnvironment.normal,
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

  handleFirstExpression(environment: EEnvironment = EEnvironment.normal): TExpressionNode {
    const currentToken = this.tokens.getToken()
    if (isToken(currentToken, ETokenType.bracket, '(')) {
      return this.handleSmallBracket(environment)
    } else if (isToken(currentToken, ETokenType.bracket, '[')) {
      return this.arrayOrArrayComprehensionExpression.handle(environment)
    } else if (isToken(currentToken, ETokenType.bracket, '{')) {
      return this.setOrDictionaryExpression.handle(environment)
    } else if (this.unaryExpression.isConformToken(currentToken)) {
      return this.unaryExpression.handle(environment)
    } else if (isToken(currentToken, ETokenType.operator, '*')) {
      return this.starredExpression.handle(environment)
    } else if (isToken(currentToken, ETokenType.keyword, 'yield')) {
      return this.yieldExpression.handle(environment)
    } else if (isToken(currentToken, ETokenType.keyword, 'lambda')) {
      return this.lambdaExpression.handle(environment)
    } else {
      return this.handleBasicExpression(environment)
    }
  }

  /** 处理小括号token */
  handleSmallBracket(
    environment: EEnvironment,
    handleExpressionCb?: (environment: EEnvironment) => TExpressionNode
  ): TExpressionNode {
    const leftBracket = this.tokens.getToken()
    if (!isToken(leftBracket, ETokenType.bracket, '(')) {
      throw new TypeError("handleSmallBracket err: current token is not bracket '('")
    }

    this.tokens.next()

    let expression: TExpressionNode
    const currentToken = this.tokens.getToken()
    if (isToken(currentToken, ETokenType.bracket, ')')) {
      expression = this.createNode(ENodeType.TupleExpression, {
        elements: [],
        loc: {
          start: getPositionInfo(currentToken, 'start'),
          end: getPositionInfo(currentToken, 'start')
        }
      })
    } else {
      const handleEnvironment = environment | EEnvironment.bracket

      expression = handleExpressionCb?.(handleEnvironment) || this.handleMaybeTuple(handleEnvironment)

      if (!isToken(this.tokens.getToken(), ETokenType.bracket, ')')) {
        throw new TypeError("handleSmallBracket err: current token is not bracket ')'")
      }
    }

    this.tokens.next()

    return hasParenthesized(expression)
      ? expression
      : addBaseNodeAttr(expression, {
          // loc: createLoc(leftBracket, this.tokens.getToken()),
          extra: {
            parenthesized: true,
            parentStart: getPositionInfo(leftBracket, 'start')
          }
        })
  }

  /** 基础基础表达式 */
  handleBasicExpression(environment: EEnvironment = EEnvironment.normal): TBasicExpressionNode {
    const currentToken = this.tokens.getToken()
    switch (currentToken.type) {
      case ETokenType.string: {
        if (getTokenExtra(currentToken).prefix === 'f') {
          return this.templateLiteral.handle(environment)
        } else {
          return this.stringLiteral.handle(environment)
        }
      }
      case ETokenType.identifier:
        return this.identifier.handle(environment)
      case ETokenType.number:
        return this.numberLiteral.handle(environment)
      case ETokenType.keyword:
        switch (currentToken.value) {
          case 'None':
            return this.noneLiteral.handle(environment)
          case 'True':
          case 'False':
            return this.booleanLiteral.handle(environment)
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
