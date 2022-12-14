import { AstGenerator, CodeScanner } from '../src'
import path from 'path'
import fs from 'fs'

function readPyFileCode(dirPath: string, cb: (filePath: string, code: string) => void) {
  const dirents = fs.readdirSync(dirPath, { withFileTypes: true })

  for (const dirent of dirents) {
    const absPath = path.join(dirPath, dirent.name)

    if (dirent.isDirectory()) readPyFileCode(absPath, cb)
    else if (path.extname(dirent.name) === '.py') {
      const pythonCode = fs.readFileSync(absPath, { encoding: 'utf-8' })
      cb(absPath, pythonCode)
    }
  }
}

new Promise(() => {
  const codeScanner = new CodeScanner()
  const pythonProjectPath = path.join(__dirname, '../pythonProject')
  readPyFileCode(pythonProjectPath, (filePath, code) => {
    try {
      const tokens = codeScanner.scan(code)
      const astGenerator = new AstGenerator(tokens)
      const ast = astGenerator.generate()
    } catch {
      console.error(filePath)
    }
  })
  console.log('小哥哥你真棒👍～')
})

setTimeout(() => {}, 9999999)
