export default {
  type: 'Program',
  body: [
    {
      type: 'IfStatement',
      test: {
        type: 'BooleanLiteral',
        value: true,
        loc: { start: { line: 1, column: 3 }, end: { line: 1, column: 7 } }
      },
      body: {
        type: 'BlockStatement',
        body: [
          {
            type: 'CallExpression',
            callee: {
              type: 'Identifier',
              name: 'prinit',
              loc: { start: { line: 2, column: 2 }, end: { line: 2, column: 8 } }
            },
            params: [
              {
                type: 'NumberLiteral',
                value: 1,
                raw: '1',
                loc: { start: { line: 2, column: 9 }, end: { line: 2, column: 10 } }
              }
            ],
            keywords: [],
            loc: { start: { line: 2, column: 2 }, end: { line: 2, column: 11 } }
          }
        ],
        loc: { start: { line: 1, column: 7 }, end: { line: 2, column: 11 } }
      },
      alternate: {
        type: 'IfStatement',
        test: {
          type: 'BooleanLiteral',
          value: false,
          loc: { start: { line: 3, column: 5 }, end: { line: 3, column: 10 } }
        },
        body: {
          type: 'BlockStatement',
          body: [
            {
              type: 'CallExpression',
              callee: {
                type: 'Identifier',
                name: 'prinit',
                loc: { start: { line: 4, column: 2 }, end: { line: 4, column: 8 } }
              },
              params: [
                {
                  type: 'NumberLiteral',
                  value: 2,
                  raw: '2',
                  loc: { start: { line: 4, column: 9 }, end: { line: 4, column: 10 } }
                }
              ],
              keywords: [],
              loc: { start: { line: 4, column: 2 }, end: { line: 4, column: 11 } }
            }
          ],
          loc: { start: { line: 3, column: 10 }, end: { line: 4, column: 11 } }
        },
        alternate: {
          type: 'BlockStatement',
          body: [
            {
              type: 'CallExpression',
              callee: {
                type: 'Identifier',
                name: 'prinit',
                loc: { start: { line: 6, column: 2 }, end: { line: 6, column: 8 } }
              },
              params: [
                {
                  type: 'NumberLiteral',
                  value: 3,
                  raw: '3',
                  loc: { start: { line: 6, column: 9 }, end: { line: 6, column: 10 } }
                }
              ],
              keywords: [],
              loc: { start: { line: 6, column: 2 }, end: { line: 6, column: 11 } }
            }
          ],
          loc: { start: { line: 5, column: 4 }, end: { line: 6, column: 11 } }
        },
        loc: { start: { line: 3, column: 0 }, end: { line: 6, column: 11 } }
      },
      loc: { start: { line: 1, column: 0 }, end: { line: 6, column: 11 } }
    }
  ]
}
