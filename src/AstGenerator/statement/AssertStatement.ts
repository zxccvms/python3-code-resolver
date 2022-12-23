import { ENodeType, ETokenType, IAssertStatement } from '../../types'
import { createLoc, createNode } from '../../utils'
import Node from '../utils/Node'
import { EEnvironment } from '../types'

/** Assert语句 assert a, b */
class AssertStatement extends Node {
  handle(environment: EEnvironment): IAssertStatement {
    const assertToken = this.output(ETokenType.keyword, 'assert')

    const test = this.astGenerator.expression.handleMaybeIf(environment)

    let msg = null
    if (this.eat(ETokenType.punctuation, ',')) {
      msg = this.astGenerator.expression.handleMaybeIf(environment)
    }

    const AssertStatement = createNode(ENodeType.AssertStatement, {
      test,
      msg,
      loc: createLoc(assertToken, msg || test)
    })

    return AssertStatement
  }
}

export default AssertStatement
