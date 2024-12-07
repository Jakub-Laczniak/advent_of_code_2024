import fs from 'fs';

const data = fs.readFileSync('data.txt', 'utf8').split('\n');
let taskOneResult = 0;
let taskTwoResult = 0;

const equations = data.map(fullEqution => fullEqution.split(':'));

function generateCombinations(symbols, length) {
    const results = [];
    
    function backtrack(current) {
        if (current.length === length) {
            results.push(current.join(""));
            return;
        }
        for (const symbol of symbols) {
            current.push(symbol);
            backtrack(current);
            current.pop();
        }
    }
    
    backtrack([]);
    return results;
};

// ==========  task 1  ==========
const symbols = ["+", "*"];

equations.forEach(fullEquation => {
    const [sum, equation] = fullEquation;
    const parsedEquation = equation.slice(1).split(' ');
    const combinations = generateCombinations(symbols, parsedEquation.length - 1);
    let positive = false;

    for (let i = 0; i < combinations.length; i++) {
        const currCombination = combinations[i].split('')
        let currSum = 0;

        currCombination.forEach((sign, index) => {
            if (index === 0) {
                if (sign === '+') {
                    currSum = Number(parsedEquation[0]) + Number(parsedEquation[1])
                }
                if (sign === '*') {
                    currSum = Number(parsedEquation[0]) * Number(parsedEquation[1])
                }
            }
            if (index !== 0) {
                if (sign === '+') {
                    currSum = currSum + Number(parsedEquation[index + 1])
                }
                if (sign === '*') {
                    currSum = currSum * Number(parsedEquation[index + 1])
                }
            }
        })
        

        if (sum == currSum && !positive) {
            positive=true;
            taskOneResult+=currSum
        }
    };
})

// ==========  task 2  ==========
const symbols_2 = ["+", "*", "|"];

equations.forEach(fullEquation => {
    const [sum, equation] = fullEquation;
    const parsedEquation = equation.slice(1).split(' ');
    const combinations = generateCombinations(symbols_2, parsedEquation.length - 1);
    let positive = false;

    for (let i = 0; i < combinations.length; i++) {
        const currCombination = combinations[i].split('')
        let currSum = 0;

        currCombination.forEach((sign, index) => {
            if (index === 0) {
                if (sign === '+') {
                    currSum = Number(parsedEquation[0]) + Number(parsedEquation[1])
                }
                if (sign === '*') {
                    currSum = Number(parsedEquation[0]) * Number(parsedEquation[1])
                }
                if (sign === '|') {
                    currSum = parsedEquation[0] + parsedEquation[1];
                }
            }
            if (index !== 0) {
                if (sign === '+') {
                    currSum = Number(currSum) + Number(parsedEquation[index + 1])
                }
                if (sign === '*') {
                    currSum = Number(currSum) * Number(parsedEquation[index + 1])
                }
                if (sign === '|') {
                    currSum = Number(currSum) + parsedEquation[index + 1]
                }
            }
        })
        
        if (sum == currSum && !positive) {
            positive=true;
            taskTwoResult+=Number(currSum)
        }
    };
})

// ==========  write result  ==========
fs.writeFileSync('result.txt', `
    First task result: ${taskOneResult};
    Second task result: ${taskTwoResult};
`)
