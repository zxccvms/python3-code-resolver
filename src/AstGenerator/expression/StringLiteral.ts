import CodeScanner from '../../CodeScanner'
import { PYTHON } from '../../const'
import {
  ENodeType,
  ETokenType,
  ITemplateValue,
  IStringLiteral,
  ITemplateLiteral,
  TToken,
  EStringTokenPrefix,
  TLoc
} from '../../types'
import { createLoc, getLatest, getPositionInfo, getTokenExtra, isToken, createNode } from '../../utils'
import AstGenerator from '..'
import Node from '../utils/Node'
import { EEnvironment } from '../types'

enum EType {
  text = 'text',
  expression = 'expression'
}

interface ICacheStringLiteral extends Omit<IStringLiteral, 'type' | 'raw'> {}

interface IItem extends Omit<ICacheStringLiteral, 'prefix'> {
  type: EType
  prefix: EStringTokenPrefix
}

/** 字符串 */
class StringLiteral extends Node {
  handle(environment: EEnvironment): IStringLiteral | ITemplateLiteral {
    const stringToken = this.tokens.getToken()
    this.check({
      checkToken: () => isToken(stringToken, ETokenType.string),
      environment
    })

    let cache: ICacheStringLiteral = null
    let isTemplate = false
    let expressions: (IStringLiteral | ITemplateValue)[] = []
    for (const { value, type, prefix, loc } of this._handle(environment)) {
      if (!isTemplate && prefix?.includes(EStringTokenPrefix.f)) isTemplate = true

      if (type === EType.expression) {
        if (cache) {
          const StringLiteral = this._createStringLiteral(cache)
          expressions.push(StringLiteral)
          cache = null
        }

        const TemplateValue = this._handleTemplateValue(value, loc)
        expressions.push(TemplateValue)
      } else if (cache) {
        cache.loc.end = loc.end
        cache.value += value
      } else {
        cache = {
          loc,
          value,
          prefix: prefix?.replace(EStringTokenPrefix.f, '')
        }
      }
    }

    if (cache) {
      const StringLiteral = this._createStringLiteral(cache)
      expressions.push(StringLiteral)
    }

    if (isTemplate) {
      const TemplateLiteral = createNode(ENodeType.TemplateLiteral, {
        expressions,
        loc: createLoc(stringToken, getLatest(expressions))
      })

      return TemplateLiteral
    } else {
      return expressions[0] as IStringLiteral
    }
  }

  private _handle(environment: EEnvironment, result: IItem[] = []): IItem[] {
    const stringToken = this.eat(ETokenType.string)
    if (!stringToken) return result

    const prefix = getTokenExtra(stringToken).prefix
    // if (prefix === EStringTokenPrefix.f) {
    //   const parseResult = this._handlePrefixF(stringToken)
    //   result.push(...parseResult)
    // } else {
    result.push({
      loc: stringToken.loc,
      prefix,
      type: EType.text,
      value: stringToken.value //prefix === EStringTokenPrefix.r ? this._handlePrefixR(stringToken.value) : stringToken.value
    })
    // }

    if (!this.isContinue(environment)) return result

    return this._handle(environment, result)
  }

  private _handleTemplateValue(content: string, loc: TLoc): ITemplateValue {
    const tokens = new CodeScanner({
      initPositionInfo: loc.start
    }).scan(content)
    const astGenerator = new AstGenerator(tokens)
    const value = astGenerator.expression.handleMaybeTuple(EEnvironment.bracket)

    const TemplateValue = createNode(ENodeType.TemplateValue, {
      value,
      loc
    })

    return TemplateValue
  }

  private _handlePrefixF(stringToken: TToken<ETokenType.string>): IItem[] {
    const startPosition = getPositionInfo(stringToken, 'start')

    const result: IItem[] = []
    const content = stringToken.value
    let i = 0,
      lastSliceIndex = 0
    let line = startPosition.line,
      lastSliceLine = 0
    let column = startPosition.column,
      lastSliceColumn = 0
    const sliceContent = (type: EType, sliceIndex: number) => {
      result.push({
        value: content.slice(lastSliceIndex, sliceIndex),
        prefix: EStringTokenPrefix.f,
        type,
        loc: {
          start: { line: lastSliceLine, column: lastSliceColumn },
          end: { line, column }
        }
      })
      lastSliceIndex = sliceIndex
      lastSliceLine = line
      lastSliceColumn = column
    }

    let leftBracketCount = 0
    let currentChar
    while ((currentChar = content[i])) {
      if (currentChar === '{') {
        // 不在括号环境内 && 下一个是 {
        if (leftBracketCount === 0 && content[i + 1] === '{') i++, column++
        // 是开头的 {
        else if (leftBracketCount++ === 0) sliceContent(EType.text, i)
      } else if (currentChar === '}') {
        // 不在括号环境内 && 下一个是 }
        if (leftBracketCount === 0 && content[i + 1] === '}') i++, column++
        // } 多了
        else if (--leftBracketCount < 0) {
          throw new SyntaxError('Single close brace not allowed within f-string literal; use double close brace')
          // 是收尾的 }
        } else if (leftBracketCount === 0) sliceContent(EType.expression, i + 1)
      } else if (currentChar === PYTHON.LINE_BREAK) line++, (column = -1)

      i++
      column++
    }
    if (leftBracketCount > 0) {
      throw new SyntaxError('Unterminated expression in f-string; missing close brace')
    }

    if (lastSliceIndex < i) sliceContent(EType.text, i)

    return result
  }

  private _handlePrefixR(value: string) {
    return value.replace(/\\/g, '\\\\')
  }

  private _createStringLiteral(data: ICacheStringLiteral): IStringLiteral {
    return createNode(ENodeType.StringLiteral, {
      ...data,
      raw: JSON.stringify(data.value)
    })
  }
}

export default StringLiteral
