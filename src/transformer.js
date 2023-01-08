
// 转化成新的语法树
function traverser(node, visitor) {

    function traverseArray(array, parent) {
        array.forEach(child => {
            traverseNode(child, parent);
        })
    }

    function traverseNode(node, parent) {
        const methods = visitor[node.type];
        if (methods && methods.enter) {
            methods.enter(node, parent);
        }

        switch (node.type) {
            case 'Program':
                traverseArray(node.body, node);
                break;
            case 'CallExpression':
                traverseArray(node.params, node);
                break;
            case 'NumberLiteral':
                break;
            default:
                throw new Error(node.type + 'undefined');
        }
    }
    traverseNode(node, null);
}

function transformer(ast) {
    const newAst = {
        type: 'Program',
        body: [],
    };

    ast._context = newAst.body;

    traverser(ast, {
        CallExpression: {
            enter(node, parent) {
                let expression = {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: node.name,
                    },
                    arguments: [],
                }
                node._context = expression.arguments;

                if (parent.type !== 'CallExpression') {
                    expression = {
                        type: 'ExpressionStatement',
                        expression,
                    }
                }
                parent._context.push(expression);
            }
        },
        NumberLiteral: {
            enter(node, parent) {
                parent._context.push({
                    type: 'NumberLiteral',
                    value: node.value,
                });
            }
        }
    });
    return newAst;

}

module.exports = transformer;