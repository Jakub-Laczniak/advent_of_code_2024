import fs from 'fs';

const data = fs.readFileSync('data.txt', 'utf8').split('\n');
const instructions = fs.readFileSync('instructions.txt', 'utf8').split('\n').map(str => str.split('|'));
let taskOneResult = 0;
let taskTwoResult = 0;

const findMiddleAndSumUp = (correctOrderArrays) => {
    let sum = 0;
    correctOrderArrays.forEach((arr) => {
        const middleIndex = Math.floor(arr.length / 2);
        sum += Number(arr[middleIndex]);
    })
    return sum;
};

// ==========  task 1  ==========
let pagesWithIncorrectOrder = [];
const pagesWithCorrectOrder = [];

data.forEach(pagesString => {
    let arePagesInCorrectOrder = true;
    const pages = pagesString.split(',');
    const pagesIndexer = pages.map((page, index) => ({ page, index }));

    for (let i = 0; i < instructions.length; i++) {
        const [leftInstr, rightInstr] = instructions[i];
        const leftValue = pagesIndexer.find(({ page }) => page === leftInstr);
        const rightValue = pagesIndexer.find(({ page }) => page === rightInstr);
        if (leftValue && rightValue) {
            if (leftValue.index > rightValue.index) {
                arePagesInCorrectOrder = false;
            };
        };
    };

    if (arePagesInCorrectOrder) {
        pagesWithCorrectOrder.push(pages);   
    } else {
        pagesWithIncorrectOrder.push(pages);   
    };
});
taskOneResult = findMiddleAndSumUp(pagesWithCorrectOrder);

// ==========  task 2  ==========
const sortedIncorrectPages = pagesWithIncorrectOrder.map(pages => {
    const sortedPages = Array(pages.length).fill('');

    pages.forEach((page) => {
        const pageData = { page, lowerThen: [] };

        for (let i = 0; i < instructions.length; i++) {
            const [leftInstr, rightInstr] = instructions[i];
            if (leftInstr === page) {
                pageData.lowerThen.push(rightInstr);
            }
        };

        let calculatedIndex = pages.length - 1;
        for (let i = 0; i < pages.length; i++) {
            if (pageData.lowerThen.includes(pages[pages.length - 1 - i])) {
                if (calculatedIndex > 0) {
                    calculatedIndex--
                }
            }
        };

        sortedPages[calculatedIndex] = page;
    });

    return sortedPages;
});

taskTwoResult = findMiddleAndSumUp(sortedIncorrectPages);

// ==========  write result  ==========
fs.writeFileSync('result.txt', `
    First task result: ${taskOneResult};
    Second task result: ${taskTwoResult};
`)
