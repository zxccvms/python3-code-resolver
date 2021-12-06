import { TStatementNode } from 'src/types'
import AstGenerator from '../AstGenerator'
import BaseHandler from '../BaseHandler'
import { ENodeEnvironment } from '../types'

import BlockStatement from './BlockStatement'
import ClassDeclaration from './ClassDeclaration'
import ContinueStatement from './ContinueStatement'
import EmptyStatement from './EmptyStatement'
import ForStatement from './ForStatement'
import FunctionDeclaration from './FunctionDeclaration'
import IfStatement from './IfStatement'
import ImportStatement from './ImportStatement'
import ReturnStatement from './ReturnStatement'
import TryStatement from './TryStatement'
import VariableDeclaration from './VariableDeclaration'
import WhileStatement from './WhileStatement'

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
  }

  /** 处理语句 */
  handle(environment: ENodeEnvironment): TStatementNode {
    const currentToken = this.tokens.getToken()
    switch (currentToken.value) {
      case 'pass':
        return this.emptyStatement.handle()
      case 'def':
        return this.functionDeclaration.handle()
      case 'class':
        return this.classDeclaration.handle()
      case 'nonlocal':
      case 'global':
        return this.variableDeclaration.handle()
      case 'if':
        return this.ifStatement.handle()
      case 'import':
      case 'from':
        return this.importStatement.handle()
      case 'try':
        return this.tryStatement.handle()
      case 'for':
        return this.forStatement.handle()
      case 'return':
        return this.returnStatement.handle(environment)
      case 'while':
        return this.whileStatement.handle()
      case 'continue':
        return this.continueStatement.handle()
    }
  }
}

export default Statement
