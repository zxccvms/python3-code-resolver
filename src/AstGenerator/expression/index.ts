import { ENodeType, ETokenType, TAssignableExpressionNode, TBasicExpressionNode, TExpressionNode } from '../../types'
import { createLoc, getPositionInfo, isSameRank, isToken } from '../../utils'
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
import TupleExpression from './TupleExpression'
import UnaryExpression from './UnaryExpression'
import SubscriptExpression from './SubscriptExpression'
import LogicalExpression from './LogicalExpression'
import LambdaExpression from './LambdaExpression'
import YieldExpression from './YieldExpression'
import Arguments from './Arguments'
import Keyword from './Keyword'
import StarredExpression from './StarredExpression'
import MiddleBracket from './MiddleBracket'
import Comprehension from './Comprehension'
import SmallBracket from './SmallBracket'
import BigBracket from './BigBracket'
import Ellipsis from './Ellipsis'
import AwaitExpression from './AwaitExpression'
import NamedExpression from './NamedExpression'

class Expression extends BaseHandler {
  // 基础表达式
  public readonly noneLiteral = new NoneLiteral(this.astGenerator)
  public readonly booleanLiteral = new BooleanLiteral(this.astGenerator)
  public readonly numberLiteral = new NumberLiteral(this.astGenerator)
  public readonly stringLiteral = new StringLiteral(this.astGenerator)
  public readonly identifier = new Identifier(this.astGenerator)
  public readonly ellipsis = new Ellipsis(this.astGenerator)

  // 表达式
  public readonly smallBracket = new SmallBracket(this.astGenerator)
  public readonly middleBracket = new MiddleBracket(this.astGenerator)
  public readonly bigBracket = new BigBracket(this.astGenerator)
  public readonly unaryExpression = new UnaryExpression(this.astGenerator)
  public readonly ifExpression = new IfExpression(this.astGenerator)
  public readonly tupleExpression = new TupleExpression(this.astGenerator)
  public readonly binaryExpression = new BinaryExpression(this.astGenerator)
  public readonly assignmentExpression = new AssignmentExpression(this.astGenerator)
  public readonly memberExpression = new MemberExpression(this.astGenerator)
  public readonly subscriptExpression = new SubscriptExpression(this.astGenerator)
  public readonly callExpression = new CallExpression(this.astGenerator)
  public readonly compareExpression = new CompareExpression(this.astGenerator)
  public readonly logicalExpression = new LogicalExpression(this.astGenerator)
  public readonly lambdaExpression = new LambdaExpression(this.astGenerator)
  public readonly yieldExpression = new YieldExpression(this.astGenerator)
  public readonly starredExpression = new StarredExpression(this.astGenerator)
  public readonly awaitExpression = new AwaitExpression(this.astGenerator)
  public readonly namedExpression = new NamedExpression(this.astGenerator)

  // 特殊表达式
  public readonly arguments = new Arguments(this.astGenerator)
  public readonly keyword = new Keyword(this.astGenerator)
  public readonly comprehension = new Comprehension(this.astGenerator)

  /** 解析表达式 */
  handle(environment: EEnvironment): TExpressionNode {
    return this.handleMaybeAssignment(environment)
  }

  /** 处理可能是赋值表达式 */
  handleMaybeAssignment(environment: EEnvironment) {
    const lastNode = this.handleMaybeTuple(environment)
    return this.assignmentExpression.handleMaybe(lastNode, environment)
  }

  /** 处理可能是元组表达式 */
  handleMaybeTuple(environment: EEnvironment) {
    const lastNode = this.handleMaybeIf(environment)
    return this.tupleExpression.handleMaybe(lastNode, environment)
  }

  /** 处理可能是条件表达式 */
  handleMaybeIf(environment: EEnvironment) {
    const lastNode = this.handleMaybeLogical(environment)
    return this.ifExpression.handleMaybe(lastNode, environment)
  }

  /** 处理可能是逻辑表达式 */
  handleMaybeLogical(environment: EEnvironment, disableOr: boolean = false) {
    const lastNode = this.handleMaybeCompare(environment)
    return this.logicalExpression.handleMaybe(lastNode, environment, disableOr)
  }

  /** 处理可能是比较表达式 */
  handleMaybeCompare(environment: EEnvironment) {
    const lastNode = this.handleMaybeBinary(environment)
    return this.compareExpression.handleMaybe(lastNode, environment)
  }

  /** 处理可能是二元表达式 */
  handleMaybeBinary(environment: EEnvironment) {
    const lastNode = this.handleMaybeMemberOrSubscriptOrCall(environment)
    return this.binaryExpression.handleMaybe(lastNode, environment)
  }

  /** 处理可能是 MemberExpression or SubscriptExpression or CallExpression */
  handleMaybeMemberOrSubscriptOrCall(
    environment: EEnvironment,
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

  handleFirstExpression(environment: EEnvironment): TExpressionNode {
    const currentToken = this.tokens.getToken()
    if (isToken(currentToken, ETokenType.bracket, '(')) {
      return this.smallBracket.handle(environment)
    } else if (isToken(currentToken, ETokenType.bracket, '[')) {
      return this.middleBracket.handle(environment)
    } else if (isToken(currentToken, ETokenType.bracket, '{')) {
      return this.bigBracket.handle(environment)
    } else if (this.unaryExpression.isConformToken(currentToken)) {
      return this.unaryExpression.handle(environment)
    } else if (isToken(currentToken, ETokenType.operator, '*')) {
      return this.starredExpression.handle(environment)
    } else if (isToken(currentToken, ETokenType.keyword, 'yield')) {
      return this.yieldExpression.handle(environment)
    } else if (isToken(currentToken, ETokenType.keyword, 'lambda')) {
      return this.lambdaExpression.handle(environment)
    } else if (isToken(currentToken, ETokenType.keyword, 'await')) {
      return this.awaitExpression.handle(environment)
    } else {
      return this.handleBasicExpression(environment)
    }
  }

  /** 基础基础表达式 */
  handleBasicExpression(environment: EEnvironment): TBasicExpressionNode {
    const currentToken = this.tokens.getToken()
    switch (currentToken.type) {
      case ETokenType.string:
        return this.stringLiteral.handle(environment)
      case ETokenType.identifier:
        return this.identifier.handle(environment)
      case ETokenType.number:
        return this.numberLiteral.handle(environment)
      case ETokenType.ellipsis:
        return this.ellipsis.handle(environment)
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

  /** 处理可赋值表达式 */
  handleAssignableExpression(environment: EEnvironment): TAssignableExpressionNode {
    const token = this.tokens.getToken()
    if (isToken(token, ETokenType.operator, '*')) {
      return this.starredExpression.handle(environment)
    } else if (isToken(token, ETokenType.bracket, '[')) {
      // return this.handleAssignableExpression(environment)
    } else if (isToken(token, ETokenType.bracket, '(')) {
      // return this.handleAssignableExpression(environment)
    } else {
      return this.output(ETokenType.identifier)
    }
  }
}

export default Expression
