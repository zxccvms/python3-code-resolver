import { ENodeType, ETokenType, IDeleteStatement, TToken } from 'src/types'
import { createLoc, getLatest, isSameRank, isToken } from 'src/utils'
import BaseHandler from '../BaseHandler'

/** del语句 */
class DeleteStatement extends BaseHandler {
  handle(): IDeleteStatement {
    const delToken = this.tokens.getToken()
    this.check({
      checkToken: () => isToken(delToken, ETokenType.keyword, 'del')
    })

    this.tokens.next()
    const targets = this._handleTargets(delToken)

    const DeleteStatement = this.createNode(ENodeType.DeleteStatement, {
      targets,
      loc: createLoc(delToken, getLatest(targets))
    })

    return DeleteStatement
  }

  private _handleTargets(markToken: TToken) {
    const { payload } = this.findNodes({
      end: token => !isSameRank([markToken, token], 'endAndStartLine'),
      step: () => this.astGenerator.expression.handleMaybeBinary(),
      slice: token => isToken(token, ETokenType.punctuation, ',')
    })

    return payload
  }
}

export default DeleteStatement
