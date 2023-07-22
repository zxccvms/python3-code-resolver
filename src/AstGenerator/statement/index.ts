import {
  ETokenType,
  IClassDeclaration,
  IFunctionDeclaration,
  TDecorativeExpressionNode,
  TStatementNode
} from 'src/types'
import { isToken } from 'src/utils'
import AstGenerator from '../AstGenerator'
import BaseHandler from '../BaseHandler'
import { EEnvironment } from '../types'
import AssertStatement from './AssertStatement'

import BlockStatement from './BlockStatement'
import BreakStatement from './BreakStatement'
import ClassDeclaration from './ClassDeclaration'
import ContinueStatement from './ContinueStatement'
import DeleteStatement from './DeleteStatement'
import EmptyStatement from './EmptyStatement'
import ForStatement from './ForStatement'
import FunctionDeclaration from './FunctionDeclaration'
import IfStatement from './IfStatement'
import ImportFromStatement from './ImportFromStatement'
import ImportStatement from './ImportStatement'
import RaiseStatement from './RaiseStatement'
import ReturnStatement from './ReturnStatement'
import TryStatement from './TryStatement'
import VariableDeclaration from './VariableDeclaration'
import WhileStatement from './WhileStatement'
import WithStatement from './WithStatement'

class Statement extends BaseHandler {
  variableDeclaration: VariableDeclaration
  tryStatement: TryStatement
  importStatement: ImportStatement
  importFromStatement: ImportFromStatement
  functionDeclaration: FunctionDeclaration
  classDeclaration: ClassDeclaration
  blockStatement: BlockStatement
  emptyStatement: EmptyStatement
  ifStatement: IfStatement
  forStatement: ForStatement
  returnStatement: ReturnStatement
  whileStatement: WhileStatement
  continueStatement: ContinueStatement
  breakStatement: BreakStatement
  withStatement: WithStatement
  deleteStatement: DeleteStatement
  raiseStatement: RaiseStatement
  assertStatement: AssertStatement

  constructor(astGenerator: AstGenerator) {
    super(astGenerator)

    this.variableDeclaration = new VariableDeclaration(astGenerator)
    this.tryStatement = new TryStatement(astGenerator)
    this.importStatement = new ImportStatement(astGenerator)
    this.importFromStatement = new ImportFromStatement(astGenerator)
    this.functionDeclaration = new FunctionDeclaration(astGenerator)
    this.classDeclaration = new ClassDeclaration(astGenerator)
    this.blockStatement = new BlockStatement(astGenerator)
    this.emptyStatement = new EmptyStatement(astGenerator)
    this.ifStatement = new IfStatement(astGenerator)
    this.forStatement = new ForStatement(astGenerator)
    this.returnStatement = new ReturnStatement(astGenerator)
    this.whileStatement = new WhileStatement(astGenerator)
    this.continueStatement = new ContinueStatement(astGenerator)
    this.breakStatement = new BreakStatement(astGenerator)
    this.withStatement = new WithStatement(astGenerator)
    this.deleteStatement = new DeleteStatement(astGenerator)
    this.raiseStatement = new RaiseStatement(astGenerator)
    this.assertStatement = new AssertStatement(astGenerator)
  }

  /** 处理语句 */
  handle(environment: EEnvironment): TStatementNode {
    const currentToken = this.tokens.getToken()
    if (currentToken.type !== ETokenType.keyword && currentToken.type !== ETokenType.operator) return

    switch (currentToken.value) {
      // case 'pass':
      //   return this.emptyStatement.handle()
      // case '@':
      //   return this._handleDecoratorsInStatement(environment)
      // case 'def':
      //   return this.functionDeclaration.handle(environment)
      // case 'class':
      //   return this.classDeclaration.handle(environment)
      // case 'nonlocal':
      // case 'global':
      //   return this.variableDeclaration.handle()
      case 'if':
        return this.ifStatement.handle(environment)
      // case 'import':
      //   return this.importStatement.handle()
      // case 'from':
      //   return this.importFromStatement.handle()
      // case 'try':
      //   return this.tryStatement.handle(environment)
      case 'for':
        return this.forStatement.handle(environment)
      // case 'return':
      //   return this.returnStatement.handle(environment)
      // case 'while':
      //   return this.whileStatement.handle(environment)
      // case 'continue':
      //   return this.continueStatement.handle(environment)
      // case 'break':
      //   return this.breakStatement.handle(environment)
      // case 'with':
      //   return this.withStatement.handle(environment)
      // case 'del':
      //   return this.deleteStatement.handle()
      // case 'raise':
      //   return this.raiseStatement.handle(environment)
      // case 'assert':
      //   return this.assertStatement.handle(environment)
    }
  }

  /** 处理有装饰器的语句 */
  private _handleDecoratorsInStatement(environment: EEnvironment): IFunctionDeclaration | IClassDeclaration {
    const decorators = this._handleDecorators(environment)

    const defOrClassToken = this.tokens.getToken()
    if (isToken(defOrClassToken, ETokenType.keyword, 'def')) {
      return this.functionDeclaration.handle(environment, decorators)
    } else if (isToken(defOrClassToken, ETokenType.keyword, 'class')) {
      return this.classDeclaration.handle(environment, decorators)
    }

    throw new SyntaxError('Expected function or class declaration after decorator')
  }

  /** 处理装饰器 */
  private _handleDecorators(
    environment: EEnvironment,
    decorators: TDecorativeExpressionNode[] = []
  ): TDecorativeExpressionNode[] {
    const currentToken = this.tokens.getToken()
    this.check({
      checkToken: () => isToken(currentToken, ETokenType.operator, '@')
    })

    this.tokens.next()
    const expression = this.astGenerator.expression.handleMaybeMemberOrSubscriptOrCall(
      EEnvironment.decorative
    ) as TDecorativeExpressionNode

    decorators.push(expression)

    if (isToken(this.tokens.getToken(), ETokenType.operator, '@'))
      return this._handleDecorators(environment, decorators)

    return decorators
  }
}

export default Statement
