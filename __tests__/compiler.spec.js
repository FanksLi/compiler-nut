
const {
    tokenizer,
    parser,
    transformer,
    codeGenerator,
    compiler,
  } = require('../src/index');
  
  const input  = '(add 2 (subtract 4 2))';
  const output = 'add(2, subtract(4, 2));';
  
  const tokens = [
    { type: 'paren',  value: '('        },
    { type: 'name',   value: 'add'      },
    { type: 'number', value: '2'        },
    { type: 'paren',  value: '('        },
    { type: 'name',   value: 'subtract' },
    { type: 'number', value: '4'        },
    { type: 'number', value: '2'        },
    { type: 'paren',  value: ')'        },
    { type: 'paren',  value: ')'        }
  ];
  
  const ast = {
    type: 'Program',
    body: [{
      type: 'CallExpression',
      name: 'add',
      params: [{
        type: 'NumberLiteral',
        value: '2'
      }, {
        type: 'CallExpression',
        name: 'subtract',
        params: [{
          type: 'NumberLiteral',
          value: '4'
        }, {
          type: 'NumberLiteral',
          value: '2'
        }]
      }]
    }]
  };
  
  const newAst = {
    type: 'Program',
    body: [{
      type: 'ExpressionStatement',
      expression: {
        type: 'CallExpression',
        callee: {
          type: 'Identifier',
          name: 'add'
        },
        arguments: [{
          type: 'NumberLiteral',
          value: '2'
        }, {
          type: 'CallExpression',
          callee: {
            type: 'Identifier',
            name: 'subtract'
          },
          arguments: [{
            type: 'NumberLiteral',
            value: '4'
          }, {
            type: 'NumberLiteral',
            value: '2'
          }]
        }]
      }
    }]
  };
describe('compiler Test', () => {
    it('tokenizer', () => {
        const t = tokenizer(input);
        expect(t).toEqual(tokens);;
    })

    it('parser', () => {
      const tokens = tokenizer(input);
      const a = parser(tokens);
      expect(a).toEqual(ast);
    })

    it('transformer', () => {
      const newA = transformer(ast);
      expect(newA).toEqual(newAst);
    })
    it('codeGenerator', () => {
      const out = codeGenerator(newAst);
      expect(out).toEqual(output);
    })

    it('compiler', () => {
      const out = compiler(input);
      expect(out).toEqual(output);
    })
    
})