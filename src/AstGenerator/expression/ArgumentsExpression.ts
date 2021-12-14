import { ENodeType, ETokenType, TToken, IArguments, IArgument, TExpressionNode } from 'src/types'
import { createLoc, isToken } from 'src/utils'
import BaseHandler from '../BaseHandler'

enum EStepState {
  /** 参数 */
  arg,
  /** 带默认值的参数 */
  default,
  /** *参数 */
  varArg,
  /** *参数后的参数 */
  keywordOnlyArg,
  /** **参数 */
  keywordArg
}

type TState = {
  stepState: EStepState
  enableVarArg: boolean
  enableKeywordArg: boolean
}

/** 参数列表表达式 */
class ArgumentsExpression extends BaseHandler {
  handle(end: (token: TToken) => boolean): IArguments {
    const state: TState = {
      stepState: EStepState.arg,
      enableVarArg: true,
      enableKeywordArg: true
    }

    const { payload = [] } =
      this.findNodes({
        end,
        step: () => this._handleCurrentStep(state),
        slice: token => isToken(token, ETokenType.punctuation, ',')
      }) || {}

    const { args, defaults, varArg, keywordOnlyArgs, keywordDefaults, keywordArg } = this._filtrate(payload)

    const Arguments = this.createNode(ENodeType.Arguments, {
      args,
      defaults,
      varArg,
      keywordOnlyArgs,
      keywordDefaults,
      keywordArg
    })

    return Arguments
  }

  private _handleCurrentStep(state: TState) {
    const nextStepState = this._getNextState(state.stepState)

    this._handleCurrentState(state, nextStepState)

    if (nextStepState === EStepState.varArg) {
      state.enableVarArg = false
      this.tokens.next()
    } else if (nextStepState === EStepState.keywordArg) {
      state.enableKeywordArg = false
      this.tokens.next()
    }
    state.stepState = nextStepState

    const { arg, defaultNode } = this._handleArgAndMaybeDefault(nextStepState)

    return { stepState: nextStepState, arg, defaultNode }
  }

  private _getNextState(currentStepState: EStepState) {
    const currentToken = this.tokens.getToken()

    if (isToken(currentToken, ETokenType.operator, '*')) {
      return EStepState.varArg
    } else if (isToken(currentToken, ETokenType.operator, '**')) {
      return EStepState.keywordArg
    } else if (currentStepState >= EStepState.varArg) {
      return EStepState.keywordOnlyArg
    } else if (isToken(this.tokens.getToken(1), ETokenType.operator, '=')) {
      return EStepState.default
    } else {
      return EStepState.arg
    }
  }

  private _handleCurrentState(state: TState, nextState: EStepState) {
    if (nextState === EStepState.varArg && !state.enableVarArg) {
      throw new SyntaxError('Only one "*" parameter allowed')
    } else if (nextState === EStepState.keywordArg && !state.enableKeywordArg) {
      throw new SyntaxError('Only one "**" parameter allowed')
    }

    if (state.stepState > nextState) {
      switch (state.stepState) {
        case EStepState.default:
          throw new SyntaxError('Non-default argument follows default argument')
        case EStepState.keywordArg:
          throw new SyntaxError('Parameter cannot follow "**" parameter')
      }
    }
  }

  private _handleArgAndMaybeDefault(stepState: EStepState) {
    const arg = this._handleArgument()

    let defaultNode: TExpressionNode = null
    if (isToken(this.tokens.getToken(), ETokenType.operator, '=')) {
      if (stepState === EStepState.varArg || stepState === EStepState.keywordArg) {
        throw new SyntaxError('Parameter with "*" or "**" cannot have default value')
      }

      this.tokens.next()
      defaultNode = this.astGenerator.expression.handleMaybeIf()
    }

    return { arg, defaultNode }
  }

  private _handleArgument(): IArgument {
    const identifierToken = this.tokens.getToken()
    this.check({
      checkToken: () => isToken(identifierToken, ETokenType.identifier)
    })

    this.tokens.next()
    const Argument = this.createNode(ENodeType.Argument, {
      name: identifierToken.value,
      loc: createLoc(identifierToken)
    })

    return Argument
  }

  private _filtrate(data: { stepState: EStepState; arg: IArgument; defaultNode?: TExpressionNode }[]) {
    const args = []
    const defaults = []
    let varArg = null
    const keywordOnlyArgs = []
    const keywordDefaults = []
    let keywordArg = null

    for (const { stepState, arg, defaultNode } of data) {
      if (stepState === EStepState.arg) {
        args.push(arg)
      } else if (stepState === EStepState.default) {
        args.push(arg)
        defaults.push(defaultNode)
      } else if (stepState === EStepState.varArg) {
        varArg = arg
      } else if (stepState === EStepState.keywordOnlyArg) {
        keywordOnlyArgs.push(arg)
        keywordDefaults.push(defaultNode)
      } else if (stepState === EStepState.keywordArg) {
        keywordArg = arg
      }
    }

    return { args, defaults, varArg, keywordOnlyArgs, keywordDefaults, keywordArg }
  }
}

export default ArgumentsExpression
