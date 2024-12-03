import fs from 'fs';

const data = fs.readFileSync('data.txt', 'utf8');
let taskOneResult = 0;
let taskTwoResult = 0;

const parsedData = data.split('\n').map(arr => arr.split(' ').map(id => Number(id)));

// ==========  task 1  ==========
const checkIfSafe = (arr) => {
    let isSafe = true;
    let asc = false;
    let desc = false;

    arr.forEach((num, index) => {
        if ((num - arr[index + 1]) > 3) {
            isSafe = false;
        } else if ((arr[index + 1] - num) > 3) {
            isSafe = false;
        } else if (num === arr[index + 1]) {
            isSafe = false;
        };
        
        if (num > arr[index + 1] && (num - arr[index + 1]) <= 3) {
            if (!desc) {
                asc = true;
            } else {
                isSafe = false;
            }
        } else if (num < arr[index + 1] && (arr[index + 1] - num) <= 3) {
            if (!asc) {
                desc = true;
            } else {
                isSafe = false;
            }
        }
    });
    if (isSafe) {
        return isSafe;
    }
};

parsedData.forEach((arr) => {
    const isSafe = checkIfSafe(arr);
    if (isSafe) {
        taskOneResult++;
    } 
});

// ==========  task 2  ==========
const doubleCheckIfSafe = (arr) => {
    let isSafe = checkIfSafe(arr);

    if (isSafe) {
        return isSafe;
    };

    for (let i = 0; i <= arr.length - 1; i++) {
        const newArr = [...arr.slice(0, i), ...arr.slice(i + 1)];
        isSafe = checkIfSafe(newArr);

        if (isSafe) {
            return isSafe;
        };
    };
    return isSafe;
};

parsedData.forEach((arr) => {
    const isSafe = doubleCheckIfSafe(arr);
    if (isSafe) {
        taskTwoResult++;
    } 
});

// ==========  write result  ==========
fs.writeFileSync('result.txt', `
    First task result: ${taskOneResult};
    Second task result: ${taskTwoResult};
`)
