import {
  ENodeType,
  ETokenType,
  IClassDeclaration,
  IKeyword,
  TDecorativeExpressionNode,
  TNotAssignmentExpressionNode
} from '../../types'
import { createLoc, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'
import { EEnvironment } from '../types'

/** 类声明 */
class ClassDeclaration extends BaseHandler {
  handle(environment: EEnvironment, decorators?: TDecorativeExpressionNode[]): IClassDeclaration {
    const classToken = this.tokens.getToken()
    const identifierToken = this.tokens.getToken(1)
    this.check({
      checkToken: () =>
        isToken(classToken, ETokenType.keyword, 'class') && isToken(identifierToken, ETokenType.identifier),
      isAfter: 2
    })

    let bases: TNotAssignmentExpressionNode[] = []
    let keywords: IKeyword[] = []

    this.tokens.next(2)
    const currentToken = this.tokens.getToken()
    if (isToken(currentToken, ETokenType.bracket, '(')) {
      this.tokens.next()
      const hResult = this.astGenerator.expression.callExpression.handleArgsAndKeywords()

      bases = hResult.args
      keywords = hResult.keywords
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
