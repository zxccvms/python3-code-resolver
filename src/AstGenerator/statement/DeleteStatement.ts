import { ENodeType, ETokenType, IDeleteStatement, TToken } from '../../types'
import { createLoc, getLatest, isSameRank, createNode } from '../../utils'
import Node from '../utils/Node'
import { EEnvironment } from '../types'

/** del语句 */
class DeleteStatement extends Node {
  handle(environment: EEnvironment): IDeleteStatement {
    const delToken = this.output(ETokenType.keyword, 'del')
    const targets = this._handleTargets(delToken)

    const DeleteStatement = createNode(ENodeType.DeleteStatement, {
      targets,
      loc: createLoc(delToken, getLatest(targets))
    })

    return DeleteStatement
  }

  private _handleTargets(markToken: TToken) {
    const { payload } = this.findNodes({
      end: token => !isSameRank([markToken, token], 'endAndStartLine'),
      step: () => this.astGenerator.expression.handleMaybeBinary(EEnvironment.normal),
      isSlice: true
    })

    return payload
  }
}

export default DeleteStatement
