import fs from 'fs';

const data = fs.readFileSync('data.txt', 'utf8').split('\n').map(row => row.split(''));
let taskOneResult = 0;

// ==========  task 1  ==========
const labMap = data;
const rowLength = labMap[0].length;
const colLength = labMap.length;
let roundEnd = false;

const guardIcon = ['^' ,'>' , 'v', '<'];
let currentGuardIcon = 0;
// gp === guard position
let gp = [0, 0];

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

while (!roundEnd) {
    moveGuard();
}

const mapAsString = labMap.join('\n').replaceAll('\n', '').replaceAll(',', '');

for (let i = 0; i < mapAsString.length; i++) {
    if (mapAsString[i] === 'X') {
        taskOneResult++
    }
}


// ==========  write result  ==========
fs.writeFileSync('result_task1.txt', `First task result: ${taskOneResult}`);
