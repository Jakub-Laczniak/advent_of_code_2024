import fs from 'fs';

const data = fs.readFileSync('data.txt', 'utf8');
let taskOneResult = 0;
let taskTwoResult = 0;

// ==========  task 1  ==========
const antenasRowsMap = data.split('\n');
const antenasLettersSet = new Set(data.replaceAll('.','').replaceAll('\n','').split(''));
const antenasLetters = Array.from(antenasLettersSet);
const mappedLetters = [];

antenasLetters.forEach((currLetter) => {
    let count = 0;
    antenasRowsMap.forEach((row) => {
        row.split('').forEach((cell) => {
            if (cell === currLetter) {
                count++
            }
        })
    })
    antenasRowsMap.forEach((row, rowIndex) => {
        row.split('').forEach((cell, colIndex) => {
            if (cell === currLetter) {
                mappedLetters.push({ value: currLetter, row: rowIndex, col: colIndex, count });
            }
        })
    })
});

const calculateDistance = ((let_1, let_2) => {
    return [let_1.row - let_2.row, let_1.col - let_2.col];
})

const antinodesMap = JSON.parse(JSON.stringify(antenasRowsMap)).map(row => row.split(''));

mappedLetters.forEach((letter, index) => {
    for (let i = 1; i <= letter.count; i ++) {
        const let_1 = letter;
        const let_2 = mappedLetters[index + i];
        if (let_1.value === let_2?.value) {
            const [rowDistance, colDistance] = calculateDistance(let_1, let_2);
            const rowLength = antinodesMap.length;
            if (
                let_1.row + rowDistance < rowLength && let_1.row + rowDistance >= 0 &&
                let_1.col + colDistance < rowLength && let_1.col + colDistance >= 0
            ) {
                const antinodesOneLocation = antinodesMap[let_1.row + rowDistance][let_1.col + colDistance];
                if (antinodesOneLocation !== '#') {
                    antinodesMap[let_1.row + rowDistance][let_1.col + colDistance] = '#'
                    taskOneResult++
                }
            }
            if (
                let_2.row - rowDistance < rowLength && let_2.row - rowDistance >= 0 &&
                let_2.col - colDistance < rowLength && let_2.col - colDistance >= 0
            ) {
                const antinodesTwoLocation = antinodesMap[let_2.row - rowDistance][let_2.col - colDistance];
                if (antinodesTwoLocation !== '#') {
                    antinodesMap[let_2.row - rowDistance][let_2.col - colDistance] = '#'
                    taskOneResult++
                }
            }
        }
    }
});

// ==========  task 2  ==========
const antinodesMap_2 = JSON.parse(JSON.stringify(antenasRowsMap)).map(row => row.split(''));

mappedLetters.forEach((letter, index) => {
    for (let i = 1; i <= letter.count; i ++) {
        const let_1 = letter;
        const let_2 = mappedLetters[index + i];

        if (let_1.value === let_2?.value) {
            const [rowDistance, colDistance] = calculateDistance(let_1, let_2);
            const rowLength = antinodesMap_2.length;

            let rowDistance_1 = rowDistance;
            let colDistance_1 = colDistance;
            let rowDistance_2 = rowDistance;
            let colDistance_2 = colDistance;

            while (
                let_1.row + rowDistance_1 < rowLength && let_1.row + rowDistance_1 >= 0 &&
                let_1.col + colDistance_1 < rowLength && let_1.col + colDistance_1 >= 0
            ) {
                const antinodesOneLocation = antinodesMap_2[let_1.row + rowDistance_1][let_1.col + colDistance_1];
                if (antinodesOneLocation === '.') {
                    antinodesMap_2[let_1.row + rowDistance_1][let_1.col + colDistance_1] = '#'
                }
                rowDistance_1+= rowDistance
                colDistance_1+= colDistance
            }
            
            while (
                let_2.row - rowDistance_2 < rowLength && let_2.row - rowDistance_2 >= 0 &&
                let_2.col - colDistance_2 < rowLength && let_2.col - colDistance_2 >= 0
            ) {
                const antinodesTwoLocation = antinodesMap_2[let_2.row - rowDistance_2][let_2.col - colDistance_2];
                if (antinodesTwoLocation === '.') {
                    antinodesMap_2[let_2.row - rowDistance_2][let_2.col - colDistance_2] = '#'
                }
                rowDistance_2+= rowDistance
                colDistance_2+= colDistance
            }
        }
    }
});

const antinodesMap_2_str = antinodesMap_2.map(i => i.join('')).join('');

for (let char of antinodesMap_2_str) {
  if (char !== '.') {
    taskTwoResult++;
  }
}

// ==========  write result  ==========
fs.writeFileSync('result.txt', `
    First task result: ${taskOneResult};
    Second task result: ${taskTwoResult};
`)
