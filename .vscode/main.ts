import 'module-alias/register'
import { AstGenerator, AstToCode, CodeScanner } from 'src'
import path from 'path'
import fs from 'fs'

new Promise(async () => {
  const codeScanner = new CodeScanner()
  const customFilePath = path.join(__dirname, 'code.py')

  const pythonCode = fs.readFileSync(customFilePath, { encoding: 'utf-8' })

  const tokens = codeScanner.scan(pythonCode)
  const astGenerator = new AstGenerator(tokens)
  const ast = astGenerator.generate()

  console.log('运行成功')
  console.log('ast: ', ast)

  const astToCode = new AstToCode()
  const code = astToCode.generate(ast)
  console.log(`taozhizhu ~🚀 file: main.ts ~🚀 line 21 ~🚀 code`, code)
})

setTimeout(() => {}, 9999999)
