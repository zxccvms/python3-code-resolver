import {
  ENodeType,
  ETokenType,
  IAssignmentParam,
  IClassDeclaration,
  IFunctionDeclaration,
  ITupleParam,
  IDictionaryParam
} from '../../types'
import { createLoc, isNode, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'
import { ENodeEnvironment } from '../types'

/** 类声明 */
class ClassDeclaration extends BaseHandler {
  handle(environment: ENodeEnvironment): IClassDeclaration {
    const classToken = this.tokens.getToken()
    if (!isToken(classToken, ETokenType.keyword, 'class')) {
      throw new TypeError("handleClassDeclaration err: currentToken is not keyword 'class'")
    }

    this.tokens.next()
    const id = this.astGenerator.expression.identifier.handle()
    const params = this._handleParams()
    const body = this.astGenerator.statement.blockStatement.handle(classToken, environment)

    const ClassDeclaration = this.createNode(ENodeType.ClassDeclaration, {
      id,
      params,
      body,
      loc: createLoc(classToken, body)
    })

    return ClassDeclaration
  }

  private _handleParams(): IFunctionDeclaration['params'] {
    const leftBracket = this.tokens.getToken()
    if (!isToken(leftBracket, ETokenType.bracket, '(')) return []

    this.tokens.next()
    const cacheState = { useKeyword: false, dictParamCount: 0 }
    const { code, payload: params } = this.findNodes({
      end: token => isToken(token, ETokenType.bracket, ')'),
      step: () => this._handleParam(cacheState),
      slice: token => isToken(token, ETokenType.punctuation, ',')
    })
    if (code === 1) {
      throw new SyntaxError("handleClassDeclaration err: can't find bracket ')'")
    }

    this.tokens.next()

    return params
  }

  private _handleParam(cacheState: {
    useKeyword: boolean
    dictParamCount: number
  }): Value<IFunctionDeclaration['params']> {
    const currentToken = this.tokens.getToken()
    const nextToken = this.tokens.getToken(1)

    if (cacheState.dictParamCount === 1) {
      throw new SyntaxError("handleClassDeclaration err: param can't follow  DictionaryParam")
    }

    let param
    if (isToken(currentToken, ETokenType.operator, '**')) {
      cacheState.dictParamCount++
      param = this._handleDictionaryParam()
    } else if (isToken(currentToken, ETokenType.operator, '*')) {
      param = this._handleTupleParam()
    } else if (isToken(nextToken, ETokenType.operator, '=')) {
      cacheState.useKeyword = true
      param = this._handleAssignmentParam()
    } else {
      param = this.astGenerator.expression.identifier.handle()
    }

    if (!isToken(this.tokens.getToken(), [ETokenType.punctuation, ETokenType.bracket], [',', ')'])) {
      throw new TypeError("handleClassDeclaration err: currentToken is not punctuation ',' or bracket ')'")
    } else if (cacheState.useKeyword && isNode(param, ENodeType.Identifier)) {
      throw new TypeError('handleClassDeclaration err: identifier argument cannot appear after keyword arguments')
    }

    return param
  }

  private _handleAssignmentParam(): IAssignmentParam {
    const name = this.astGenerator.expression.identifier.handle()

    this.tokens.next()
    const expression = this.astGenerator.expression.handleMaybeIf()

    const AssignmentParam = this.createNode(ENodeType.AssignmentParam, {
      name,
      value: expression,
      loc: createLoc(name, expression)
    })

    return AssignmentParam
  }

  private _handleTupleParam(): ITupleParam {
    const currentToken = this.tokens.getToken()

    this.tokens.next()
    const Identifier = this.astGenerator.expression.identifier.handle()

    const ITupleParam = this.createNode(ENodeType.TupleParam, {
      name: Identifier,
      loc: createLoc(currentToken, Identifier)
    })

    return ITupleParam
  }

  private _handleDictionaryParam(): IDictionaryParam {
    const currentToken = this.tokens.getToken()

    this.tokens.next()
    const Identifier = this.astGenerator.expression.identifier.handle()

    const IDictionaryParam = this.createNode(ENodeType.DictionaryParam, {
      name: Identifier,
      loc: createLoc(currentToken, Identifier)
    })

    return IDictionaryParam
  }
}

export default ClassDeclaration
