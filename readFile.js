const fs = require('fs');
const path = require('path');

function readInput(fileName) {
    const filePath = path.join(__dirname, fileName);
    const lines = fs.readFileSync(filePath, {encoding: 'utf-8'}).split('\n');
    return  lines.map(line => line.split(/\s+/).map(Number));
}

module.exports = readInput;