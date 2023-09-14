function operate() {
    switch (operator) {
        case "+":
            result = num1 + num2;
            break;
    }
}

function displayResult(a) {
    outputText.textContent = a;
}

const outputText = document.querySelector("#output-text");

let num1 = undefined;
let num2 = undefined;
let result = 0;
let operator = undefined;

const buttons = document.querySelectorAll(".calculator-button");
buttons.forEach(button => {
    button.addEventListener("click", function() {
        // Attempt to parse the data-value to an int, if it is successfully parsed
        // then it is a digit. Otherwise, it is an operator.
        let parsedDataValue = parseInt(button.dataset.value);
        if (!isNaN(parsedDataValue)) {
            if (num1 == undefined && num2 == undefined) {
                num1 = parsedDataValue;
            }
            else {
                num2 = parsedDataValue;
            }
            displayResult(parsedDataValue);
        } 
        else {
            if (num2 == undefined) {
                operator = button.dataset.value.toString();
            }
            else {
                // Time to calculate
                console.log("calculating...");
                operate();
                displayResult(result);
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