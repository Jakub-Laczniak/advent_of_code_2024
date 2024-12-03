import fs from 'fs';

const data = fs.readFileSync('data.txt', 'utf8');
let taskOneResult = 0;
let taskTwoResult = 0;

const findMulRegex = /mul\(\s*(-?\d+(\.\d+)?)\s*,\s*(-?\d+(\.\d+)?)\s*\)/g
const mul = (a, b) => a * b;

// ==========  task 1  ==========
const allMulFunctions = data.match(findMulRegex) ?? [];

allMulFunctions.forEach(mulFn => {
    const result = eval(mulFn);
    taskOneResult += result;
});


// ==========  task 2  ==========
const dontRegex = new RegExp(/don't/, 'g'); 
const doRegex = new RegExp(/\bdo\b(?!n't)/g, 'g'); 

const dontIndexes = [];
let dontMatch;

const doIndexes = [];
let doMatch;

while ((dontMatch = dontRegex.exec(data)) !== null) {
    dontIndexes.push(dontMatch.index);
}

while ((doMatch = doRegex.exec(data)) !== null) {
    doIndexes.push(doMatch.index); 
}

const stringsToDelete = [];

dontIndexes.forEach((index) => {
    // Find first 'Do' index with higher value than curr don't index
    const firstDoIndex = doIndexes.find(doIndex => doIndex > index);
    // Push whole string that needs to be deleted 
    stringsToDelete.push(data.slice(index, firstDoIndex))
})

let purgedString = data;
stringsToDelete.forEach(stringToReplace => {
    purgedString = purgedString.replace(stringToReplace, '');
});

const allPurgedMullFunctions = purgedString.match(findMulRegex);

allPurgedMullFunctions.forEach(func => {
    const result = eval(func);
    taskTwoResult += result;
})

// ==========  write result  ==========
fs.writeFileSync('result.txt', `
    First task result: ${taskOneResult};
    Second task result: ${taskTwoResult};
`)
