import fs from 'fs';

const data = fs.readFileSync('data.txt', 'utf8');
let taskOneResult = 0;
let taskTwoResult = 0;

// ==========  task 1  ==========


// ==========  task 2  ==========


// ==========  write result  ==========
fs.writeFileSync('result.txt', `
    First task result: ${taskOneResult};
    Second task result: ${taskTwoResult};
`)
