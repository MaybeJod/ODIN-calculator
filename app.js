let lastInput;
let input;

let result;

// 1
let firstInput;
//2
let operatorInput;
//3
let secondInput;
//4
let equals;

const displayValue = document.querySelector(".display-text");

const btnValue = document.querySelectorAll("button");

btnValue.forEach(element => {
    element.addEventListener("click", e => {

        let buttonText = e.target.innerText;
    })
})

function printToDisplay(input) {
    displayValue.value += input;
}

// addition
function add(num1, num2) {
    console.log(num1 + num2);
    return num1 + num2;
}

//subtract
function sub(num1, num2) {
    console.log(num1 - num2);
    return num1 - num2;
}

// multiply
function multiply(num1, num2) {
    console.log(num1 * num2);
    return num1 * num2;
}

//division
function divide(num1, num2) {
    console.log(num1 / num2);
    return num1 / num2;
}

function operate(operator, num1, num2) {
    add(num1, num2);
    sub(num1, num2);
    multiply(num1, num2);
    divide(num1, num2);
}

operate(add(), 5, 5);

// first user inputs one number
//select id and displays that in input result

// input is displayed when chosen

// add more numbers when user input

// second user inputs a operator
// operator is displayed when chosen

// third the result is printed to the DOM
// when the user want to calculate another calculation, display the last calculation
// history should hav Ans = last result.

// user should also be able to delete current input
// user should also be able to delete one number from calculation
