/*
    Flow of code:
    1. Click digit, populate a with this value and push it to the output text
    2. Click desired operator, populate operator with this value
    3. Click second digit, populate b with this value and push it to the output text
    4. Regardless of whether the user clicks '=' or another operator, the next
    button push needs to calculate the expression typed in so far and set the 
    output text to the result.
    5. Keep looping until they hit the '=', then reset the calculator (not the output text)
    setting a, b, result, and operator back to default values.
*/

'use strict'

function processDigitButtonEvent(digitButton) {
    let currentDigit = digitButton.dataset.value;
    currentNumberString += currentDigit;
    displayToScreen(currentNumberString);
}

// Process the operation
// This is operate() im just not calling it that so it matches the pattern of the above function's name
function processOperatorButtonEvent(currentOperatorButton) {

    // Handle 'C' first so that it doesn't get cached and you can avoid doing all the below logic if
    // the user just wants to clear the calculator
    let currentOperatorValue = currentOperatorButton.dataset.value.toString();
    if (currentOperatorValue == "C") {
        a = b = c = cachedOperator = undefined;
        result = 0;
        currentNumberString = "";
        displayToScreen("0");
        return;
    }

    // Regardless of the operator, numberString needs to be passed to a, b, or c
    updateNumbers();

    // If this is the first operation, all it needs to do is cache it then move on
    if (cachedOperator == undefined) {
        cachedOperator = currentOperatorButton.dataset.value.toString();
        console.log(`CACHING ${cachedOperator}`);
        return;
    }
    
    // If an operator HAS been cached then it is time to perform a calculation using it (for now disregarding the operator
    // the user has clicked on currently)
    switch (cachedOperator) {
        case "+":
            result = (result == 0? a + b : result + c);
            break;
        case "-":
            result = (result == 0? a - b : result - c);
            break;
        case "X":
            result = (result == 0? a * b : result * c);
            break;
        case "÷":
            result = (result == 0? a / b : result / c);
            break;
    }

    // Now, get the operator the user clicked on this time and determine whether or not we should end the
    // expression. If so (i.e. operator is '='), then display the final result and reset the calculator to it's default state
    // If the user clicks any other operator (other than clear), then it shoudl merely cache the result so it can be used
    // in the next operation.
    if (currentOperatorValue == "=") {
        cachedOperator = undefined;
        currentNumberString = "";
        displayToScreen(result);
        //result = 0;
        return;
    }
    else
    {
        cachedOperator = currentOperatorValue;
        updateNumbers();
    }
    displayToScreen(result);
}

function displayToScreen(value) {
    outputText.textContent = value.toString();
}

// This function will handle the passing of the typed string to the internal variables used for calculations
function updateNumbers() {
    if (a == undefined)      a = parseFloat(currentNumberString);
    else if (b == undefined) b = parseFloat(currentNumberString);
    else                     c = parseFloat(currentNumberString);

    currentNumberString = "";
}

// 'a' and 'b' are the first two digits in the expression, 'c' is a placeholder for all extra values that 
// are entered afterwards and if used to operate on result - which is obtained after the operation between a and b are calculated
let a = undefined;
let b = undefined;
let c = undefined;
let result = 0;
let cachedOperator = undefined;

// Variable that will be used to build the number that will eventually be passed to a, b, or c. It allows me to
// type in any n-length number to the calculator.
let currentNumberString = "";

const outputText = document.querySelector("#output-text");

const digits = document.querySelectorAll(".digit");
const operators = document.querySelectorAll(".operator");

digits.forEach(digitButton => {
    digitButton.addEventListener("click", (e) => {
        processDigitButtonEvent(e.target);
    });
});

operators.forEach(operatorbutton => {
    operatorbutton.addEventListener("click", (e) => {
        processOperatorButtonEvent(e.target);
    });
});


