const fs = require('node:fs');
function countWordOccurrences(grid, word) {
    const rows = grid.length;
    const cols = grid[0].length;
    const wordLength = word.length;
    let count = 0;

    // Directions: [rowOffset, colOffset]
    const directions = [
        [0, 1],    // Horizontal right
        [1, 0],    // Vertical down
        [1, 1],    // Diagonal down-right
        [1, -1],   // Diagonal down-left
        [0, -1],   // Horizontal left
        [-1, 0],   // Vertical up
        [-1, -1],  // Diagonal up-left
        [-1, 1],   // Diagonal up-right
    ];

    // Helper function to check a word in a specific direction
    const isWordInDirection = (row, col, rowDir, colDir) => {
        for (let i = 0; i < wordLength; i++) {
            const newRow = row + i * rowDir;
            const newCol = col + i * colDir;

            // Check boundaries and character match
            if (
                newRow < 0 || newRow >= rows || 
                newCol < 0 || newCol >= cols || 
                grid[newRow][newCol] !== word[i]
            ) {
                return false;
            }
        }
        return true;
    };

    // Traverse the grid
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            // Check in all directions
            for (const [rowDir, colDir] of directions) {
                if (isWordInDirection(row, col, rowDir, colDir)) {
                    count++;
                }
            }
        }
    }

    return count;
}

function countXMAS(grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    let count = 0;

    // Function to check if the diagonals form "MAS" around the center 'A'
    function isXMAS(row, col) {
        // Diagonal 1 (Top-left to Bottom-right)
        const topLeft = [row - 1, col - 1];
        const bottomRight = [row + 1, col + 1];

        // Diagonal 2 (Top-right to Bottom-left)
        const topRight = [row - 1, col + 1];
        const bottomLeft = [row + 1, col - 1];

        // Check boundaries and characters for Diagonal 1
        const isValidDiagonal1 =
            topLeft[0] >= 0 && topLeft[1] >= 0 && bottomRight[0] < rows && bottomRight[1] < cols &&
            grid[topLeft[0]][topLeft[1]] === 'M' &&
            grid[row][col] === 'A' &&
            grid[bottomRight[0]][bottomRight[1]] === 'S';

        // Check boundaries and characters for Diagonal 2
        const isValidDiagonal2 =
            topRight[0] >= 0 && topRight[1] < cols && bottomLeft[0] < rows && bottomLeft[1] >= 0 &&
            grid[topRight[0]][topRight[1]] === 'M' &&
            grid[row][col] === 'A' &&
            grid[bottomLeft[0]][bottomLeft[1]] === 'S';

        // Both diagonals must form "MAS"
        return isValidDiagonal1 && isValidDiagonal2;
    }

    // Traverse the grid to find all center 'A' and check for X-MAS
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (grid[row][col] === 'A' && isXMAS(row, col)) {
                count++;
            }
        }
    }

    return count;
}

// // Example usage:
// const grid = [
//     "MMMSXXMASM",
//     "MSAMXMSMSA",
//     "AMXSXMAAMM",
//     "MSAMASMSMX",
//     "XMASAMXAMM",
//     "XXAMMXXAMA",
//     "SMSMSASXSS",
//     "SAXAMASAAA",
//     "MAMMMXMMMM",
//     "MXMXAXMASX"
// ];

const grid = fs.readFileSync('input04.txt', {encoding: 'utf-8'}).split('\n');

const word = "XMAS";
console.log(countWordOccurrences(grid, word)); // Output: 18


console.log(countXMAS(grid));

// Dimensions of the grid
let numRows = grid.length;
let numCols = grid[0].length;

// Counter for X-MAS patterns
let count = 0;

// Possible "MAS" patterns (forwards and backwards)
const patterns = ['MAS', 'SAM'];

// Iterate over potential center cells
for (let i = 1; i < numRows - 1; i++) {
    for (let j = 1; j < numCols - 1; j++) {
        // Extract diagonals
        let diag1 = grid[i - 1][j - 1] + grid[i][j] + grid[i + 1][j + 1];
        let diag2 = grid[i - 1][j + 1] + grid[i][j] + grid[i + 1][j - 1];

        // Check if diagonals match "MAS" patterns
        let diag1Match = patterns.includes(diag1) || patterns.includes(diag1.split('').reverse().join(''));
        let diag2Match = patterns.includes(diag2) || patterns.includes(diag2.split('').reverse().join(''));

        // If both diagonals are valid "MAS" patterns, increment count
        if (diag1Match && diag2Match) {
            count++;
        }
    }
}

// Output the total count of X-MAS patterns
console.log(`Total X-MAS patterns found: ${count}`);
