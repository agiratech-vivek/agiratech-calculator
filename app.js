const displayArea = document.getElementById('display');

const inputArea = document.getElementById('input');
inputArea.addEventListener('input', calculation);

const clickEvent = document.querySelector('.input-buttons');
clickEvent.addEventListener('click', calculation);

// updating display area if user input from mouse click
function displayInput(nextInput){
    inputArea.value += nextInput;
}
// to track next index after arithmetic symbol
let lastCharacterIndex = 1;
var symbolStack = [];
var postfixExpressionList = [];

function calculation(event){
    mouseClickEvent(event);
    insertIntopostfixExpressionList(event);
}

function insertIntopostfixExpressionList(event){
    var currentValueLength = inputArea.value.length;
    let lastValue = inputArea.value.charAt(currentValueLength-1);
    if(lastValue < '0' || lastValue > '9'){
        postfixExpressionList.push(inputArea.value.substring(lastCharacterIndex-1, currentValueLength-1));
        lastCharacterIndex = currentValueLength+1;
        convertToPostfixExpression(lastValue);
    } else if (event.target.id == 'equals'){
        postfixExpressionList.push(inputArea.value.substring(lastCharacterIndex-1, currentValueLength));
        lastCharacterIndex = currentValueLength+1;
        emptySymbolStack();
        displayArea.value = performCalculations();
        resetState();
    }
}

function performCalculations(){
    let numberStack =[];
    while(postfixExpressionList.length > 0){
        let currentElement = postfixExpressionList.shift();
        if(currentElement == '+' || currentElement == '-' || currentElement == '*' || currentElement == '/'){
            let secondNumber = parseInt(numberStack.pop());
            let firstNumber = parseInt(numberStack.pop());
            console.log(firstNumber + " " + secondNumber);
            if(currentElement == '+') numberStack.push(firstNumber + secondNumber);
            else if(currentElement == '-') numberStack.push(firstNumber - secondNumber);
            else if(currentElement == '/') numberStack.push(firstNumber / secondNumber);
            else if(currentElement == '*') numberStack.push(firstNumber * secondNumber);
        } else {
            numberStack.push(currentElement);
        }
    }
    console.log(postfixExpressionList);
    return numberStack.pop();
}

function mouseClickEvent(event){
    let buttonValue = event.target.id;
    console.log(buttonValue);
    if(event.target.tagName === 'BUTTON' && buttonValue != 'reset' && buttonValue != 'equals'){
        displayInput(buttonValue);
    } else if (event.target.tagName === 'BUTTON' && buttonValue == 'reset'){
        displayArea.value = '';
        resetState();
    }
}

function convertToPostfixExpression(lastValue){
    if(symbolStack.length != 0){
        if((symbolStack[symbolStack.length-1] == '-' || symbolStack[symbolStack.length-1] == '+') && (lastValue == '/' || lastValue == '*')){
            symbolStack.push(lastValue);
        } else {
            postfixExpressionList.push(symbolStack.pop());
            symbolStack.push(lastValue);
        }
    } else {
        symbolStack.push(lastValue);
    }

}

function emptySymbolStack(){
    while(symbolStack.length > 0){
        postfixExpressionList.push(symbolStack.pop());
    }
}

function resetState(){
    
}