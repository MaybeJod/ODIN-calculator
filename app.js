// variables
let currentOperandDisplay = document.querySelector(".current-operand");

let operandBtn = document.querySelectorAll(".operand-btn");

// arithmetic functions
function add(firstOperand, secondOperand) {
  return firstOperand + secondOperand;
}

function subtract(firstOperand, secondOperand) {
  return firstOperand - secondOperand;
}

function multiply(firstOperand, secondOperand) {
  return firstOperand * secondOperand;
}

function divide(firstOperand, secondOperand) {
  if (secondOperand === 0) {
    return "why are you fucking with me?";
  } else {
    return firstOperand / secondOperand;
  }
}

function operate(operator, firstOperand, secondOperand) {
  switch (operator) {
    case "+":
      return add(firstOperand, secondOperand);
      break;
    case "-":
      return subtract(firstOperand, secondOperand);
      break;
    case "*":
      return multiply(firstOperand, secondOperand);
      break;
    case "/":
      return divide(firstOperand, secondOperand);
      break;
    default:
      return "Error, you stupid";
  }
}

function appendFistOperandToDisplay() {
  operandBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      currentOperandDisplay.textContent += btn.textContent;
    });
  });
}
