const displayArea = document.getElementById("display");
const inputArea = document.getElementById("input");
inputArea.addEventListener("keyup", checkClickKeyUpEvent);

const buttonClick = document.querySelectorAll(".input-buttons").forEach((button) => {
  button.addEventListener("click", checkClickKeyUpEvent);
});

function writeLocalStore(exp, res) 
{
  let local = JSON.parse(localStorage.getItem('cal')) || [];
  local.push({
    exp: exp,
    res:res
  });
  localStorage.setItem('cal', JSON.stringify(local))
}

function checkClickKeyUpEvent(event) {
  if (inputArea.value && event.key === "Enter" || event.target.id === "equals") printResult();
  else if (event.key === "Delete" || event.target.id === "reset") resetCalculator();
  else if (event.target.id === "backspace") undo();
  else updateDisplay(event);
}

function printResult(){
    let expression = inputArea.value;
    let operators = ['/', '*', '+', '-'];
    
}