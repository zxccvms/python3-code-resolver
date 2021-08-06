import { inject } from 'src/base/common/injector'
import LogService from 'src/platform/log/browser'
import {
  ENodeType,
  IArrayExpression,
  IAssignmentExpression,
  IAssignmentParam,
  IBinaryExpression,
  IBlockStatement,
  IBooleanLiteral,
  ICallExpression,
  IClassDeclaration,
  IDictionaryExpression,
  IDictionaryProperty,
  IEmptyStatement,
  IExceptHandler,
  IFunctionDeclaration,
  IIdentifier,
  IIfExpression,
  IImportStatement,
  IMemberExpression,
  INoneLiteral,
  INumberLiteral,
  IProgram,
  ISliceExpression,
  IStringLiteral,
  ITryStatement,
  ITupleExpression,
  IUnaryExpression,
  IVariableDeclaration,
  TNode
} from './types.d'

class NodeGenerator {
  @inject() private logService!: LogService
  private log = this.logService.tag('NodeGenerator')

  generate<T extends ENodeType>(type: T, ...rest: Parameters<this[T]>): TNode<T> {
    try {
      return this[type]?.(...rest) ?? null
    } catch (e) {
      this.log.error('generate err: ', e)
      return null
    }
  }

  private [ENodeType.AssignmentParam](
    name: IAssignmentParam['name'],
    value: IAssignmentParam['value']
  ): IAssignmentParam {
    return {
      type: ENodeType.AssignmentParam,
      name,
      value
    }
  }

  private [ENodeType.ExceptHandler](
    body: IExceptHandler['body'],
    errName: IExceptHandler['errName'],
    name: IExceptHandler['name']
  ): IExceptHandler {
    return {
      type: ENodeType.ExceptHandler,
      body,
      name,
      errName
    }
  }

  private [ENodeType.NoneLiteral](): INoneLiteral {
    return {
      type: ENodeType.NoneLiteral
    }
  }

  private [ENodeType.BooleanLiteral](value: IBooleanLiteral['value']): IBooleanLiteral {
    return {
      type: ENodeType.BooleanLiteral,
      value
    }
  }

  private [ENodeType.NumberLiteral](text: string): INumberLiteral {
    const value = Number(text)
    return {
      type: ENodeType.NumberLiteral,
      value,
      raw: JSON.stringify(value)
    }
  }

  private [ENodeType.StringLiteral](value: string): IStringLiteral {
    return {
      type: ENodeType.StringLiteral,
      value,
      raw: JSON.stringify(value)
    }
  }

  private [ENodeType.Identifier](name: string): IIdentifier {
    return {
      type: ENodeType.Identifier,
      name
    }
  }

  private [ENodeType.UnaryExpression](
    oprator: IUnaryExpression['oprator'],
    argument: IUnaryExpression['argument']
  ): IUnaryExpression {
    return {
      type: ENodeType.UnaryExpression,
      oprator,
      argument
    }
  }

  private [ENodeType.IfExpression](
    test: IIfExpression['test'],
    body: IIfExpression['body'],
    alternate: IIfExpression['alternate']
  ): IIfExpression {
    return {
      type: ENodeType.IfExpression,
      test,
      body,
      alternate
    }
  }

  private [ENodeType.TupleExpression](elements: ITupleExpression['elements']): ITupleExpression {
    return {
      type: ENodeType.TupleExpression,
      elements
    }
  }

  private [ENodeType.ArrayExpression](elements: IArrayExpression['elements']): IArrayExpression {
    return {
      type: ENodeType.ArrayExpression,
      elements
    }
  }

  private [ENodeType.DictionaryProperty](
    key: IDictionaryProperty['key'],
    value: IDictionaryProperty['value']
  ): IDictionaryProperty {
    return {
      type: ENodeType.DictionaryProperty,
      key,
      value
    }
  }

  private [ENodeType.DictionaryExpression](properties: IDictionaryExpression['properties']): IDictionaryExpression {
    return {
      type: ENodeType.DictionaryExpression,
      properties
    }
  }

  private [ENodeType.BinaryExpression](
    operator: string,
    left: IBinaryExpression['left'],
    right: IBinaryExpression['right']
  ): IBinaryExpression {
    return {
      type: ENodeType.BinaryExpression,
      operator,
      left,
      right
    }
  }

  private [ENodeType.VariableDeclaration](
    kind: IVariableDeclaration['kind'],
    declarations: IVariableDeclaration['declarations']
  ): IVariableDeclaration {
    return {
      type: ENodeType.VariableDeclaration,
      kind,
      declarations
    }
  }

  private [ENodeType.AssignmentExpression](
    targets: IAssignmentExpression['targets'],
    value: IAssignmentExpression['value']
  ): IAssignmentExpression {
    return {
      type: ENodeType.AssignmentExpression,
      targets,
      value
    }
  }

  private [ENodeType.SliceExpression](
    lower: ISliceExpression['lower'],
    upper: ISliceExpression['upper'],
    step: ISliceExpression['step']
  ): ISliceExpression {
    return {
      type: ENodeType.SliceExpression,
      lower,
      upper,
      step
    }
  }

  private [ENodeType.MemberExpression](
    object: IMemberExpression['object'],
    property: IMemberExpression['property']
  ): IMemberExpression {
    return {
      type: ENodeType.MemberExpression,
      object,
      property
    }
  }

  private [ENodeType.CallExpression](
    callee: ICallExpression['callee'],
    params: ICallExpression['params'],
    keywords: ICallExpression['keywords']
  ): ICallExpression {
    return {
      type: ENodeType.CallExpression,
      callee,
      params,
      keywords
    }
  }

  private [ENodeType.ImportStatement](
    names: IImportStatement['names'],
    module?: IImportStatement['module']
  ): IImportStatement {
    return {
      type: ENodeType.ImportStatement,
      names,
      module
    }
  }

  private [ENodeType.FunctionDeclaration](
    id: IFunctionDeclaration['id'],
    params: IFunctionDeclaration['params'],
    defaults: IFunctionDeclaration['defaults'],
    body: IFunctionDeclaration['body']
  ): IFunctionDeclaration {
    return {
      type: ENodeType.FunctionDeclaration,
      id,
      params,
      defaults,
      body
    }
  }

  private [ENodeType.ClassDeclaration](
    id: IClassDeclaration['id'],
    bases: IClassDeclaration['bases'],
    keywords: IClassDeclaration['keywords'],
    body: IClassDeclaration['body']
  ): IClassDeclaration {
    return {
      type: ENodeType.ClassDeclaration,
      id,
      bases,
      keywords,
      body
    }
  }

  private [ENodeType.BlockStatement](body: IBlockStatement['body']): IBlockStatement {
    return {
      type: ENodeType.BlockStatement,
      body
    }
  }

  private [ENodeType.EmptyStatement](): IEmptyStatement {
    return {
      type: ENodeType.EmptyStatement
    }
  }

  private [ENodeType.TryStatement](
    body: ITryStatement['body'],
    handlers: ITryStatement['handlers'],
    finalBody: ITryStatement['finalBody']
  ): ITryStatement {
    return {
      type: ENodeType.TryStatement,
      body,
      handlers,
      finalBody
    }
  }

  private [ENodeType.Program](body: IProgram['body']): IProgram {
    return {
      type: ENodeType.Program,
      body
    }
  }
}

export default NodeGenerator
