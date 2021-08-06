import { PYTHON } from './const'
import { ETokenType, TPositionInfo, TTokenItem } from './types'

/** 代码扫描器 */
class CodeScanner {
  scan(code: string): TTokenItem[] {
    const result = [] as TTokenItem[]
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
      // 处理关键字和标识符
      else if (/[a-z|A-Z|_]/.test(currentChar)) {
        const { lineNum, columnNum, betweenContent } = this._findNextConformString(
          code.slice(i),
          (char) => !/[a-z|A-Z|_|0-9]/.test(char)
        )

        value = currentChar + betweenContent
        type = PYTHON.KEYWORDS.indexOf(value) !== -1 ? ETokenType.keyword : ETokenType.identifier
        handleCycleParams(betweenContent.length, lineNum, columnNum)
      }
      // 处理数字
      else if (/[0-9]/.test(currentChar)) {
        let hasPoint = false
        const { lineNum, columnNum, betweenContent } = this._findNextConformString(code.slice(i), (char) => {
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
        result.push({
          type,
          value,
          loc: this._createLocInfo(startPosition, { line, column })
        })
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

    if (content.startsWith(char + char)) {
      // 多行字符串
      const result = this._findNextString(content.slice(2), char + char + char, true, isRealQuotes)
      if (!result) return null
      result.sumLength += 2
      return result
    } else {
      // 单行字符串
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
          return currentString === target && extraCb?.(currentString, index)
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
  ): {
    sumLength: number
    betweenContent: string
    lineNum: number
    columnNum: number
  } {
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

  /** 创建定位信息 */
  private _createLocInfo(start: TPositionInfo, end: TPositionInfo) {
    return {
      start,
      end
    }
  }
}

export default CodeScanner
