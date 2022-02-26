import { PYTHON } from './const'
import { ETokenType, TTokenExtra, TToken, TPositionInfo, EStringTokenPrefix } from './types'
import { createLocByPosition } from './utils'

interface ICodeScannerOptions {
  initPositionInfo?: TPositionInfo
}

type TFindResult = {
  sumLength: number
  betweenContent: string
  lineNum: number
  columnNum: number
}

/** 3位操作符 */
const operatorReg3 = /\/\/\=|\*\*\=|\<\<\=|\>\>\=/
/** 2位操作符 */
const operatorReg2 = /\*\*|\/\/|\<\<|\>\>|\+\=|\-\=|\*\=|\/\=|\%\=|\|\=|\&\=|\=\=|\!\=|\>\=|\<\=|\^\=|\@\=|\:\=/
/** 1位操作符 */
const operatorReg1 = /\&|\||\^|\~|\+|\-|\*|\/|\%|\/|\^|\=|\<|\>|\@/
/** 进制 */
const systemReg = /0[bBoOxX]/
const systemSuffixReg2 = /[01]/
const systemSuffixReg8 = /[01234567]/
const systemSuffixReg16 = /[0123456789ABCDEFabcdef]/
/** 括号 */
const bracketReg = /\(|\)|\{|\}|\[|\]/
/** 标点符号 */
const punctuationReg = /\.|\,|\:/
/** 标识符 */
const identifierReg = /[a-z|A-Z|_|\u4e00-\u9fa5|\u0800-\u4e00|\uAC00-\uD7A3]/
/** 标识符后续 */
const identifierSuffixReg = /[a-z|A-Z|_|\u4e00-\u9fa5|\u0800-\u4e00|\uAC00-\uD7A3|0-9]/

/** 代码扫描器 */
class CodeScanner {
  constructor(private options: ICodeScannerOptions = {}) {}

  scan(code: string): TToken[] {
    const result: TToken[] = []
    let i = 0
    let line = this.options.initPositionInfo?.line || 1
    let column = this.options.initPositionInfo?.column || 1
    // 拼接符队列
    let continuationCharacters: { line: number; column: number }[] = []

    /** 处理循环的参数 */
    const handleCycleParams = (sumLength: number, lineNum: number, columnNum: number) => {
      i += sumLength
      line += lineNum
      column = lineNum ? columnNum : column + columnNum
    }

    let currentChar: string
    while ((currentChar = code[i++])) {
      const nextChar = code[i]
      const nNextChar = code[i + 1]
      let type: ETokenType
      let value: string = currentChar
      let extra: TTokenExtra
      const startPosition = continuationCharacters.length ? continuationCharacters[0] : { line, column }

      // 处理换行符
      if (currentChar === PYTHON.LINE_BREAK) {
        line++
        column = 1
        continue
      } else if (currentChar + nextChar === PYTHON.CR_LINE_BREAK) {
        line++
        column = 1
        i++
        continue
      }
      // 处理注释
      else if (currentChar === '#') {
        const { betweenContent } = this._findTarget(code.slice(i), PYTHON.LINE_BREAK)
        handleCycleParams(betweenContent.length + 1, 1, 1)
        continue
      }
      // 处理 \ 拼接字符
      else if (currentChar === '\\') {
        if (nextChar !== PYTHON.LINE_BREAK && nextChar + nNextChar !== PYTHON.CR_LINE_BREAK) {
          throw new SyntaxError('unexpected character after line continuation character')
        }
        continuationCharacters.push({ line, column })

        continue
      }
      // 处理括号
      else if (bracketReg.test(currentChar)) {
        type = ETokenType.bracket
      }

      // 处理操作符
      else if (operatorReg3.test(currentChar + nextChar + nNextChar)) {
        type = ETokenType.operator
        value = currentChar + nextChar + nNextChar
        handleCycleParams(2, 0, 2)
      } else if (operatorReg2.test(currentChar + nextChar)) {
        type = ETokenType.operator
        value = currentChar + nextChar
        handleCycleParams(1, 0, 1)
      } else if (operatorReg1.test(currentChar)) {
        type = ETokenType.operator
      }

      // 二八十六进制
      else if (systemReg.test(currentChar + nextChar)) {
        const sliceContent = code.slice(i + 1)
        let reg: RegExp
        if (nextChar === 'b' || nextChar === 'B') reg = systemSuffixReg2
        else if (nextChar === 'o' || nextChar === 'O') reg = systemSuffixReg8
        else if (nextChar === 'x' || nextChar === 'X') reg = systemSuffixReg16
        const { lineNum, columnNum, betweenContent, sumLength } = this._findConformString(
          sliceContent,
          (char, index) => {
            if (char === '_') {
              const nextChar = sliceContent[index + 1]
              if (!reg.test(nextChar)) {
                throw new SyntaxError('invalid decimal literal')
              }

              return true
            } else return reg.test(char)
          }
        )
        type = ETokenType.number
        value = currentChar + nextChar + betweenContent
        handleCycleParams(sumLength + 1, lineNum, columnNum)
      }
      // 处理数字
      else if (/[0-9]/.test(currentChar)) {
        const sliceContent = code.slice(i)
        let hasJ = false,
          hasPoint = false,
          hasE = false,
          ignore = false

        const { lineNum, columnNum, betweenContent } = this._findConformString(sliceContent, (char, index) => {
          if (ignore) {
            ignore = false
            return true
          } else if (hasJ) return false
          else if (char === '.') return (hasPoint = !hasPoint)
          else if (char === 'j') return (hasJ = !hasJ)
          else if (char === 'e') {
            hasPoint = true
            if (sliceContent[index + 1] === '-') ignore = true
            return (hasE = !hasE)
          } else if (char === '_') {
            if (!/[0-9]/.test(sliceContent[index + 1])) {
              throw new SyntaxError('invalid decimal literal')
            }
            return true
          } else return /[0-9]/.test(char)
        })

        type = ETokenType.number
        value = currentChar + betweenContent
        handleCycleParams(betweenContent.length, lineNum, columnNum)
      } else if (/\.[0-9]/.test(currentChar + nextChar)) {
        const sliceContent = code.slice(i)
        let hasJ = false,
          hasE = false,
          ignore = false
        const { lineNum, columnNum, betweenContent } = this._findConformString(sliceContent, (char, index) => {
          if (ignore) {
            ignore = false
            return true
          } else if (hasJ) return false
          else if (char === 'j') return (hasJ = !hasJ)
          else if (char === 'e') {
            if (sliceContent[index + 1] === '-') ignore = true
            return (hasE = !hasE)
          } else if (char === '_') {
            if (!/[0-9]/.test(sliceContent[index + 1])) {
              throw new SyntaxError('invalid decimal literal')
            }
            return true
          } else return /[0-9]/.test(char)
        })

        type = ETokenType.number
        value = currentChar + betweenContent
        handleCycleParams(betweenContent.length, lineNum, columnNum)
      } else if ('...' === currentChar + nextChar + nNextChar) {
        type = ETokenType.ellipsis
        handleCycleParams(2, 0, 2)
      }
      // 处理标点符号
      else if (punctuationReg.test(currentChar)) {
        type = ETokenType.punctuation
      }

      // 处理字符串
      else if (/\"|\'/.test(currentChar)) {
        const { sumLength, lineNum, columnNum, betweenContent } = this._handleQuotesChar(
          code.slice(i),
          currentChar as '"' | "'"
        )

        type = ETokenType.string
        value = betweenContent
        handleCycleParams(sumLength, lineNum, columnNum) // 将光标移至引号后面
      } else if (/fr|rf|rb|br/.test(currentChar + nextChar) && /\"|\'/.test(nNextChar)) {
        const { sumLength, lineNum, columnNum, betweenContent } = this._handleQuotesChar(
          code.slice((i += 2)),
          nNextChar as '"' | "'"
        )

        type = ETokenType.string
        value = betweenContent
        extra = { prefix: (currentChar + nextChar) as EStringTokenPrefix }
        handleCycleParams(sumLength, lineNum, columnNum) // 将光标移至引号后面
      } else if (/u|r|f|b/.test(currentChar) && /\"|\'/.test(nextChar)) {
        const { sumLength, lineNum, columnNum, betweenContent } = this._handleQuotesChar(
          code.slice(++i),
          nextChar as '"' | "'"
        )

        type = ETokenType.string
        value = betweenContent
        extra = { prefix: currentChar as EStringTokenPrefix }
        handleCycleParams(sumLength, lineNum, columnNum) // 将光标移至引号后面
      }

      // 处理关键字和标识符
      else if (identifierReg.test(currentChar)) {
        const { lineNum, columnNum, betweenContent } = this._findConformString(code.slice(i), char =>
          identifierSuffixReg.test(char)
        )

        value = currentChar + betweenContent
        type = PYTHON.KEYWORDS.includes(value) ? ETokenType.keyword : ETokenType.identifier
        handleCycleParams(betweenContent.length, lineNum, columnNum)
      }

      column++

      if (type) {
        if (continuationCharacters.length) continuationCharacters = []

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

  /** 处理引号字符 */
  private _handleQuotesChar(content: string, char: '"' | "'") {
    const isRealQuotes = (index: number) => {
      let backslashCount = 0
      while (content[--index] === '\\') backslashCount++

      return backslashCount % 2 === 0 // 引号前的反斜杠数量为偶数 就是字符串结束的引号
    }

    let result
    const isMulti = content.startsWith(char.repeat(2))
    // 多行字符串
    if (isMulti) {
      const target = char.repeat(3)
      result = this._findConformString(
        content.slice(2),
        (_target, index) => !(_target === target && isRealQuotes(index + 2)),
        {
          targetLength: 3,
          enableMultiLine: true,
          enableJoint: true
        }
      )
      result.columnNum += 2
      result.sumLength += 5
    }
    // 单行字符串
    else {
      result = this._findConformString(content, (target, index) => !(target === char && isRealQuotes(index)), {
        enableJoint: true
      })
      result.sumLength += 1
    }

    return result
  }

  /** 寻找下一个字符/字符串 */
  private _findTarget(content: string, target: string, enableMultiLine: boolean = false) {
    return this._findConformString(content, _target => _target !== target, {
      targetLength: target.length,
      enableMultiLine
    })
  }

  private _findConformString(
    content: string,
    cb: (target: string, index: number) => boolean,
    { targetLength = 1, enableMultiLine = false, enableJoint = false } = {}
  ): TFindResult {
    let index = 0,
      line = 0,
      column = 0,
      betweenContent = ''
    let currentChar
    while ((currentChar = content[index])) {
      if (enableJoint && currentChar === '\\' && content[index + 1] === PYTHON.LINE_BREAK) {
        column = 1
        line++
        index += 2
        continue
      }

      let isLineBreak = currentChar === PYTHON.LINE_BREAK
      const target = targetLength === 1 ? currentChar : content.substr(index, targetLength)
      if ((isLineBreak && !enableMultiLine) || !cb(target, index)) break

      if (isLineBreak) {
        column = 1
        line++
      } else {
        column++
      }

      index++
      betweenContent += currentChar
    }

    if (!currentChar) {
      index--
      column--
    }

    return {
      lineNum: line,
      columnNum: column,
      betweenContent,
      sumLength: enableJoint ? content.slice(0, index).length : betweenContent.length
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
