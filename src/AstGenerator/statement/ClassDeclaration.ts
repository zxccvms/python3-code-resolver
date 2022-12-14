import {
  ENodeType,
  ETokenType,
  IClassDeclaration,
  IKeyword,
  TDecorativeExpressionNode,
  TExpressionNode
} from '../../types'
import { createLoc, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'
import { EEnvironment } from '../types'

/** 类声明 */
class ClassDeclaration extends BaseHandler {
  handle(environment: EEnvironment, decorators?: TDecorativeExpressionNode[]): IClassDeclaration {
    const classToken = this.output(ETokenType.keyword, 'class')
    this.check({ isBefore: true, isAfter: true })
    const identifierToken = this.output(ETokenType.identifier)

    let bases: TExpressionNode[] = []
    let keywords: IKeyword[] = []

    if (this.eat(ETokenType.bracket, '(')) {
      const hResult = this.astGenerator.expression.callExpression.handleArgsAndKeywords(EEnvironment.bracket, {
        enableGeneratorExpression: false
      })

      bases = hResult.args
      keywords = hResult.keywords
      this.output(ETokenType.bracket, ')')
    }

    const body = this.astGenerator.statement.blockStatement.handle(classToken, environment)

    const ClassDeclaration = this.createNode(ENodeType.ClassDeclaration, {
      name: identifierToken.value,
      bases,
      keywords,
      body,
      decorators,
      loc: createLoc(decorators?.[0] || classToken, body)
    })

    return ClassDeclaration
  }
}

export default ClassDeclaration
