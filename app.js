const displayArea = document.getElementById("display");

const inputArea = document.getElementById("input");
inputArea.addEventListener("input", calculation);

const clickEvent = document.querySelector(".input-buttons");
clickEvent.addEventListener("click", calculation);

// to track next index after arithmetic symbol
var lastCharacterIndex = 1;
var symbolStack = [];
var postfixExpressionList = [];

function calculation(event) {
    console.log(event.keyCode);
  mouseClickEvent(event);
  insertIntopostfixExpressionList(event);
}

// updating display area if user input from mouse click
function displayInput(nextInput) {
  inputArea.value += nextInput;
  console.log(inputArea.value);
}

function insertIntopostfixExpressionList(event) {
  var currentValueLength = inputArea.value.length;
  var lastValue = inputArea.value.charAt(currentValueLength - 1);
  console.log(lastValue);
  if ((lastValue < "0" || lastValue > "9") && lastValue != '.') {
    postfixExpressionList.push(
      inputArea.value.substring(lastCharacterIndex - 1, currentValueLength - 1)
    );
    lastCharacterIndex = currentValueLength + 1;
    convertToPostfixExpression(lastValue);
  } else if (event.target.id == "equals") {
    postfixExpressionList.push(
      inputArea.value.substring(lastCharacterIndex - 1, currentValueLength)
    );
    lastCharacterIndex = currentValueLength + 1;
    emptySymbolStack();
    var result = performCalculations();
    console.log(result);
    if (isNaN(result)) result = "Malformed expression";
    displayArea.value = result;
  }
}

function performCalculations() {
  var numberStack = [];
  while (postfixExpressionList.length > 0) {
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

function convertToPostfixExpression(lastValue) {
  while (
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
  console.log();
}