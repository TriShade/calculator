function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    switch(operator) {
        case "add":
            return add(a, b);
            break;
        case "subtract":
            return subtract(a, b);
            break;
        case "multiply":
            return multiply(a, b);
            break;
        case "divide":
            return divide(a, b);
            break;
    }
}

function announce(string) {
    const display = document.querySelector('#display');      
    display.textContent = string;
}

function clearEverything() {
    numA = null;
    numB = null;
    operator = '';
    displayString = '';
    readyToOperate = false;
    announce(displayString);
}

function runEquals() {
    if(readyToOperate === true) {
        numB = Number(displayString);
        if(operator === 'divide' && numB === 0){
            alert("Nice try, bud");
            clearEverything();
        }
        else {
            displayString = operate(operator, numA, numB);
            announce(displayString);
            numA = Number(displayString);
            numB = null;
            operator = '';
        }
        readyToOperate = false;
    }
}

function runOperator(buttonID) {
    if (readyToOperate === true) {
        numB = Number(displayString);
        displayString = operate(operator, numA, numB);
        announce(displayString);
        operator = buttonID;
        numA = displayString;  
        readyToOperate = false;
        funcOperate = true;      
    }
    else {
        numA = Number(displayString);
        displayString = '';
        operator = buttonID;
    }
}

function addInput(buttonContent) {
    if(funcOperate === true) {
        displayString = '';
        funcOperate = false;
    }
    if(buttonContent === '←') {
        displayString = displayString.substr(0, displayString.length - 1);
        announce(displayString);
    }
    else if(!(buttonContent === "." && displayString.indexOf(".") > -1)) {
        if(buttonContent === '.' && displayString === '') {
            displayString += 0;
        }
        displayString += buttonContent; 
        announce(displayString); 
    }
}

let displayString = '';
let numA = null;
let numB = null;
let operator = '';
let readyToOperate = false;
let funcOperate = false;

const numContainer = document.querySelector('#numbers');
const numButtons = document.querySelectorAll('.numbtn');


numButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        addInput(button.textContent);
    });
});


const inputKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", '.'];
const funcKeys = ["+", '-', '/', '*'];


window.addEventListener('keydown', function (e) {
    if(inputKeys.includes(e.key)) {
        addInput(e.key);
    }
    else if(e.key === 'c') {
        clearEverything();
    }
    else if(e.key === 'Backspace') {
        displayString = displayString.substr(0, displayString.length - 1);
        announce(displayString);
    }
    else if(e.key === '=' || e.key === 'Enter') {
        if(!(numA === null) && !(displayString === '') && !(operator === '')) {
            readyToOperate = true;
        }
        runEquals();
    }
    else if(funcKeys.includes(e.key)) {
        if(!(numA === null) && !(displayString === '') && !(operator === '')) {
            readyToOperate = true;
        }
        switch (e.key) {
            case '+':
                runOperator('add');
                break;
            case '-':
                runOperator('subtract');
                break;
            case '/':
                runOperator('divide');
                break;
            case '*':
                runOperator('multiply');
                break;
        }
    }
  });

const funcContainer = document.querySelector('#functioncontainer');
const funcButtons = document.querySelectorAll('.funcbtn');
funcButtons.forEach((button) => {
  
    button.addEventListener('click', (e) => {
        if(!(numA === null) && !(displayString === '') && !(operator === '')) {
            readyToOperate = true;
        }
        switch(button.id) {
            case 'equals':
                runEquals();
                break;
            case 'clear':
                clearEverything();
                break;
            default:
                runOperator(button.id);
        }
    });
});

