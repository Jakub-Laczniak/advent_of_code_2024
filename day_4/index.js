import fs from 'fs';

const data = fs.readFileSync('data.txt', 'utf8');
let taskOneResult = 0;
let taskTwoResult = 0;

const XMAS = 'XMAS';
// ==========  task 1  ==========
const grid = data.split('\n').map(row => row.split(''));

const findWordInGrid = (grid, word) => {
    const rows = grid.length;
    const cols = grid[0].length;
    const wordLength = word.length;
    const directions = [
        { r: 0, c: 1 },   // Right
        { r: 0, c: -1 },  // Left
        { r: 1, c: 0 },   // Down
        { r: -1, c: 0 },  // Up
        { r: 1, c: 1 },   // Down-Right (Diagonal)
        { r: -1, c: -1 }, // Up-Left (Diagonal)
        { r: 1, c: -1 },  // Down-Left (Diagonal)
        { r: -1, c: 1 },  // Up-Right (Diagonal)
    ];

    const findWord = (r, c, dr, dc) => {
        let found = true;
        for (let i = 0; i < wordLength; i++) {
            const newRow = r + i * dr;
            const newCol = c + i * dc;
            if (
                newRow < 0 || newRow >= rows || 
                newCol < 0 || newCol >= cols || 
                grid[newRow][newCol] !== word[i]
            ) {
                found = false;
                break;
            }
        }
        return found;
    };

    const results = [];

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            for (let { r: dr, c: dc } of directions) {
                if (findWord(r, c, dr, dc)) {
                    results.push({ start: [r, c], direction: { r: dr, c: dc } });
                }
            }
        }
    }

    return results;
};

taskOneResult = findWordInGrid(grid, XMAS).length;

// ==========  task 2  ==========
function findAllIndexesOfA(str) {
    const indexes = [];
    for (let i = 0; i < str.length; i++) {
        if (str[i] === 'A') {
            indexes.push(i);
        }
    }
    return indexes;
}
const indexesOfA = findAllIndexesOfA(data);

const checkIfItsXMass = (index) => {
    let itsXMass = false;
    if (data[index - 142] === 'M' && data[index + 142] === 'S') {
        if (data[index - 140] === 'M' && data[index + 140] === 'S') {
            itsXMass = true;
        }
        if (data[index - 140] === 'S' && data[index + 140] === 'M') {
            itsXMass = true;
        }
    } else if (data[index - 142] === 'S' && data[index + 142] === 'M') {
        if (data[index - 140] === 'M' && data[index + 140] === 'S') {
            itsXMass = true;
        }
        if (data[index - 140] === 'S' && data[index + 140] === 'M') {
            itsXMass = true;
        }
    }
    return itsXMass;
};

indexesOfA.forEach(index => {
    const isXmassYet = checkIfItsXMass(index);
    if (isXmassYet) {
        taskTwoResult++
    }
});

// ==========  write result  ==========
fs.writeFileSync('result.txt', `
    First task result: ${taskOneResult};
    Second task result: ${taskTwoResult};
`)
