

const punctuator = /\(|\)/;
const stringLiteral = /[a-zA-Z]/;
const numberLiteral = /[0-9]/;
const whiteSpace = /\s/;

function tokenizer(input) {

    const result = [];
    let current = 0;
    const len = input.length;

    while(current < len) {
        let char = input[current];
        if(punctuator.test(char)) {
            result.push({
                type: 'paren',
                value: char,
            });
            current++;
        } 
        
        if(whiteSpace.test(char)) {
            current++;
            continue;
        }

        if(stringLiteral.test(char)) {
            let value = '';
            while(stringLiteral.test(char) && char) {
                value += char;
                char = input[++current];
            }
            result.push({
                type: 'name',
                value,
            });

            continue;
        } 

        if(numberLiteral.test(char)) {
            let number = '';
            while(numberLiteral.test(char) && char) {
                number += char;
                char = input[++current];
            }
            result.push({
                type: 'number',
                value: number,
            });
            continue;
        }

    }

    return result;
   
}

module.exports = tokenizer;