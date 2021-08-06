import NodeGenerator from '../NodeGenerator'
import { ENodeType, TNode, TTokenItem } from '../types.d'
import AstProcessor from './AstProcessor'
import Chain from './utils/Chain'
import TokenArray from './utils/TokenArray'
import { EHandleCode, ENodeEnvironment } from './types.d'

/** 节点基础的处理者 */
class BaseHandler {
  tokens: TokenArray
  /** 节点链表 */
  nodeChain: Chain<TNode>
  createNode: NodeGenerator['generate']
  astProcessor: AstProcessor

  constructor(astProcessor: AstProcessor) {
    this.tokens = astProcessor.tokens
    this.nodeChain = astProcessor.nodeChain
    this.createNode = astProcessor.createNode
    this.astProcessor = astProcessor
  }

  handle(environment?: ENodeEnvironment): TStateResponse<TNode> {
    const token = this.tokens.getToken() as any // 部分节点未处理 采用token代替
    return { code: EHandleCode.single, payload: token }
  }

  /** 通过需要的节点数量得到节点 */
  findNodesByCount(count: number, environment: ENodeEnvironment = ENodeEnvironment.normal) {
    const startNode = this.nodeChain.get()

    for (let i = 0; i < count; i++) {
      this.astProcessor.walk(environment)
    }

    return this.nodeChain.popByTarget(startNode)
  }

  /** 通过符合的node得到期间生成的节点 */
  // findNodesByConformNode(cb: (node: TNode) => boolean, environment: ENodeEnvironment = ENodeEnvironment.normal) {
  //   const startNode = this.nodeChain.get()

  //   do {
  //     this.astProcessor.walk(environment)
  //   } while (cb(this.nodeChain.get()))

  //   this.tokens.last() // 补充多消费的token
  //   const stagingNode = this.nodeChain.pop()[0]
  //   // 最后的节点 可能不存在 已经超出token的长度
  //   if (stagingNode) {
  //     this.nodeChain.pushStaging(stagingNode)
  //   }

  //   return this.nodeChain.popByTarget(startNode)
  // }

  /** 通过符合的token得到期间生成的节点 */
  findNodesByConformToken(
    cb: (token: TTokenItem) => boolean,
    environment: ENodeEnvironment = ENodeEnvironment.normal
  ): TNode[] {
    const startNode = this.nodeChain.get()

    let currentToken
    while ((currentToken = this.tokens.getToken()) && cb(currentToken)) {
      this.astProcessor.walk(environment)
    }
    if (!currentToken) return null

    return this.nodeChain.popByTarget(startNode)
  }

  /** 通过 符合的token 和 步进函数 得到期间生成的节点 */
  findNodesByConformTokenAndStepFn<T>(cb: (token: TTokenItem) => boolean, stepFn: () => T): TStateResponse<T[]> {
    const result = []

    let currentToken
    while ((currentToken = this.tokens.getToken()) && cb(currentToken)) {
      result.push(stepFn())
    }
    if (!currentToken) return { code: 1, payload: result }

    return { code: 0, payload: result }
  }

  /** 通过符合的token得到期间生成的节点碎片 */
  findNodesFragmentByConformToken(
    sliceCb: (token: TTokenItem) => boolean,
    endCb: (token: TTokenItem) => boolean,
    environment: ENodeEnvironment = ENodeEnvironment.normal
  ): TNode[][] {
    const result = []
    const startNode = this.nodeChain.get()

    let index = 0
    let currentToken
    while ((currentToken = this.tokens.getToken())) {
      if (!endCb(currentToken)) {
        result[index] = this.nodeChain.popByTarget(startNode)
        break
      }
      if (sliceCb(currentToken)) {
        result[index++] = this.nodeChain.popByTarget(startNode)
        this.tokens.next()
        continue
      }
      this.astProcessor.walk(environment)
    }
    if (!currentToken) return null

    return result
  }
}

export default BaseHandler
