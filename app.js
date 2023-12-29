const displayArea = document.getElementById("display");

const inputArea = document.getElementById("input");
inputArea.addEventListener("input", calculation);

const clickEvent = document.querySelector(".input-buttons");
clickEvent.addEventListener("click", calculation);


var lastCharacterIndex = 1; // to track next index after arithmetic symbol
var symbolStack = [];   // to store the symbols which is to be put in postfixExpressionList
var postfixExpressionList = []; // to store postfix expression of incoming infix expression

function calculation(event) {
  mouseClickEvent(event); // checking mouse event for reset and numbers
  insertIntopostfixExpressionList(event); // function call to store the elements into postfixExpressionList
}

// updating display area if user inputs from mouse click
function displayInput(nextInput) {
  inputArea.value += nextInput;
  console.log(inputArea.value);
}

function insertIntopostfixExpressionList(event) {
  var currentValueLength = inputArea.value.length;
  var lastValue = inputArea.value.charAt(currentValueLength - 1);
  if ((lastValue < "0" || lastValue > "9") && lastValue != '.') { // to be implemented when user inputs arithmetic operator
    postfixExpressionList.push(
  inputArea.value.substring(lastCharacterIndex - 1, currentValueLength - 1) // taking substring from lastCharacterIndex to currentIndex-1 and storing in postfixExpressionList
    );
    lastCharacterIndex = currentValueLength + 1; // updating the lastCharacterIndex to currentValueIndex + 1
    symbolToPostfixExpressionList(lastValue); // to insert the arithmetic operators into postfixExpressionList
  } else if (event.target.id == "equals") { // checking if user wants the result
    postfixExpressionList.push(
      inputArea.value.substring(lastCharacterIndex - 1, currentValueLength) // inserting last remaining number to postfixExpressionList
    );
    emptySymbolStack(); // inserting last remaing operators into postfixExpressionList
    var result = performCalculations(); // calculating the result
    console.log(result);
    if (isNaN(result)) result = "Malformed expression";
    displayArea.value = result;
  }
}

function performCalculations() {
  var numberStack = []; // to store the numbers for calculation
  while (postfixExpressionList.length > 0) { // looping through the postFixExpressionList to check operators and calculate the sum
    var currentElement = postfixExpressionList.shift();
    if (
      currentElement == "+" ||
      currentElement == "-" ||
      currentElement == "*" ||
      currentElement == "/"
    ) {
      var secondNumber = parseFloat(numberStack.pop());
      var firstNumber = parseFloat(numberStack.pop());
      if (currentElement == "+") numberStack.push(firstNumber + secondNumber);
      else if (currentElement == "-")
        numberStack.push(firstNumber - secondNumber);
      else if (currentElement == "/")
        numberStack.push(firstNumber / secondNumber);
      else if (currentElement == "*")
        numberStack.push(firstNumber * secondNumber);
    } else {
      numberStack.push(currentElement);
    }
  }
  return numberStack.pop();
}

function mouseClickEvent(event) {
  var buttonValue = event.target.id;
  if (
    event.target.tagName === "BUTTON" &&
    buttonValue != "reset" &&
    buttonValue != "equals"
  ) {
    displayInput(buttonValue);
  } else if (event.target.tagName === "BUTTON" && buttonValue == "reset") {
    displayArea.value = "";
    resetState();
  }
}

function symbolToPostfixExpressionList(lastValue) {
  while ( // looping while checking the precedence of the operators and appending in postfixExpressionList
    symbolStack.length > 0 &&
    (((symbolStack[symbolStack.length - 1] === "+" ||
      symbolStack[symbolStack.length - 1] === "-") &&
      (lastValue === "+" || lastValue === "-")) ||
      ((symbolStack[symbolStack.length - 1] === "/" ||
        symbolStack[symbolStack.length - 1] === "*") &&
        (lastValue === "+" || 
          lastValue === "-" ||
          lastValue === "/" ||
          lastValue === "*")))
  ) {
    var poppedValue = symbolStack.pop();
    postfixExpressionList.push(poppedValue);
  }
  symbolStack.push(lastValue);
}

function emptySymbolStack() {
  while (symbolStack.length > 0) {
    postfixExpressionList.push(symbolStack.pop());
  }
}

function resetState() {
  lastCharacterIndex = 1;
  symbolStack = [];
  postfixExpressionList = [];
  numberStack = [];
  displayArea.value = "";
  inputArea.value = 0;
}