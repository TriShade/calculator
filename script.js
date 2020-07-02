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

function checkMultipleDecimals(string) {
    if(string.indexOf('.') === -1) {
        return false;
    }
    let position = string.indexOf('.') + 1;
    let possible = string.indexOf('.', position);
    if(possible > -1) {
        return true;
    }
    else {
        return false;
    }
}

let displayString = '';
let numA = null;
let numB = null;
let operator = '';
let readyToOperate = false;
let funcOperate = false;

const numContainer = document.querySelector('#numbers');
const numButtons = numContainer.querySelectorAll('button');


numButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        if(funcOperate === true) {
            displayString = '';
            funcOperate = false;
        }
        if(!(button.textContent === "." && displayString.indexOf(".") > -1)) {
            if(button.textContent === '.' && displayString === '') {
                displayString += 0;
            }
            displayString += button.textContent; 
            announce(displayString); 
        }
    });
});

const funcContainer = document.querySelector('#functioncontainer');
const funcButtons = funcContainer.querySelectorAll('button');
funcButtons.forEach((button) => {
  
    // and for each one we add a 'click' listener
    button.addEventListener('click', (e) => {
        if(!(numA === null) && !(displayString === '')) {
            readyToOperate = true;
        }
        switch(button.id) {
            case 'equals':
                if(readyToOperate === true) {
                    numB = Number(displayString);
                    if(operator === 'divide' && numB === 0){
                        alert("Nice try, bud");
                        numA = null;
                        numB = null;
                        operator = '';
                        displayString = '';
                        readyToOperate = false;
                        announce(displayString);
                    }
                    else {
                        displayString = operate(operator, numA, numB);
                        announce(displayString);
                    }
                    readyToOperate = false;
                }
                break;
            case 'clear':
                numA = null;
                numB = null;
                operator = '';
                displayString = '';
                readyToOperate = false;
                announce(displayString);
                break;
            default:
                if (readyToOperate === true) {
                    numB = Number(displayString);
                    displayString = operate(operator, numA, numB);
                    announce(displayString);
                    operator = button.id;
                    numA = displayString;  
                    readyToOperate = false;
                    funcOperate = true;      
                }
                else {
                    numA = Number(displayString);
                    displayString = '';
                    operator = button.id;
                }
        }
    });
});