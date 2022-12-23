import {
  ENodeType,
  ETokenType,
  IClassDeclaration,
  IKeyword,
  TDecorativeExpressionNode,
  TExpressionNode
} from '../../types'
import { createLoc, isToken, createNode } from '../../utils'
import Node from '../utils/Node'
import { EEnvironment } from '../types'

/** 类声明 */
class ClassDeclaration extends Node {
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

    const body = this.astGenerator.statement.handleBody(environment, classToken)

    const ClassDeclaration = createNode(ENodeType.ClassDeclaration, {
      name: identifierToken.value,
      bases,
      keywords,
      body,
      decorators,
      loc: createLoc(decorators?.[0] || classToken, body.at(-1))
    })

    return ClassDeclaration
  }
}

export default ClassDeclaration
