import { TStatementNode } from 'src/types'
import AstGenerator from '../AstGenerator'
import BaseHandler from '../BaseHandler'
import { ENodeEnvironment } from '../types'

import BlockStatement from './BlockStatement'
import BreakStatement from './BreakStatement'
import ClassDeclaration from './ClassDeclaration'
import ContinueStatement from './ContinueStatement'
import DeleteStatement from './DeleteStatement'
import EmptyStatement from './EmptyStatement'
import ForStatement from './ForStatement'
import FunctionDeclaration from './FunctionDeclaration'
import IfStatement from './IfStatement'
import ImportStatement from './ImportStatement'
import ReturnStatement from './ReturnStatement'
import TryStatement from './TryStatement'
import VariableDeclaration from './VariableDeclaration'
import WhileStatement from './WhileStatement'
import WithStatement from './WithStatement'

class Statement extends BaseHandler {
  variableDeclaration: VariableDeclaration
  tryStatement: TryStatement
  importStatement: ImportStatement
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

  constructor(astGenerator: AstGenerator) {
    super(astGenerator)

    this.variableDeclaration = new VariableDeclaration(astGenerator)
    this.tryStatement = new TryStatement(astGenerator)
    this.importStatement = new ImportStatement(astGenerator)
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
  }

  /** 处理语句 */
  handle(environment: ENodeEnvironment): TStatementNode {
    const currentToken = this.tokens.getToken()
    switch (currentToken.value) {
      case 'pass':
        return this.emptyStatement.handle()
      case 'def':
        return this.functionDeclaration.handle(environment)
      case 'class':
        return this.classDeclaration.handle(environment)
      case 'nonlocal':
      case 'global':
        return this.variableDeclaration.handle()
      case 'if':
        return this.ifStatement.handle(environment)
      case 'import':
      case 'from':
        return this.importStatement.handle()
      case 'try':
        return this.tryStatement.handle(environment)
      case 'for':
        return this.forStatement.handle(environment)
      case 'return':
        return this.returnStatement.handle(environment)
      case 'while':
        return this.whileStatement.handle(environment)
      case 'continue':
        return this.continueStatement.handle(environment)
      case 'break':
        return this.breakStatement.handle(environment)
      case 'with':
        return this.withStatement.handle()
      case 'del':
        return this.deleteStatement.handle()
    }
  }
}

export default Statement
