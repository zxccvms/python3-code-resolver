import { ENodeType, ETokenType, IAssertStatement } from 'src/types'
import { createLoc } from 'src/utils'
import BaseHandler from '../BaseHandler'

/** Assert语句 assert a, b */
class AssertStatement extends BaseHandler {
  handle(): IAssertStatement {
    const assertToken = this.output(ETokenType.keyword, 'assert')

    const test = this.astGenerator.expression.handleMaybeIf()

    let msg = null
    if (this.eat(ETokenType.punctuation, ',')) {
      msg = this.astGenerator.expression.handleMaybeIf()
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
