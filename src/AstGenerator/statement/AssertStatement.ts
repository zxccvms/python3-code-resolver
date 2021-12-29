import { ENodeType, ETokenType, IAssertStatement } from 'src/types'
import { createLoc } from 'src/utils'
import BaseHandler from '../BaseHandler'
import { EEnvironment } from '../types'

/** Assert语句 assert a, b */
class AssertStatement extends BaseHandler {
  handle(environment: EEnvironment): IAssertStatement {
    const assertToken = this.output(ETokenType.keyword, 'assert')

    const test = this.astGenerator.expression.handleMaybeIf(environment)

    let msg = null
    if (this.eat(ETokenType.punctuation, ',')) {
      msg = this.astGenerator.expression.handleMaybeIf(environment)
    }

    const AssertStatement = this.createNode(ENodeType.AssertStatement, {
      test,
      msg,
      loc: createLoc(assertToken, msg || test)
    })

    return AssertStatement
  }
}

export default AssertStatement
