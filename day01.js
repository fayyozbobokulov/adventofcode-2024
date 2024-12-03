const readInput = require('./readFile');

function calculateDistance(left, right) {
    left.sort((a,b) => a-b);
    right.sort((a,b) => a-b);

    return left.reduce((sum, current, i) => sum + Math.abs(current - right[i]), 0);
}

function parseToHash(input) {
    const hash = {};

    for(const item of input) {
        if(hash[item]){
            hash[item]++
        } else {
            hash[item] = 1
        }
    }

    return hash;
}

function calculateSimilarity(left, rightHash) {
    return left.reduce((sum, current) => sum + (rightHash[current] || 0)*current, 0);
}

function main() {
    const input = readInput('input01.txt');
    const left = input.map(pair => pair[0]);
    const right = input.map(pair => pair[1]);

    const hashRight = parseToHash(right);

    const totalDistance = calculateDistance(left, right);
    console.log('Total Distance', totalDistance);
    const totalSimilarity = calculateSimilarity(left, hashRight)
    console.log('Similarity Score:', totalSimilarity)
}

main()