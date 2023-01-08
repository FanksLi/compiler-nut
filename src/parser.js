
// 生成ast语法树
function parser(tokens) {
    const ast = {
        type: 'Program',
        body: [],
    }

    let current = 0;

    function walk() {   
        let token = tokens[current];

        if(token.type === 'number') {
            current++;
            return {
                type: 'NumberLiteral',
                value: token.value,
            }
        }

        if(token.type === 'paren' && token.value === '(') {
            token = tokens[++current];
            const expression = {
                type: 'CallExpression',
                name: token.value,
                params: [],
            }

            token = tokens[++current];

            while(token.type !== 'paren' || token.type === 'paren' && token.value !== ')') {
                expression.params.push(walk());
                token = tokens[current];
            }
            
            return expression;
        }
    }

    ast.body.push(walk());

    return ast;
}
module.exports = parser;