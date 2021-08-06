import { AstGenerator, CodeScanner } from 'src'
const path = require('path')
const fs = require('fs')

const codeScanner = new CodeScanner()
const templateFileDir = path.join(__dirname, './template/templateFile')
const templateFiles = fs.readdirSync(templateFileDir)

for (const fileName of templateFiles) {
  const baseName = path.basename(fileName, '.py')
  const realPath = path.join(templateFileDir, fileName)

  const pythonCode = fs.readFileSync(realPath, { encoding: 'utf-8' })

  const tokens = codeScanner.scan(pythonCode)
  const astGenerator = new AstGenerator(tokens)

  test(`test AstGenerator ${fileName}`, async () => {
    const templateAst = await import(`./template/templateAst/${baseName}`)
    const ast = astGenerator.generate()
    expect(ast).toStrictEqual(templateAst.default)
  })
}
