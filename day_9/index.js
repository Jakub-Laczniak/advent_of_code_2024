import fs from 'fs';

const data = fs.readFileSync('data.txt', 'utf8');
let taskOneResult = 0;
let taskTwoResult = 0;

// ==========  task 1  ==========
let fileSystem = [];
let currID = 0;

for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < parseInt(data[i]); j++) {
        fileSystem.push((i % 2 === 0) ? String(currID) : '.');
    }
    if (i % 2 === 0) {
        currID++
    }
};

for (let i = fileSystem.length - 1; i >= 0; i--) {
    if (fileSystem.indexOf('.') > i) {
        break;
    }
    if (fileSystem[i] !== '.') {
        fileSystem[fileSystem.indexOf('.')] = fileSystem[i];
        fileSystem[i] = '.';
    }
};

for (let i = 0; i < fileSystem.length; i++) {
    if (isNaN(Number(fileSystem[i]))) break;
    taskOneResult+= i * Number(fileSystem[i]);
};

// ==========  write result  ==========
fs.writeFileSync('result.txt', `
    First task result: ${taskOneResult};
    Second task result: ${taskTwoResult};
`)
