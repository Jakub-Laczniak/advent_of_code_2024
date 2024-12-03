import fs from 'fs';

const data = fs.readFileSync('data.txt', 'utf8');
let taskOneResult = 0;
let taskTwoResult = 0;

const parsedData = data.split('\n')
const leftColumn = [];
const rightColumn = [];

parsedData.forEach((idPair) => {
    const [firstCol, secondCol] = idPair.split('   ');
    leftColumn.push(Number(firstCol));
    rightColumn.push(Number(secondCol));
});

leftColumn.sort();
rightColumn.sort();

// ==========  task 1  ==========
leftColumn.forEach((id, index) => {
    if (id > rightColumn[index]) {
        taskOneResult = taskOneResult + (id - rightColumn[index]);
    } else {
        taskOneResult = taskOneResult + (rightColumn[index] - id);
    }
});

// ==========  task 2  ==========
leftColumn.forEach((id) => {
    const multiplier = rightColumn.filter(num => num === id).length;
    if (multiplier) {
        taskTwoResult = taskTwoResult + (id * multiplier);
    }
});

// ==========  write result  ==========
fs.writeFileSync('result.txt', `
    First task result: ${taskOneResult};
    Second task result: ${taskTwoResult};
`)
