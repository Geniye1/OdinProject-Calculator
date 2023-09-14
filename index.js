function operate(currentOperator) {
    // If result is not zero then that means we are in the middle of an expression and should use result as
    // the first term in the calculation instead of num1 so the expression can be calculated for as long
    // as the user needs
    switch (cachedOperator) {
        case "+":
            result = (result == 0? num1 + num2 : result + num2);
            break;
        case "-":
            result = (result == 0? num1 - num2 : result - num2);
            break;
        case "X":
            result = (result == 0? num1 * num2 : result * num2);
            break;
        case "÷":
            result = (result == 0? num1 / num2 : result / num2);
            break;
    }

    // End of expression, reset calculator
    if (currentOperator === "=") {
        num1 = undefined;
        num2 = undefined;
        cachedOperator = undefined;
        
        // Display result, then reset it 
        displayResult(result);
        result = 0;
    }
    else {
        // Reset num2 and cache the operator the user clicked so that the code can cycle back and continue receiving inputs
        num2 = undefined;
        cachedOperator = currentOperator;
        displayResult(result);
    }
}

function displayResult(a) {
    outputText.textContent = a;
}

const outputText = document.querySelector("#output-text");

let num1 = undefined;
let num2 = undefined;
let result = 0;
let cachedOperator = undefined;

// The buttons wait for the num2 to become defined, upon which it will call operate() then reset num2 until = is hit
const buttons = document.querySelectorAll(".calculator-button");
buttons.forEach(button => {
    button.addEventListener("click", function() {
        // Attempt to parse the data-value to an int, if it is successfully parsed
        // then it is a digit. Otherwise, it is an operator.
        let parsedDataValue = parseInt(button.dataset.value);
        if (!isNaN(parsedDataValue)) {
            if (num1 == undefined) {
                num1 = parsedDataValue;
            }
            else if (num2 == undefined) {
                num2 = parsedDataValue;
            }
            displayResult(parsedDataValue);
        } 
        else {
            if (num2 == undefined) {
                cachedOperator = button.dataset.value.toString();
            } 
            else {
                operate(button.dataset.value.toString());
            }
        }
    })
});

/*
    Flow of code:
    1. Click digit, populate num1 with this value and push it to the output text
    2. Click desired operator, populate operator with this value
    3. Click second digit, populate num2 with this value and push it to the output text
    4. Regardless of whether the user clicks '=' or another operator, the next
    button push needs to calculate the expression typed in so far and set the 
    output text to the result.
    5. Keep looping until they hit the '=', then reset the calculator (not the output text)
    setting num1, num2, result, and operator back to default values.
*/