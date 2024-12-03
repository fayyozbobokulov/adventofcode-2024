const {readFileSync} = require('node:fs');
const input = readFileSync('input03.txt', 'utf-8');
// const input = "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))"
function extractMuls(input) {
    const matches = Array.from(input.matchAll(/mul\((\d+),(\d+)\)|(do\(\))|(don\'t\(\))/g));
    console.log(matches);
    let skip = false;
    return matches.map(match => {
        if(match[0] === 'do()') skip=false;
        if(match[0] === "don't()") skip = true;

        if(!skip && parseInt(match[1]) && parseInt(match[2])) {
            const num1 = parseInt(match[1]);
            const num2 = parseInt(match[2]);
            return num1 * num2;
        } else {
            return 0;
        }
    });
}

// Get all multiplication results
const results = extractMuls(input);
console.log("RESULT: ", results);

console.log('Multiplication results:', results.reduce((sum, item) => sum+item, 0));