const displayArea = document.getElementById("display");
const inputArea = document.getElementById("input");
const buttonClick = document.querySelectorAll(".input-buttons");

inputArea.addEventListener("keyup", insertIntoinfixExpression);
buttonClick.forEach(button => {
    button.addEventListener('click', insertIntoinfixExpression);
});

const precedence = {
    "^" : 3,
    "/" : 2,
    "*" : 2,
    "+" : 1,
    "-" : 1
}   

function insertIntoinfixExpression(event){
    if (event.key === "Enter" || event.target.id === "equals"){
        let result = infixToPostfix(inputArea.value);
        displayArea.value = infixExpression + " = "  + result;
        inputArea.value = result;
    } else if (event.key === "Delete" || event.target.id === "reset"){
        displayArea.value = "";
        inputArea.value = "";
    } else if (event.target.id === "backspace") {
        inputArea.value = inputArea.value.slice(0, -1);
    } else {
        if(event.detail === 1) inputArea.value += event.target.id;
        infixExpression = inputArea.value;
    }
}

function infixToPostfix(infixExpression){
    let lastCharacterIndex = 0;
    let postfixExpressionList = [];
    let symbolStack = [];
    for(let i = 0; i< infixExpression.length; i++){
        let currentElement = infixExpression.charAt(i);
        let operatorString = "^/*+-";
        let indexOfCurrentElement = i;
        if(i > 0 && !operatorString.includes(infixExpression.charAt(i-1)) && operatorString.includes(currentElement)){
            console.log(i);
            postfixExpressionList.push(infixExpression.substring(lastCharacterIndex, indexOfCurrentElement));
            lastCharacterIndex = indexOfCurrentElement + 1;
            insertSymbolIntoPostfixExpressionList(postfixExpressionList, symbolStack, currentElement);
        } else if (i === infixExpression.length - 1){
            postfixExpressionList.push(infixExpression.substring(lastCharacterIndex, indexOfCurrentElement + 1));
            emptySymbolStack(symbolStack, postfixExpressionList);
        }
    }
    console.log(postfixExpressionList);
    let result = performCalculation(postfixExpressionList);
    saveToStorage(infixExpression, result);
    if(isNaN(result)) return "Malformed Expression";
    return result;
}

function insertSymbolIntoPostfixExpressionList(postFixExpressionList, symbolStack, currentElement){
    while(symbolStack.length > 0 && precedence[currentElement] <= precedence[symbolStack[symbolStack.length-1]]){
        postFixExpressionList.push(symbolStack.pop());
    }
    symbolStack.push(currentElement);
}

function emptySymbolStack(symbolStack, postFixExpressionList){
    while(symbolStack.length > 0){
        postFixExpressionList.push(symbolStack.pop());
    }
}

function performCalculation(postFixExpressionList){
    let numberStack = [];
    while(postFixExpressionList.length > 0){
        let firstPoppedElement = postFixExpressionList.shift();
        if("^/*+-".includes(firstPoppedElement)){
            let secondNumber = parseFloat(numberStack.pop());
            let firstNumber = parseFloat(numberStack.pop());
            if(firstPoppedElement === "^") numberStack.push(Math.pow(firstNumber, secondNumber));
            else if(firstPoppedElement === "/") numberStack.push(firstNumber / secondNumber);
            else if(firstPoppedElement === "*") numberStack.push(firstNumber * secondNumber);
            else if(firstPoppedElement === "+") numberStack.push(firstNumber + secondNumber);
            else if(firstPoppedElement === "-") numberStack.push(firstNumber - secondNumber);
            else return "invalid operator"
        } else {
            numberStack.push(firstPoppedElement);
        }
    }
    return numberStack.pop();
}

function saveToStorage(infixExpression, result){
    localStorage.setItem(infixExpression, result);
    sessionStorage.setItem(infixExpression, result);
}