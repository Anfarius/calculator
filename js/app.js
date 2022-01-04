// function which adds two numbers

function add(num1, num2) {
    return num1 + num2;
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

const buttons = document.querySelectorAll("button");
const displayText = document.querySelector("#display-text")

// initialize operation variables

let operatorName = "";
let num1 = 0;
let num2 = 0;

// add listener event to all buttons

buttons.forEach(
    function(button) {
        button.addEventListener("click", clicked);
    }
)

// function called after pressing a button

function clicked() {
    const btnType = this.dataset.type;
    if (btnType === "number") {
        const btnValue = this.dataset.value;
        showOnDisplay(btnValue);
    } else if (btnType === "clear") {
        clearDisplay();
    } else if (btnType === "backspace") {
        backspace();
    } 
}

// function which adds numbers to the display

function showOnDisplay(value) {
    displayText.textContent += value;
}

// function which clears the display after pressing the clear button

function clearDisplay() {
    displayText.textContent = "";
}

// function which removes the last character from the display after pressing the
// backspace button

function backspace() {
    displayText.textContent = displayText.textContent.slice(0, -1);
}