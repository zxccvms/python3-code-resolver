import { ENodeType, ETokenType } from '../../types'
import { createLoc } from '../../utils'
import BaseHandler from '../BaseHandler'
import { EEnvironment } from '../types'

/** Ellipsis ... */
class Ellipsis extends BaseHandler {
  handle(environment: EEnvironment) {
    this.check({ environment })
    const ellipsis = this.output(ETokenType.ellipsis)

    const Ellipsis = this.createNode(ENodeType.Ellipsis, {
      loc: createLoc(ellipsis)
    })

    return Ellipsis
  }
}

export default Ellipsis
