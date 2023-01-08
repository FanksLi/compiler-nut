
// 将ast解析成字符串
function codeGenerator(node) {

    const type = node.type;
    switch (type) {
        case 'Program':
            return node.body.map(codeGenerator).join('\n');
        case 'ExpressionStatement':
            return codeGenerator(node.expression) + ';';
        case 'CallExpression':
            return codeGenerator(node.callee) + "(" + node.arguments.map(codeGenerator).join(', ') + ")";
        case 'Identifier':
            return node.name;
        case 'NumberLiteral':
            return node.value;
        default:
             throw new Error(node.type, 'undefined');

    }
}

module.exports = codeGenerator;