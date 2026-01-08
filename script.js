// Global variables to store the state of the calculator
let displayValue = '0';
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

// Function to update the calculator display
function updateDisplay() {
    const display = document.querySelector('.calculator-screen');
    display.value = displayValue;
}

updateDisplay(); // Initialize the display

// Function to handle digit and decimal input
function inputDigit(digit) {
    if (waitingForSecondOperand === true) {
        displayValue = digit;
        waitingForSecondOperand = false;
    } else {
        // Replace '0' with the digit, otherwise append
        displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
    updateDisplay();
}

function inputDecimal(dot) {
    // Prevent multiple decimals in one number
    if (!displayValue.includes(dot)) {
        displayValue += dot;
    }
    updateDisplay();
}

// Function to handle operator clicks (+, -, *, /)
function handleOperator(nextOperator) {
    const inputValue = parseFloat(displayValue);

    if (operator && waitingForSecondOperand) {
        operator = nextOperator; // Allow changing the operator
        return;
    }

    if (firstOperand === null) {
        firstOperand = inputValue;
    } else if (operator) {
        const result = calculate(firstOperand, inputValue, operator);
        
        displayValue = String(result);
        firstOperand = result; // Store result for next calculation
    }

    waitingForSecondOperand = true;
    operator = nextOperator;
    updateDisplay();
}

// Function to perform the calculation
function calculate(first, second, operator) {
    if (operator === '+') {
        return first + second;
    } else if (operator === '-') {
        return first - second;
    } else if (operator === '*') {
        return first * second;
    } else if (operator === '/') {
        // Basic division, handle divide by zero
        if (second === 0) {
            return 'Error';
        }
        return first / second;
    }
    return second;
}

// Function to reset the calculator state
function resetCalculator() {
    displayValue = '0';
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
    updateDisplay();
}

// Event listener for all calculator keys
const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {
    const { target } = event; // Get the clicked element

    if (!target.matches('button')) {
        return; // Exit if the click wasn't on a button
    }

    // Check the class of the button and call the appropriate function
    if (target.classList.contains('operator')) {
        handleOperator(target.value);
        return;
    }

    if (target.classList.contains('decimal')) {
        inputDecimal(target.value);
        return;
    }

    if (target.classList.contains('clear')) {
        resetCalculator();
        return;
    }

    // Default: Must be a number button
    inputDigit(target.value);
});