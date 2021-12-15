import AstGenerator from 'src/AstGenerator/AstGenerator'
import { ENodeType, ETokenType, TBasicExpressionNode, TExpressionNode } from 'src/types'
import { getPositionInfo, getTokenExtra, isSameRank, isToken } from 'src/utils'
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
import LambdaExpression from './LambdaExpression'
import YieldExpression from './YieldExpression'
import Arguments from './Arguments'
import Keyword from './Keyword'
import StarredExpression from './StarredExpression'
import MiddleBracket from './MiddleBracket'
import Comprehension from './Comprehension'
import SmallBracket from './SmallBracket'
import BigBracket from './BigBracket'

class Expression extends BaseHandler {
  // 基础表达式
  noneLiteral: NoneLiteral
  booleanLiteral: BooleanLiteral
  numberLiteral: NumberLiteral
  stringLiteral: StringLiteral
  templateLiteral: TemplateLiteral
  identifier: Identifier

  // 表达式
  smallBracket: SmallBracket
  middleBracket: MiddleBracket
  bigBracket: BigBracket
  unaryExpression: UnaryExpression
  ifExpression: IfExpression
  tupleExpression: TupleExpression
  binaryExpression: BinaryExpression
  assignmentExpression: AssignmentExpression
  memberExpression: MemberExpression
  subscriptExpression: SubscriptExpression
  callExpression: CallExpression
  compareExpression: CompareExpression
  logicalExpression: LogicalExpression
  lambdaExpression: LambdaExpression
  yieldExpression: YieldExpression
  starredExpression: StarredExpression

  // 特殊表达式
  arguments: Arguments
  keyword: Keyword
  comprehension: Comprehension

  constructor(astGenerator: AstGenerator) {
    super(astGenerator)

    this.noneLiteral = new NoneLiteral(astGenerator)
    this.booleanLiteral = new BooleanLiteral(astGenerator)
    this.numberLiteral = new NumberLiteral(astGenerator)
    this.stringLiteral = new StringLiteral(astGenerator)
    this.templateLiteral = new TemplateLiteral(astGenerator)
    this.identifier = new Identifier(astGenerator)

    this.smallBracket = new SmallBracket(astGenerator)
    this.middleBracket = new MiddleBracket(astGenerator)
    this.bigBracket = new BigBracket(astGenerator)
    this.unaryExpression = new UnaryExpression(astGenerator)
    this.ifExpression = new IfExpression(astGenerator)
    this.tupleExpression = new TupleExpression(astGenerator)
    this.binaryExpression = new BinaryExpression(astGenerator)
    this.assignmentExpression = new AssignmentExpression(astGenerator)
    this.memberExpression = new MemberExpression(astGenerator)
    this.subscriptExpression = new SubscriptExpression(astGenerator)
    this.callExpression = new CallExpression(astGenerator)
    this.compareExpression = new CompareExpression(astGenerator)
    this.logicalExpression = new LogicalExpression(astGenerator)
    this.lambdaExpression = new LambdaExpression(astGenerator)
    this.yieldExpression = new YieldExpression(astGenerator)
    this.starredExpression = new StarredExpression(astGenerator)

    this.arguments = new Arguments(astGenerator)
    this.keyword = new Keyword(astGenerator)
    this.comprehension = new Comprehension(astGenerator)
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
    } else {
      return this.handleBasicExpression(environment)
    }
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
        // const position = getPositionInfo(currentToken, 'start')
        // throw new TypeError(
        //   `Unexpected token: value: ${currentToken.value} line: ${position.line} column: ${position.column}`
        // )
        return this.handleTokens()
      }
    }
  }

  handleTokens() {
    const tokens = []
    do {
      tokens.push(this.tokens.getToken())
      this.tokens.next()
    } while (isSameRank([tokens[tokens.length - 1], this.tokens.getToken()], 'endAndStartLine'))

    const Tokens = this.createNode(ENodeType.tokens, {
      tokens
    })

    return Tokens as any
  }
}

export default Expression
