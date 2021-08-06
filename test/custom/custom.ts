// const { AstGenerator, CodeScanner } = require('../../dist')
// import a from './a'
// console.log('taozhizhu ~🚀 file: custom.ts ~🚀 line 3 ~🚀 a', a)
import { AstGenerator, CodeScanner } from '../../src'
console.log('taozhizhu ~🚀 file: custom.ts ~🚀 line 5 ~🚀 AstGenerator', AstGenerator)

// const path = require('path')
// const fs = require('fs')
// const util = require('util')

// try {
//   const codeScanner = new CodeScanner()
//   const customFilePath = path.join(__dirname, 'custom.py')

//   const pythonCode = fs.readFileSync(customFilePath, { encoding: 'utf-8' })

//   const tokens = codeScanner.scan(pythonCode)
//   const astGenerator = new AstGenerator(tokens)

//   const ast = astGenerator.generate()
//   console.log(
//     '============================================================ ast ============================================================',
//     util.inspect(ast, { depth: null }),
//     '============================================================ ast ============================================================'
//   )
// } catch (e) {
//   console.error(e)
// }

// setTimeout(() => { }, 9999999)
