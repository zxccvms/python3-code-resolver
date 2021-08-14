import { addBaseNodeAttr, getPositionInfo, hasParenthesized, isSameRank, isSeparateToken, isToken } from '../utils'
import NodeGenerator from '../NodeGenerator'
import Chain from './utils/Chain'
import TokenArray from './utils/TokenArray'
import { ETokenType, IIdentifier, INumberLiteral, IStringLiteral, TNode, TTokenItem } from '../types'
import CallExpression from './handleNode/CallExpression'
import { EHandleCode, ENodeEnvironment } from './types'
import FunctionDeclaration from './handleNode/FunctionDeclaration'
import MemberExpression from './handleNode/MemberExpression'
import AssignmentExpression from './handleNode/AssignmentExpression'
import BaseHandler from './BaseHandler'
import BinaryExpression from './handleNode/BinaryExpression'
import DictionaryExpression from './handleNode/DictionaryExpression'
import ArrayExpression from './handleNode/ArrayExpression'
import TupleExpression from './handleNode/TupleExpression'
import EmptyStatement from './handleNode/EmptyStatement'
import VariableDeclaration from './handleNode/VariableDeclaration'
import BlockStatement from './handleNode/BlockStatement'
import ClassDeclaration from './handleNode/ClassDeclaration'
import IfExpression from './handleNode/IfExpression'
import UnaryExpression from './handleNode/UnaryExpression'
import TryStatement from './handleNode/TryStatement'
import Identifier from './handleNode/Identifier'
import StringLiteral from './handleNode/StringLiteral'
import NumberLiteral from './handleNode/NumberLiteral'
import BooleanLiteral from './handleNode/BooleanLiteral'
import NoneLiteral from './handleNode/NoneLiteral'
import ImportStatement from './handleNode/ImportStatement'
import IfStatement from './handleNode/IfStatement'
import ForStatement from './handleNode/ForStatement'

/** AST处理器 */
class AstProcessor {
  tokens: TokenArray
  nodeChain = new Chain<TNode>()
  createNode: NodeGenerator['generate']
  baseHandler: BaseHandler

  noneLiteral: NoneLiteral
  booleanLiteral: BooleanLiteral
  numberLiteral: NumberLiteral
  stringLiteral: StringLiteral
  identifierHandler: Identifier
  unaryExpression: UnaryExpression
  ifExpression: IfExpression
  tupleExpression: TupleExpression
  arrayExpression: ArrayExpression
  dictionaryExpression: DictionaryExpression
  binaryExpression: BinaryExpression
  assignmentExpression: AssignmentExpression
  variableDeclaration: VariableDeclaration
  memberExpression: MemberExpression
  callExpression: CallExpression
  tryStatement: TryStatement

  importStatement: ImportStatement
  functionDeclaration: FunctionDeclaration
  classDeclaration: ClassDeclaration
  blockStatement: BlockStatement
  emptyStatement: EmptyStatement
  ifStatement: IfStatement
  forStatement: ForStatement

  constructor(tokens: TTokenItem[]) {
    const nodeGenerator = new NodeGenerator()
    this.createNode = nodeGenerator.generate.bind(nodeGenerator)
    this.tokens = new TokenArray(tokens)
    this.baseHandler = new BaseHandler(this)

    this.noneLiteral = new NoneLiteral(this)
    this.booleanLiteral = new BooleanLiteral(this)
    this.numberLiteral = new NumberLiteral(this)
    this.stringLiteral = new StringLiteral(this)
    this.identifierHandler = new Identifier(this)
    this.unaryExpression = new UnaryExpression(this)
    this.ifExpression = new IfExpression(this)
    this.tupleExpression = new TupleExpression(this)
    this.arrayExpression = new ArrayExpression(this)
    this.dictionaryExpression = new DictionaryExpression(this)
    this.binaryExpression = new BinaryExpression(this)
    this.assignmentExpression = new AssignmentExpression(this)
    this.variableDeclaration = new VariableDeclaration(this)
    this.memberExpression = new MemberExpression(this)
    this.callExpression = new CallExpression(this)
    this.importStatement = new ImportStatement(this)
    this.tryStatement = new TryStatement(this)

    this.functionDeclaration = new FunctionDeclaration(this)
    this.classDeclaration = new ClassDeclaration(this)
    this.blockStatement = new BlockStatement(this)
    this.emptyStatement = new EmptyStatement(this)
    this.ifStatement = new IfStatement(this)
    this.forStatement = new ForStatement(this)
  }

  handle(): TNode[] {
    while (this.tokens.getIndex() < this.tokens.getLength()) this.walk()

    return this.nodeChain.popByTarget(undefined)
  }

  walk(environment: ENodeEnvironment = ENodeEnvironment.normal) {
    const currentToken = this.tokens.getToken()
    const { code, payload } = this[currentToken.type](environment) || {
      code: EHandleCode.single | EHandleCode.addIndex,
      payload: currentToken
    } // todo 未分析其他节点 先使用token代替

    if (code & EHandleCode.single) {
      this.nodeChain.push(payload as TNode)
    } else if (code & EHandleCode.multi) {
      this.nodeChain.push(...(payload as TNode[]))
    }

    if (code & EHandleCode.addIndex) {
      this.tokens.next()
    }
  }

  private [ETokenType.number](): TStateResponse<INumberLiteral> {
    return this.numberLiteral.handle()
  }

  private [ETokenType.string](): TStateResponse<IStringLiteral> {
    return this.stringLiteral.handle()
  }

  private [ETokenType.identifier](): TStateResponse<IIdentifier> {
    return this.identifierHandler.handle()
  }

  private [ETokenType.operator](): TStateResponse {
    const currentToken = this.tokens.getToken()
    const lastNode = this.nodeChain.get()

    switch (currentToken.value) {
      case '=':
      case '+=':
      case '-=':
      case '*=':
      case '/=':
      case '%=':
      case '**=':
      case '//=':
        return this.assignmentExpression.handle()
      case '+':
      case '-': {
        const lastToken = this.tokens.getToken(-1)
        if (
          !isSameRank(lastNode, currentToken, 'endAndStartLine') ||
          isToken(lastToken, [ETokenType.bracket, ETokenType.punctuation])
        ) {
          return this.unaryExpression.handle()
        }
      }
      case '*':
      case '/':
      case '%':
      case '<':
      case '>':
      case '//':
      case '**':
      case '==':
      case '!=':
      case '>=':
      case '<=':
        return this.binaryExpression.handle()
    }
  }

  private [ETokenType.punctuation](environment: ENodeEnvironment): TStateResponse {
    const currentToken = this.tokens.getToken()

    switch (currentToken.value) {
      case '.':
        return this.memberExpression.handle()
      case ',':
        return this.tupleExpression.handle(environment)
    }
  }

  private [ETokenType.bracket](): TStateResponse {
    const lastToken = this.tokens.getToken(-1)
    const currentToken = this.tokens.getToken()
    const lastNode = this.nodeChain.get()

    switch (currentToken.value) {
      case '(': {
        if (!isSeparateToken(lastToken) && this.callExpression.isConformCallee(lastNode, currentToken)) {
          return this.callExpression.handle()
        } else {
          return this.handleSmallBracket()
        }
      }
      case '[': {
        if (!isSeparateToken(lastToken) && this.memberExpression.isConformObject(lastNode)) {
          return this.memberExpression.handle()
        } else {
          return this.arrayExpression.handle()
        }
      }
      case '{':
        return this.dictionaryExpression.handle()
    }
  }

  private [ETokenType.keyword](): TStateResponse {
    const currentToken = this.tokens.getToken()
    const lastNode = this.nodeChain.get()

    switch (currentToken.value) {
      case 'None':
        return this.noneLiteral.handle()
      case 'True':
      case 'False':
        return this.booleanLiteral.handle()
      case 'pass':
        return this.emptyStatement.handle()
      case 'def':
        return this.functionDeclaration.handle()
      case 'class':
        return this.classDeclaration.handle()
      case 'global':
        return this.variableDeclaration.handle()
      case 'if': {
        if (isSameRank(lastNode, currentToken, 'line')) {
          return this.ifExpression.handle()
        } else {
          return this.ifStatement.handle()
        }
      }
      case 'import':
      case 'from':
        return this.importStatement.handle()
      case 'try':
        return this.tryStatement.handle()
      case 'not':
        return this.unaryExpression.handle()
      case 'for':
        return this.forStatement.handle()
    }
  }

  /** 处理小括号token */
  handleSmallBracket(): TStateResponse<TNode[]> {
    const bracket = this.tokens.getToken()
    if (!isToken(bracket, ETokenType.bracket, '(')) {
      throw new TypeError('_handleSmallBracket err: currentToken is not bracket "("')
    }

    this.tokens.next()
    const nodes = this.baseHandler.findNodesByConformToken(
      (token) => !isToken(token, ETokenType.bracket, ')'),
      ENodeEnvironment.smallBracket
    )
    if (!nodes) {
      throw new SyntaxError("_handleSmallBracket err: can't find bracket ')'")
    }

    const newNodes = nodes.map((node) =>
      hasParenthesized(node)
        ? node
        : addBaseNodeAttr(node, {
            extra: {
              parenthesized: true,
              parentStart: getPositionInfo(bracket, 'start')
            }
          })
    )

    this.tokens.next()

    return { code: EHandleCode.multi, payload: newNodes }
  }
}

export default AstProcessor
