const tokenizer = require('./tokenizer');
const parser = require('./parser');
const transformer = require('./transformer');
const codeGenerator = require('./codeGenerator');


// 编译
function compiler(input) {
    let output;
    const tokens = tokenizer(input);
    const ast = parser(tokens);
    const newAst = transformer(ast);
    output = codeGenerator(newAst);


    return output;
}

module.exports = compiler;