const tokenizer = require('./tokenizer');
const parser = require('./parser');
const transformer = require('./transformer');
const codeGenerator = require('./codeGenerator');
const compiler = require('./compiler');

module.exports = {
    tokenizer,
    parser,
    transformer,
    codeGenerator,
    compiler,
}