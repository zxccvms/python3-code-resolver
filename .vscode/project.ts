import 'module-alias/register'
import { AstGenerator, CodeScanner } from 'src'
import path from 'path'
import fs from 'fs'

function readPyFileCode(dirPath: string, cb: (filePath: string, code: string) => void) {
  fs.readdir(dirPath, { withFileTypes: true }, (_, dirents) => {
    for (const dirent of dirents) {
      const absPath = path.join(dirPath, dirent.name)

      if (dirent.isDirectory()) readPyFileCode(absPath, cb)
      else if (path.extname(dirent.name) === '.py') {
        const pythonCode = fs.readFileSync(absPath, { encoding: 'utf-8' })
        cb(absPath, pythonCode)
      }
    }
  })
}

new Promise(() => {
  const codeScanner = new CodeScanner()
  const pythonProjectPath = path.join(__dirname, '../pythonProject')
  readPyFileCode(pythonProjectPath, (filePath, code) => {
    try {
      console.log('filePath: ', filePath)
      const tokens = codeScanner.scan(code)
      const astGenerator = new AstGenerator(tokens)
      const ast = astGenerator.generate()
      console.log('ast: ', ast)
    } catch {}
  })
})

setTimeout(() => {}, 9999999)
