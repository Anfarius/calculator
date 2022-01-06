// function which adds two numbers

function add(num1, num2) {
    return Number(num1) + Number(num2);
}

// function which subtracts one number from another

function subtract(num1, num2) {
    return num1 - num2;
}

// function which multiplies two numbers

function multiply(num1, num2) {
    return num1 * num2;
}

// function which divides one number by another

function divide(num1, num2) {
    return num1 / num2;
}

// function which calls the above operator functions based on operator parameter

function operator(operator, num1, num2) {
    if (operator === "add") {
        return add(num1, num2);
    } else if (operator === "subtract") {
        return subtract(num1, num2);
    } else if (operator === "multiply") {
        return multiply(num1, num2);
    } else if (operator === "divide") {
        return divide(num1, num2);
    }
}

// get html elements

const displayText = document.querySelector("#display-text")

// initialize operation variables

let operatorName = "";
let num1 = 0;
let num2 = 0;

// add listener events to buttons

// listener for the number buttons

const numberButtons = document.querySelectorAll('[data-type="number"]');
numberButtons.forEach(
    function(button) {
        button.addEventListener("click", showOnDisplay)
    }
);

// listener for the backspace button

const backspaceBtn = document.querySelector('[data-type="backspace"]');
backspaceBtn.addEventListener("click", backspace);

// listener for the clear button

const clearBtn = document.querySelector('[data-type="clear"]');
clearBtn.addEventListener("click", clearDisplay);

// listener for the operations buttons

const operationButtons = document.querySelectorAll('[data-type="operation"]');
operationButtons.forEach(
    function(button) {
        button.addEventListener("click", assignOperator)
    }
);

// listener for the equal button

const equalBtn = document.querySelector('[data-type="equal"]');
equalBtn.addEventListener("click", fireOperation);

// listener for the decimal button

const decimalBtn = document.querySelector('[data-type="decimal"]');
decimalBtn.addEventListener("click", addDecimal);

// listener for the button changing plus and minus

const signBtn = document.querySelector('[data-type="minus"]');
signBtn.addEventListener("click", changeSign);

// function for the sign button

function changeSign() {
    let currentString = displayText.textContent;
    const minus = "-";
    if (Number(currentString) < 0) {
        displayText.textContent = currentString.substring(1);
    } else {
        displayText.textContent = minus.concat(currentString);
    }
}

// decimal function

function addDecimal() {
    let currentString = displayText.textContent;
    if (currentString.includes(".")) {
        return;
    } else {
        displayText.textContent += ".";
    }
}

// function which adds numbers to the display

function showOnDisplay() {
    const value = this.dataset.value;
    displayText.textContent += value;
}

// function which clears the display after pressing the clear button

function clearDisplay() {
    displayText.textContent = "";
    operatorName = "";
    num1 = 0;
    num2 = 0;
}

function clearDisplayNumber() {
    displayText.textContent = "";
    numberButtons.forEach(
        function(button) {
            button.removeEventListener("click", clearDisplayNumber); 
        }
    )
}

// function which removes the last character from the display after pressing the
// backspace button

function backspace() {
    displayText.textContent = displayText.textContent.slice(0, -1);
}

// function which assigns the value of the operator button to the operatorName
// variable for further usage in the calculation, also assignes the current
// value of the display field to the num1 and clears the display

function assignOperator() {
    if (operatorName !== "") {
        fireOperation();
        operatorName = this.dataset.value;
        num1 = displayText.textContent;
        clearDisplayNewNumbers();
    } else {
        operatorName = this.dataset.value;
        num1 = displayText.textContent;
        displayText.textContent = "";
    }
}

// function which fires the calculation after pressing the equal button, also
// assigns the display field value to num2 before firing the operator

function fireOperation() {
    if (operatorName === "") {
        alert("Please choose an operation.");
        return;
    }
    num2 = displayText.textContent;
    if (operatorName === "divide" && num2 === "0") {
        alert("You tried dividing by zero! Don't do that.");
        clearDisplay();
        return;
    }
    displayText.textContent = Math.round(operator(operatorName, num1, num2) * 
                                100000) / 100000;
    operatorName = "";
    clearDisplayNewNumbers();
}

// function which handles the clearing of text on the display when using
// operation buttons in sequenced operations

function clearDisplayNewNumbers() {
    numberButtons.forEach(
        function(button) {
            button.removeEventListener("click", showOnDisplay);
            button.addEventListener("click", clearDisplayNumber, {once: true});
            button.addEventListener("click", showOnDisplay);
        }
    )
}

// keyboard support

document.onkeydown = keyPressed;

numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

function keyPressed(e) {
    if (numbers.includes(e.key)) {
        displayText.textContent += e.key;
    } else if (e.key === "Backspace") {
        backspace();
    } else if (e.key === ".") {
        addDecimal();
    }
}