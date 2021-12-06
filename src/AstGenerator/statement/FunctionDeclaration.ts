import {
  ENodeType,
  ETokenType,
  IAssignmentParam,
  IDictionaryParam,
  IFunctionDeclaration,
  ITupleParam
} from '../../types'
import { createLoc, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'
import { ENodeEnvironment } from '../types'

/** 处理函数定义节点 */
class FunctionDeclaration extends BaseHandler {
  /** 处理函数定义节点 */
  handle(): IFunctionDeclaration {
    const defToken = this.tokens.getToken()
    if (!isToken(defToken, ETokenType.keyword, 'def')) {
      throw new TypeError('handleFunctionDeclaration err: currentToken is not keyword "def"')
    }

    this.tokens.next()
    const id = this.astGenerator.expression.identifier.handle()
    const params = this._handleParams()
    const body = this.astGenerator.statement.blockStatement.handle(defToken, ENodeEnvironment.functionBody)

    const FunctionDeclaration = this.createNode(ENodeType.FunctionDeclaration, {
      id,
      params,
      body,
      loc: createLoc(defToken, body)
    })

    return FunctionDeclaration
  }

  private _handleParams(): IFunctionDeclaration['params'] {
    const currentToken = this.tokens.getToken()
    if (!isToken(currentToken, ETokenType.bracket, '(')) {
      throw new TypeError("handleFunctionDeclaration err: currentToken is not bracket '('")
    }

    this.tokens.next()
    const cacheState = { tpParamCount: 0, dictParamCount: 0 }
    const { code, payload: params } = this.findNodes({
      end: token => isToken(token, ETokenType.bracket, ')'),
      step: () => this._handleParam(cacheState),
      slice: token => isToken(token, ETokenType.punctuation, ',')
    })
    if (code === 1) {
      throw new SyntaxError("FunctionDeclaration err: can't find bracket ')'")
    }

    this.tokens.next()

    return params
  }

  private _handleParam(cacheState: {
    tpParamCount: number
    dictParamCount: number
  }): Value<IFunctionDeclaration['params']> {
    const currentToken = this.tokens.getToken()
    const nextToken = this.tokens.getToken(1)

    if (cacheState.dictParamCount === 1) {
      throw new SyntaxError("handleFunctionDictionary err: param can't follow  DictionaryParam")
    }

    let param
    if (isToken(currentToken, ETokenType.operator, '**')) {
      cacheState.dictParamCount++
      param = this._handleDictionaryParam()
    } else if (isToken(currentToken, ETokenType.operator, '*')) {
      cacheState.tpParamCount++
      param = this._handleTupleParam()
    } else if (isToken(nextToken, ETokenType.operator, '=')) {
      param = this._handleAssignmentParam()
    } else {
      param = this.astGenerator.expression.identifier.handle()
    }

    if (!isToken(this.tokens.getToken(), [ETokenType.punctuation, ETokenType.bracket], [',', ')'])) {
      throw new TypeError("handleFunctionDictionary err: currentToken is not punctuation ',' or bracket ')'")
    }

    if (cacheState.tpParamCount === 2) {
      throw new SyntaxError('handleFunctionDictionary err: Only one TupleParam allowed')
    }

    return param
  }

  private _handleAssignmentParam(): IAssignmentParam {
    const name = this.astGenerator.expression.identifier.handle()

    this.tokens.next()
    const value = this.astGenerator.expression.handleMaybeIf()
    // const nodes = this.findNodesByConformToken(
    //   token => !isToken(token, [ETokenType.punctuation, ETokenType.bracket], [',', ')'])
    // )
    // if (!nodes) {
    //   throw new SyntaxError("handleFunctionDictionary err: can't find punctuation ',' or bracket ')'")
    // } else if (nodes.length !== 1) {
    //   throw new SyntaxError('handleFunctionDictionary err: nodes length is not equal 1')
    // } else if (!isExpressionNode(nodes[0])) {
    //   throw new TypeError('handleFunctionDictionary err: node is not expression node')
    // }

    const AssignmentParam = this.createNode(ENodeType.AssignmentParam, {
      name,
      value,
      loc: createLoc(name, value)
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

export default FunctionDeclaration
