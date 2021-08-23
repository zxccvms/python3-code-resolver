import { PYTHON } from './const'
import { ETokenType, TTokenExtra, TToken } from './types'
import { createLocByPosition } from './utils'

type TFindResult = {
  sumLength: number
  betweenContent: string
  lineNum: number
  columnNum: number
}

/** 代码扫描器 */
class CodeScanner {
  scan(code: string): TToken[] {
    const result = [] as TToken[]
    let i = 0
    let line = 1
    let column = 0

    /** 处理循环的参数 */
    const handleCycleParams = (sumLength: number, lineNum: number, columnNum: number) => {
      i += sumLength
      line += lineNum
      column = lineNum ? columnNum : column + columnNum
    }

    let currentChar: string
    while ((currentChar = code[i++])) {
      const nextChar = code[i]
      let type: ETokenType
      let value: string = currentChar
      let extra: TTokenExtra
      const startPosition = { line, column }

      // 处理换行符
      if (currentChar === PYTHON.LINE_BREAK) {
        line++
        column = 0
        continue
      }
      // 处理注释
      else if (currentChar === '#') {
        const { sumLength } = this._findNextString(code.slice(i), PYTHON.LINE_BREAK)
        handleCycleParams(sumLength, 1, 0)
        continue
      }

      // 处理算术运算符
      if (/[\+|\-|\*|\/|\%｜\/]/.test(currentChar)) {
        type = ETokenType.operator
        if (/\*\*|\/\//.test(currentChar + nextChar)) {
          value = currentChar + nextChar
          handleCycleParams(1, 0, 1)
        }
      }
      // 处理关系运算符
      else if (/[\<|\>]/.test(currentChar)) {
        type = ETokenType.operator
      }
      // 处理关系运算符
      else if (/\=\=|\!\=|\>\=|\<\=/.test(currentChar + nextChar)) {
        type = ETokenType.operator
        value = currentChar + nextChar
        handleCycleParams(1, 0, 1)
      }

      // 赋值运算符
      else if (/\=/.test(currentChar)) {
        type = ETokenType.operator
      }
      // 赋值运算符
      else if (/\+\=|\-\=|\*\=|\/\=|\%\=/.test(currentChar + nextChar)) {
        type = ETokenType.operator
        value = currentChar + nextChar
        handleCycleParams(1, 0, 1)
      }
      // 赋值运算符
      else if (/\/\/\=|\*\*\=/.test(currentChar + nextChar + code[i + 1])) {
        type = ETokenType.operator
        value = currentChar + nextChar + code[i + 1]
        handleCycleParams(1, 0, 2)
      }

      // 位运算符
      else if (/[\&|\||\^|\~]/.test(currentChar)) {
        type = ETokenType.operator
      }
      // 位运算符
      else if (/\<\<|\>\>/.test(currentChar + nextChar)) {
        type = ETokenType.operator
        value = currentChar + nextChar
        handleCycleParams(1, 0, 1)
      }

      // 处理操作符
      else if (/[\.|\,|\:]/.test(currentChar)) {
        type = ETokenType.punctuation
      }
      // 处理括号
      else if (/[\(|\)|\{|\}|\[|\]]/.test(currentChar)) {
        type = ETokenType.bracket
      }
      // 处理字符串
      else if (currentChar === '"' || currentChar === "'") {
        const { sumLength, lineNum, columnNum, betweenContent } = this._handleQuotesChar(code.slice(i), currentChar)

        type = ETokenType.string
        value = betweenContent
        handleCycleParams(sumLength, lineNum, columnNum + 1) // 将光标移至引号后面
      }
      // 处理字符串
      else if ((currentChar === 'u' || currentChar === 'r') && (nextChar === '"' || nextChar === "'")) {
        const { sumLength, lineNum, columnNum, betweenContent } = this._handleQuotesChar(code.slice(++i), nextChar)

        type = ETokenType.string
        value = betweenContent
        extra = { prefix: currentChar }
        handleCycleParams(sumLength, lineNum, columnNum + 1) // 将光标移至引号后面
      }
      // 处理字符串 todo
      else if (currentChar === 'f' && (nextChar === '"' || nextChar === "'")) {
        const { findResult, tokensFragment } = this._handleTemplateChar(code.slice(++i), nextChar)
        const { sumLength, lineNum, columnNum, betweenContent } = findResult

        type = ETokenType.string
        value = betweenContent
        extra = { prefix: currentChar, tokensFragment }
        handleCycleParams(sumLength, lineNum, columnNum + 1) // 将光标移至引号后面
      }
      // 处理关键字和标识符
      else if (/[a-z|A-Z|_]/.test(currentChar)) {
        const { lineNum, columnNum, betweenContent } = this._findNextConformString(
          code.slice(i),
          char => !/[a-z|A-Z|_|0-9]/.test(char)
        )

        value = currentChar + betweenContent
        type = PYTHON.KEYWORDS.includes(value) ? ETokenType.keyword : ETokenType.identifier
        handleCycleParams(betweenContent.length, lineNum, columnNum)
      }
      // 处理数字
      else if (/[0-9]/.test(currentChar)) {
        let hasPoint = false
        const { lineNum, columnNum, betweenContent } = this._findNextConformString(code.slice(i), char => {
          if (char === '.') {
            if (hasPoint) return true
            else {
              hasPoint = true
              return false
            }
          }

          return !/[0-9]/.test(char)
        })

        type = ETokenType.number
        value = currentChar + betweenContent
        handleCycleParams(betweenContent.length, lineNum, columnNum)
      }

      column++

      if (type) {
        const token = this._createToken(type, {
          value,
          loc: createLocByPosition(startPosition, { line, column }),
          extra
        })
        result.push(token)
      }
    }

    return result
  }

  /** 处理模版字符串 */
  private _handleTemplateChar(
    content: string,
    char: '"' | "'"
  ): { findResult: TFindResult; tokensFragment: TToken[][] } {
    const findResult = this._handleQuotesChar(content, char)
    const { betweenContent } = findResult

    let leftbracketCount = 0
    const contentFragment = this._sliceContent(betweenContent, char => {
      if (char === '{' && leftbracketCount++ === 0) return { code: 1 }
      else if (char === '}' && --leftbracketCount === 0) return { code: 2 }
      else return { code: 0 }
    })

    const tokensFragment: TToken<ETokenType, string>[][] = []
    for (const content of contentFragment) {
      if (!content) continue

      if (content.startsWith('{{') && content.endsWith('}}')) {
        const stringToken = this._createToken(ETokenType.string, {
          value: content.slice(1, -1),
          loc: createLocByPosition({ line: 0, column: 0 }, { line: 0, column: 0 })
        })
        tokensFragment.push([stringToken])
      } else if (content.startsWith('{') && content.endsWith('}')) {
        const tokens = this.scan(content.slice(1, -1))
        tokensFragment.push(tokens)
      } else {
        const stringToken = this._createToken(ETokenType.string, {
          value: content,
          loc: createLocByPosition({ line: 0, column: 0 }, { line: 0, column: 0 })
        })
        tokensFragment.push([stringToken])
      }
    }

    return { findResult, tokensFragment }
  }

  /** 切割字符串 */
  private _sliceContent(content: string, cb: (currentString: string) => TStateResponse): string[] {
    const result: string[] = []
    let i = 0
    let lastSliceIndex = 0
    let currentChar
    while ((currentChar = content[i++])) {
      if (!currentChar) {
        result.push(content.slice(lastSliceIndex, i))
        break
      }

      const { code } = cb(currentChar)
      if (code === 1) {
        result.push(content.slice(lastSliceIndex, i - 1))
        lastSliceIndex = i - 1
      } else if (code === 2) {
        result.push(content.slice(lastSliceIndex, i))
        lastSliceIndex = i
      }
    }

    return result
  }

  /** 处理引号字符 */
  private _handleQuotesChar(content: string, char: '"' | "'") {
    const isRealQuotes = (_: string, index: number) => {
      const beforeContent = content.slice(0, index)
      if (!beforeContent.length) return true

      let i = beforeContent.length
      let backslashCount = 0
      while (beforeContent[--i] === '\\') backslashCount++

      return backslashCount % 2 === 0 // 引号前的反斜杠数量为偶数 就是字符串结束的引号
    }

    // 多行字符串
    if (content.startsWith(char.repeat(2))) {
      const result = this._findNextString(content.slice(2), char.repeat(3), true, isRealQuotes)
      if (!result) return null
      result.sumLength += 2
      return result
    }
    // 单行字符串
    else {
      return this._findNextString(content, char, false, isRealQuotes)
    }
  }

  /** 寻找下一个字符/字符串 */
  private _findNextString(
    content: string,
    target: string,
    isFindForMultiLine: boolean = false,
    extraCb?: (currentString: string, index: number) => boolean
  ) {
    return this._findNextConformString(
      content,
      (currentString, index) => {
        if (extraCb) {
          return currentString === target && extraCb(currentString, index)
        } else {
          return currentString === target
        }
      },
      target.length,
      isFindForMultiLine
    )
  }

  /** 寻找符合的字符串 */
  private _findNextConformString(
    content: string,
    cb: (currentString: string, index: number) => boolean,
    targetLength: number = 1,
    isFindForMultiLine: boolean = false
  ): TFindResult {
    let i = 0
    let lineNum = 0
    let columnNum = 0
    let currentChar: string
    while ((currentChar = content[i])) {
      switch (currentChar) {
        case PYTHON.LINE_BREAK: {
          if (!isFindForMultiLine)
            return {
              sumLength: i + targetLength,
              betweenContent: content.slice(0, i),
              lineNum,
              columnNum
            }
          lineNum++
          columnNum = 0
        }
        default: {
          const currentString = content.substr(i, targetLength)
          if (cb(currentString, i)) {
            const lineCount = currentString.slice(1).split(PYTHON.LINE_BREAK).length - 1
            return {
              sumLength: i + targetLength,
              betweenContent: content.slice(0, i),
              lineNum: lineNum + lineCount,
              columnNum
            }
          }
        }
      }
      columnNum++
      i++
    }

    return {
      sumLength: content.length,
      betweenContent: content,
      lineNum,
      columnNum: columnNum - 1
    }
  }

  private _createToken<T extends ETokenType>(type: T, remainArg: Omit<TToken, 'type'>): TToken<T> {
    return {
      type,
      ...remainArg
    } as TToken<T>
  }
}

export default CodeScanner
