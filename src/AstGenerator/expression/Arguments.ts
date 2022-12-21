import { ENodeType, ETokenType, TToken, IArguments, IArgument, TExpressionNode } from '../../types'
import { checkBit, createLoc } from '../../utils'
import BaseHandler from '../BaseHandler'
import { EEnvironment } from '../types'

enum EArgType {
  /** 普通参数 */
  arg,
  /** 带默认值的参数 */
  defaultArg,
  /** *参数 */
  varArg,
  /** **参数 */
  keywordArg,
  /** 分割符 */
  slash
}

type TItem = {
  type: EArgType
  arg?: IArgument
  defaultNode?: TExpressionNode
}

/** 参数列表表达式 */
class Arguments extends BaseHandler {
  handle(end: (token: TToken) => boolean, environment: EEnvironment): IArguments {
    const startToken = this.tokens.getToken()

    const { payload } = this.findNodes({
      end,
      step: () => this._handleCurrentStep(environment),
      isSlice: true
    })

    const argMap = this._filtrate(payload)

    const Arguments = this.createNode(ENodeType.Arguments, {
      ...argMap,
      loc: createLoc(startToken, this.tokens.getToken())
    })

    return Arguments
  }

  private _handleCurrentStep(environment: EEnvironment) {
    if (this.eat(ETokenType.operator, '/')) return { type: EArgType.slash }

    let type = EArgType.arg
    if (this.eat(ETokenType.operator, '**')) {
      type = EArgType.keywordArg
    } else if (this.eat(ETokenType.operator, '*')) {
      type = EArgType.varArg
      if (this.isToken(ETokenType.punctuation, ',')) return { type, arg: null }
    }

    return this._handleArgAndMaybeDefault(environment, type)
  }

  private _handleArgAndMaybeDefault(environment: EEnvironment, type: EArgType): TItem {
    const arg = this._handleArgument(environment)

    let defaultNode: TExpressionNode = null
    if (this.eat(ETokenType.operator, '=')) {
      if (type === EArgType.varArg || type === EArgType.keywordArg) {
        throw new SyntaxError('Parameter with "*" or "**" cannot have default value')
      }

      defaultNode = this.astGenerator.expression.handleMaybeIf(environment)
      type = EArgType.defaultArg
    }

    return { type, arg, defaultNode }
  }

  private _handleArgument(environment: EEnvironment): IArgument {
    const identifierToken = this.output(ETokenType.identifier)

    let annotation: TExpressionNode = null
    if (!checkBit(environment, EEnvironment.lambda) && this.eat(ETokenType.punctuation, ':')) {
      annotation = this.astGenerator.expression.handleMaybeIf(environment)
    }

    const Argument = this.createNode(ENodeType.Argument, {
      name: identifierToken.value,
      annotation,
      loc: createLoc(identifierToken, annotation || identifierToken)
    })

    return Argument
  }

  private _filtrate(data: TItem[]): Omit<IArguments, 'type'> {
    let posArgs: IArgument[] = []
    let args: IArgument[] = []
    const defaults: TExpressionNode[] = []
    let varArg: IArgument = null
    const keywordOnlyArgs: IArgument[] = []
    const keywordDefaults: TExpressionNode[] = []
    let keywordArg: IArgument = null
    let hasSlash = false
    let hasVarArg = false

    data.forEach(({ type, arg, defaultNode }, index) => {
      if (keywordArg) {
        throw new SyntaxError('Only one "**" parameter allowed')
      } else if (type === EArgType.keywordArg) {
        keywordArg = arg
      } else if (type === EArgType.defaultArg) {
        if (hasVarArg) {
          keywordOnlyArgs.push(arg)
          keywordDefaults.push(defaultNode)
        } else {
          args.push(arg)
          defaults.push(defaultNode)
        }
      } else if (type === EArgType.arg) {
        if (hasVarArg) {
          keywordOnlyArgs.push(arg)
          keywordDefaults.push(null)
        } else if (defaults.length) {
          throw new SyntaxError('Non-default argument follows default argument')
        } else {
          args.push(arg)
        }
      } else if (hasVarArg) {
        throw new SyntaxError('Only one "*" parameter allowed')
      } else if (type === EArgType.varArg) {
        varArg = arg
        hasVarArg = true
      } else if (hasSlash) {
        throw new SyntaxError('Only one "/" parameter allowed')
      } else if (type === EArgType.slash) {
        if (index === 0) {
          throw new SyntaxError('Position-only argument separator not allowed as first parameter')
        }
        posArgs = args
        args = []
        hasSlash = true
      }
    })

    return { posArgs, args, defaults, varArg, keywordOnlyArgs, keywordDefaults, keywordArg }
  }
}

export default Arguments
