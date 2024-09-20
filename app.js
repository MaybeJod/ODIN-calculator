// Variables to track the operands, operator, and state
let firstOperand = null; // Stores the first number in a calculation
let operator = null; // Stores the chosen operator (+, -, *, /)
let secondOperand = null; // Stores the second number when ready for calculation
let awaitSecondOperand = false; // Flag to indicate if the calculator is waiting for the second operand

const maxDisplayLength = 12; // Maximum number of digits displayed on the calculator
let displayValue = "0"; // Current value shown on the calculator display

// Arithmetic functions for basic operations
function add(firstOperand, secondOperand) {
  return firstOperand + secondOperand; // Adds two numbers
}

function subtract(firstOperand, secondOperand) {
  return firstOperand - secondOperand; // Subtracts second number from first
}

function multiply(firstOperand, secondOperand) {
  return firstOperand * secondOperand; // Multiplies two numbers
}

function divide(firstOperand, secondOperand) {
  if (secondOperand === 0) { // Prevent division by zero
    return "why are you messing with me?"; // Return a playful error message
  } else {
    return firstOperand / secondOperand; // Performs division
  }
}

// Function to handle different operations (+, -, *, /)
function operate(operator, firstOperand, secondOperand) {
  firstOperand = Number(firstOperand); // Convert operands to numbers
  secondOperand = Number(secondOperand);

  switch (operator) {
    case "+":
      return add(firstOperand, secondOperand); // Call add function
    case "-":
      return subtract(firstOperand, secondOperand); // Call subtract function
    case "*":
      return multiply(firstOperand, secondOperand); // Call multiply function
    case "/":
      return divide(firstOperand, secondOperand); // Call divide function
    default:
      return "Error, invalid operator"; // Return an error for unknown operator
  }
}

// Function to update the display based on the current value
function updateDisplay() {
  const currentOperandDisplay = document.querySelector(".current-operand");
  currentOperandDisplay.textContent = displayValue;

  if (displayValue.length > maxDisplayLength) {
    // Truncate the display value if it exceeds the max length
    currentOperandDisplay.textContent = displayValue.substring(0, maxDisplayLength);
  }
}

// Function to append numbers to the display
function appendOperand(operand) {
  if (awaitSecondOperand) {
    displayValue = operand; // If waiting for the second number, set it directly
    awaitSecondOperand = false;
  } else {
    if (displayValue === "0") {
      displayValue = operand; // Replace the default "0" with the first number
    } else {
      displayValue += operand; // Append the new number to the display value
    }
  }
  updateDisplay(); // Refresh the display
}

// Function to handle operator input
function operatorInput(op) {
  if (operator && awaitSecondOperand) {
    operator = op; // Allow changing the operator before the second operand
    return;
  }

  if (!firstOperand) {
    firstOperand = displayValue; // Save the first operand
  } else if (operator) {
    secondOperand = displayValue; // Save the second operand
    let result = operate(operator, firstOperand, secondOperand); // Perform the calculation
    displayValue = result.toString(); // Display the result
    updateDisplay(); // Refresh the display
    firstOperand = result; // Save the result as the new first operand
  }

  operator = op; // Save the chosen operator
  awaitSecondOperand = true; // Now waiting for the second operand
}

// Reset all calculator values (like pressing AC)
function allClear() {
  displayValue = '0'; // Reset the display
  firstOperand = null; // Clear the first operand
  secondOperand = null; // Clear the second operand
  operator = null; // Clear the operator
  awaitSecondOperand = false; // Reset the state
  updateDisplay(); // Refresh the display
}

// Function to add a decimal point to the display
function addDot(dot) {
  if (awaitSecondOperand) {
    displayValue = "0" + dot; // If waiting for second operand, start with "0."
    awaitSecondOperand = false;
  } else if (!displayValue.includes(dot)) {
    displayValue += dot; // Add the decimal point if it's not already included
  }

  updateDisplay(); // Refresh the display
}

// Function to delete the last digit from the display
function deleteBtn() {
  if (displayValue.length === 1) {
    displayValue = "0"; // Reset to "0" if there's only one digit left
  } else {
    displayValue = displayValue.slice(0, -1); // Remove the last character
  }

  updateDisplay(); // Refresh the display
}

// Function to toggle negative/positive for the display value
function negative() {
  if (displayValue !== "0") {
    if (displayValue.startsWith("-")) {
      displayValue = displayValue.slice(1); // Remove the negative sign
    } else {
      displayValue = "-" + displayValue; // Add the negative sign
    }

    updateDisplay(); // Refresh the display
  }
}

// Add event listeners to operand buttons (numbers 0-9)
const operandBtn = document.querySelectorAll(".operand-btn");
operandBtn.forEach((numBtn) => {
  numBtn.addEventListener("click", () => {
    appendOperand(numBtn.textContent); // Append the clicked number to the display
  });
});

// Add event listeners to operator buttons (+, -, *, /)
const operatorBtn = document.querySelectorAll(".operator-btn");
operatorBtn.forEach((opBtn) => {
  opBtn.addEventListener("click", () => {
    operatorInput(opBtn.textContent); // Handle the operator input
  });
});

// Add event listener to the equals button to perform calculation
document.querySelector('.equals').addEventListener('click', () => {
  if (!operator || awaitSecondOperand) return; // Don't calculate if no operator or waiting for second operand
  
  secondOperand = displayValue; // Set the second operand
  let result = operate(operator, firstOperand, secondOperand); // Perform the calculation
  displayValue = result.toString(); // Display the result
  updateDisplay(); // Refresh the display
  firstOperand = result; // Set the result as the first operand for the next calculation
  operator = null; // Clear the operator
  awaitSecondOperand = true; // Set the state for a new calculation
});

// Add event listeners for special buttons (AC, delete, dot, negative)
document.querySelector("#ac").addEventListener("click", allClear); // Reset everything
document.querySelector("#delete").addEventListener("click", deleteBtn); // Delete last digit
document.querySelector("#dot").addEventListener("click", () => {
  addDot("."); // Add a decimal point
});
document.querySelector("#negative").addEventListener("click", negative); // Toggle positive/negative sign
