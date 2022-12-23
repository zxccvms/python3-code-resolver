import { ENodeType, ETokenType, ICase, IMatchStatement } from '../../types'
import { createLoc, createNode, getColumn } from '../../utils'
import Node from '../utils/Node'
import { EEnvironment } from '../types'

/** with语句 */
class MatchStatement extends Node {
  handle(environment: EEnvironment): IMatchStatement {
    const matchToken = this.outputBegin(ETokenType.identifier, 'match')

    const subject = this.astGenerator.expression.handleMaybeTuple(environment)
    this.outputLine(ETokenType.punctuation, ':')

    const startColumn = getColumn(matchToken, 'start')
    const markColumn = this.getStartColumn()
    if (markColumn < startColumn) {
      throw new SyntaxError('Expected indented block')
    }
    const cases: ICase[] = []
    do {
      const _case = this._handleCase(environment)
      cases.push(_case)
    } while (this.getStartColumn() === markColumn)

    const MatchStatement = createNode(ENodeType.MatchStatement, {
      subject,
      cases,
      loc: createLoc(matchToken, cases.at(-1))
    })

    return MatchStatement
  }

  isConform() {
    if (!this.isBegin()) return false
    else if (!this.isToken(ETokenType.identifier, 'match')) return false
  }

  private _handleCase(environment: EEnvironment): ICase {
    const caseToken = this.outputBegin(ETokenType.identifier, 'case')

    const pattern = this.astGenerator.expression.handleMaybeTuple(environment)
    const body = this.astGenerator.statement.handleBody(environment, caseToken)

    const CaseStatement = createNode(ENodeType.Case, {
      pattern,
      body,
      loc: createLoc(caseToken, body.at(-1))
    })

    return CaseStatement
  }
}

export default MatchStatement
