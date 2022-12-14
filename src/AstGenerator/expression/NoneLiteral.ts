import { ENodeType, ETokenType, INoneLiteral } from '../../types'
import { createLoc, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'
import { EEnvironment } from '../types'

class NoneLiteral extends BaseHandler {
  handle(environment: EEnvironment): INoneLiteral {
    this.check({ environment })

    const currentToken = this.output(ETokenType.keyword, 'None')
    const NoneLiteral = this.createNode(ENodeType.NoneLiteral, {
      loc: createLoc(currentToken, currentToken)
    })

    return NoneLiteral
  }
}

export default NoneLiteral
