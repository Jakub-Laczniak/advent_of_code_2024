import fs from 'fs';

const data = fs.readFileSync('data.txt', 'utf8').split('\n').map(row => row.split(''));
let taskTwoResult = 0;

// ==========  task 2  ==========
let labMap = data;
let roundEnd = false;
let currentGuardIcon = 0;
let gp = [0, 0];

const rowLength = labMap[0].length;
const colLength = labMap.length;
const guardIcon = ['^' ,'>' , 'v', '<'];


const findGuardPosition = () => {
    labMap.forEach((row, rowIndex) => {
        if (row.includes(guardIcon[currentGuardIcon])) {
            row.forEach((column, columnIndex) => {
                if (column === guardIcon[currentGuardIcon]) {
                    gp = [rowIndex, columnIndex];
                }
            })
        }
    });
};

const moveGuard = () => {
    findGuardPosition();
    labMap[gp[0]][gp[1]] = 'X';
    if (guardIcon[currentGuardIcon] === '>') {
        if (gp[1] + 1 < rowLength) {
            if (labMap[gp[0]][gp[1] + 1] !== '#') {
                labMap[gp[0]][gp[1] + 1] = '>';
                labMap[gp[0]][gp[1]] = 'X';
            } else {
                currentGuardIcon = 2;
            }
        } else {
            roundEnd = true;
        }
    } else if (guardIcon[currentGuardIcon] === 'v') {
        if (gp[0] + 1 < colLength) {
            if (labMap[gp[0] + 1][gp[1]] !== '#') {
                labMap[gp[0]+ 1][gp[1]] = 'v';
                labMap[gp[0]][gp[1]] = 'X';
            } else {
                currentGuardIcon = 3;
            }
        } else {
            roundEnd = true;
        }
    } else if (guardIcon[currentGuardIcon] === '<') {
        if (gp[1] - 1 >= 0) {
            if (labMap[gp[0]][gp[1] - 1] !== '#') {
                labMap[gp[0]][gp[1] -1 ] = '<';
                labMap[gp[0]][gp[1]] = 'X';
            } else {
                currentGuardIcon = 0;
            }
        } else {
            roundEnd = true;
        }
    } else if (guardIcon[currentGuardIcon] === '^') {
        if (gp[0] - 1  >= 0) {
            if (labMap[gp[0] - 1][gp[1]] !== '#') {
                labMap[gp[0] - 1][gp[1]] = '^';
                labMap[gp[0]][gp[1]] = 'X';
            } else {
                currentGuardIcon = 1;
            }
        } else {
            roundEnd = true;
        }
    }
};

const tables = [];
const createTable = (i, j) => {
    const currTable = JSON.parse(JSON.stringify(data));
    if (currTable[i][j] === '#' || currTable[i][j] === '^') {
        return;
    } else {
        currTable[i][j] = '#';
    }
    tables.push(currTable);
};

for (let i = 0; i < rowLength; i ++) {
    for (let j = 0; j < colLength; j++) {
        createTable(i, j)
    }
};

for (let i = 0; i < tables.length; i++) {
    labMap = JSON.parse(JSON.stringify(tables[i]));
    roundEnd = false;
    currentGuardIcon = 0;
    gp = [0, 0];   
    
    for (let j=0; j < 10000; j++) {
        moveGuard();
        if (roundEnd) {
            break;
        }
    };

    if (!roundEnd) {
        taskTwoResult++;
    }
};

// ==========  write result  ==========
fs.writeFileSync('result_task2.txt', `Second task result: ${taskTwoResult}`)


