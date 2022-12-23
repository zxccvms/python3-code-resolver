import {
  ETokenType,
  IAsyncFunctionDeclaration,
  IClassDeclaration,
  IFunctionDeclaration,
  TDecorativeExpressionNode,
  TNode,
  TStatementNode,
  TToken
} from '../../types'
import { getColumn, isToken } from '../../utils'
import Node from '../utils/Node'
import { EEnvironment } from '../types'
import AssertStatement from './AssertStatement'

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
import GlobalStatement from './GlobalStatement'
import WhileStatement from './WhileStatement'
import WithStatement from './WithStatement'
import NonlocalStatement from './NonlocalStatement'
import AsyncFunctionDeclaration from './AsyncFunctionDeclaration'
import AsyncForStatement from './AsyncForStatement'
import AsyncWithStatement from './AsyncWithStatement'

class Statement extends Node {
  readonly nonlocalStatement = new NonlocalStatement(this.astGenerator)
  readonly globalStatement = new GlobalStatement(this.astGenerator)
  readonly tryStatement = new TryStatement(this.astGenerator)
  readonly importStatement = new ImportStatement(this.astGenerator)
  readonly importFromStatement = new ImportFromStatement(this.astGenerator)
  readonly asyncfunctionDeclaration = new AsyncFunctionDeclaration(this.astGenerator)
  readonly functionDeclaration = new FunctionDeclaration(this.astGenerator)
  readonly classDeclaration = new ClassDeclaration(this.astGenerator)
  readonly emptyStatement = new EmptyStatement(this.astGenerator)
  readonly ifStatement = new IfStatement(this.astGenerator)
  readonly asyncForStatement = new AsyncForStatement(this.astGenerator)
  readonly forStatement = new ForStatement(this.astGenerator)
  readonly returnStatement = new ReturnStatement(this.astGenerator)
  readonly whileStatement = new WhileStatement(this.astGenerator)
  readonly continueStatement = new ContinueStatement(this.astGenerator)
  readonly breakStatement = new BreakStatement(this.astGenerator)
  readonly asyncWithStatement = new AsyncWithStatement(this.astGenerator)
  readonly withStatement = new WithStatement(this.astGenerator)
  readonly deleteStatement = new DeleteStatement(this.astGenerator)
  readonly raiseStatement = new RaiseStatement(this.astGenerator)
  readonly assertStatement = new AssertStatement(this.astGenerator)

  /** 处理语句 */
  handle(environment: EEnvironment = EEnvironment.normal): TStatementNode {
    const currentToken = this.getToken()
    switch (currentToken.value) {
      case 'pass':
        return this.emptyStatement.handle()
      case '@':
        return this._handleDecoratorsInStatement(environment)
      case 'def':
        return this.functionDeclaration.handle(environment)
      case 'class':
        return this.classDeclaration.handle(environment)
      case 'nonlocal':
        return this.nonlocalStatement.handle()
      case 'global':
        return this.globalStatement.handle()
      case 'if':
        return this.ifStatement.handle(environment)
      case 'import':
        return this.importStatement.handle()
      case 'from':
        return this.importFromStatement.handle()
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
        return this.withStatement.handle(environment)
      case 'del':
        return this.deleteStatement.handle()
      case 'raise':
        return this.raiseStatement.handle(environment)
      case 'assert':
        return this.assertStatement.handle(environment)
      case 'async': {
        const nextToken = this.tokens.getToken(1)
        switch (nextToken.value) {
          case 'def':
            return this.asyncfunctionDeclaration.handle(environment)
          case 'for':
            return this.asyncForStatement.handle(environment)
          case 'with':
            return this.asyncWithStatement.handle(environment)
        }
      }
    }
  }

  handleBody(environment: EEnvironment, start: TToken | TNode): TNode[] {
    this.outputLine(ETokenType.punctuation, ':')

    const nodes: TNode[] = []
    if (this.isSameLine()) {
      do {
        const node = this.astGenerator.handleNode(environment)
        nodes.push(node)
      } while (this.eatLine(ETokenType.punctuation, ';') && this.isSameLine())
    } else {
      const startColumn = getColumn(start, 'start')
      const markColumn = this.getStartColumn()
      if (markColumn < startColumn) {
        throw new SyntaxError('Expected indented block')
      }

      do {
        const node = this.astGenerator.handleNodeWithCheckIndent(environment, markColumn - 1)
        nodes.push(node)
        while (this.eatLine(ETokenType.punctuation, ';') && this.isSameLine()) {
          const node = this.astGenerator.handleNode(environment)
          nodes.push(node)
        }
      } while (this.getStartColumn() === markColumn)
    }

    return nodes
  }

  /** 处理有装饰器的语句 */
  private _handleDecoratorsInStatement(
    environment: EEnvironment
  ): IAsyncFunctionDeclaration | IFunctionDeclaration | IClassDeclaration {
    const decorators = this._handleDecorators(environment)

    const currentToken = this.tokens.getToken()
    if (isToken(currentToken, ETokenType.keyword, 'def')) {
      return this.functionDeclaration.handle(environment, decorators)
    } else if (isToken(currentToken, ETokenType.keyword, 'class')) {
      return this.classDeclaration.handle(environment, decorators)
    } else if (isToken(currentToken, ETokenType.keyword, 'async')) {
      return this.asyncfunctionDeclaration.handle(environment, decorators)
    }

    throw new SyntaxError('Expected function or class declaration after decorator')
  }

  /** 处理装饰器 */
  private _handleDecorators(
    environment: EEnvironment,
    decorators: TDecorativeExpressionNode[] = []
  ): TDecorativeExpressionNode[] {
    this.output(ETokenType.operator, '@')
    const expression = this.astGenerator.expression.handleMaybeMemberOrSubscriptOrCall(
      EEnvironment.decorative
    ) as TDecorativeExpressionNode

    decorators.push(expression)

    if (this.isToken(ETokenType.operator, '@')) {
      return this._handleDecorators(environment, decorators)
    }

    return decorators
  }
}

export default Statement
