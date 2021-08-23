import { TStatementNode } from 'src/types'
import AstGenerator from '../AstGenerator'
import BaseHandler from '../BaseHandler'

import BlockStatement from './BlockStatement'
import ClassDeclaration from './ClassDeclaration'
import EmptyStatement from './EmptyStatement'
import ForStatement from './ForStatement'
import FunctionDeclaration from './FunctionDeclaration'
import IfStatement from './IfStatement'
import ImportStatement from './ImportStatement'
import TryStatement from './TryStatement'
import VariableDeclaration from './VariableDeclaration'

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
  }

  /** 处理语句 */
  handle(): TStatementNode {
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
    }
  }
}

export default Statement
