import {
  ENodeType,
  ETokenType,
  IIdentifier,
  IMemberExpression,
  ISliceExpression,
  TExpressionNode,
  TNode,
  TTokenItem
} from '../../types.d'
import { addBaseNodeAttr, createLoc, isExpressionNode, isNode, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'
import { EHandleCode } from '../types.d'

class MemberExpression extends BaseHandler {
  handle() {
    const MemberExpression = this.handleMemberExpression()
    return { code: EHandleCode.single, payload: MemberExpression }
  }

  /** 处理对象调用属性节点 */
  handleMemberExpression(): IMemberExpression {
    const currentToken = this.tokens.getToken()
    if (!isToken(currentToken, [ETokenType.punctuation, ETokenType.bracket], ['.', '['])) {
      throw new TypeError("handleMemberExpression err: currentToken is not operator '.' or bracket '['")
    }

    const object = this.nodeChain.get()
    if (!this.isConformObject(object)) {
      throw new TypeError('handleMemberExpression err: object is not Identifier or MemberExpression or CallExpression')
    }

    const property = isToken(currentToken, ETokenType.punctuation, '.')
      ? this._handlePointOfProperty()
      : this._handleMiddenBracketOfProperty()

    const memberExpression = this.createNode(ENodeType.MemberExpression, object, property)
    const MemberExpression = addBaseNodeAttr(memberExpression, {
      loc: createLoc(object, property)
    })

    this.nodeChain.pop() // 在nodeChain中去掉lastNode
    this.tokens.next()

    return MemberExpression
  }

  isConformObject(node: TNode): node is IMemberExpression['object'] {
    return isNode(node, [
      ENodeType.Identifier,
      ENodeType.StringLiteral,
      ENodeType.MemberExpression,
      ENodeType.CallExpression
    ])
  }

  private _handlePointOfProperty(): IIdentifier {
    const currentToken = this.tokens.getToken()
    if (!isToken(currentToken, ETokenType.punctuation, '.')) {
      throw new TypeError('handleMemberExpression err: currentToken is not operator "."')
    }

    this.tokens.next()
    const nodes = this.findNodesByCount(1)
    if (!nodes) {
      throw new SyntaxError("handleMemberExpression err: can't find bracker ']'")
    } else if (nodes.length !== 1) {
      throw new SyntaxError('handleMemberExpression err: nodes length is equal 1')
    } else if (!isNode(nodes[0], ENodeType.Identifier)) {
      throw new SyntaxError('handleMemberExpression err: node is not Identifier')
    }
    this.tokens.last()

    return nodes[0]
  }

  /** 处理中括号形式的属性 如：a["b"] a[1:] */
  private _handleMiddenBracketOfProperty(): IMemberExpression['property'] {
    const leftMiddenBracket = this.tokens.getToken()
    if (!isToken(leftMiddenBracket, ETokenType.bracket, '[')) {
      throw new TypeError("handleMemberExpression err: currentToken is not bracket '[' ")
    }

    const stateNode = this.nodeChain.get()
    const nextTokenForLeftMiddenBracket = this.tokens.getToken(1)

    this.tokens.next()
    const nodesFragment = this.findNodesFragmentByConformToken(
      token => isToken(token, ETokenType.punctuation, ':'),
      token => !isToken(token, ETokenType.bracket, ']')
    )
    if (!nodesFragment) {
      throw new SyntaxError("handleMemberExpression err: can't find bracker ']'")
    }

    const lastTokenForRightMiddenBracket = this.tokens.getToken(-1)

    if (nodesFragment.length) {
      return this._handleSliceExpression(nextTokenForLeftMiddenBracket, lastTokenForRightMiddenBracket, nodesFragment)
    } else {
      const nodes = this.nodeChain.popByTarget(stateNode)
      if (nodes.length !== 1) {
        throw new SyntaxError('handleMemberExpression err: nodes length is equal 1')
      } else if (!isNode(nodes[0], [ENodeType.NumberLiteral, ENodeType.StringLiteral, ENodeType.Identifier])) {
        throw new TypeError('handleMemberExpression err: node is not NumberLiteral, StringLiteral, Identifier')
      }

      return nodes[0]
    }
  }

  private _handleSliceExpression(
    startToken: TTokenItem,
    endToken: TTokenItem,
    nodesFragment: TNode[][]
  ): ISliceExpression {
    if (nodesFragment.length > 3) {
      throw new SyntaxError('handleSliceExpression err: nodesFragment length Is greater than 3')
    } else if (!nodesFragment.every(nodes => Array.isArray(nodes) && nodes.length <= 1)) {
      throw new SyntaxError('handleSliceExpression err: nodes length Is greater than 1')
    } else if (!nodesFragment.every(nodes => !nodes[0] || isExpressionNode(nodes[0]))) {
      throw new TypeError('handleSliceExpression err: nodesFragment is not all expression node')
    }

    const [nodes1 = [], nodes2 = [], nodes3 = []] = nodesFragment as TExpressionNode[][]
    const lower = nodes1[0]
    const upper = nodes2[0]
    const step = nodes3[0]

    const sliceExpression = this.createNode(ENodeType.SliceExpression, lower, upper, step)
    const SliceExpression = addBaseNodeAttr(sliceExpression, {
      loc: createLoc(startToken, endToken)
    })

    return SliceExpression
  }
}

export default MemberExpression
