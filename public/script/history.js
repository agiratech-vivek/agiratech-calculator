const historyForm = document.getElementById("search-form");
const queryList = document.getElementById("query-list");
historyForm.addEventListener("submit", searchUserName);

function addHistory(expressionList){
    const historyList = document.createElement("ul");
    if(expressionList.length === 0){
        const li = document.createElement('li');
        li.textContent = "0 result found"
        historyList.appendChild(li);
    } else {
        for(elements of expressionList) {
            const li = document.createElement('li');
            li.textContent = elements.expression + " : " + elements.result
            historyList.appendChild(li);
        }
    }
    console.log(historyList);
    queryList.appendChild(historyList);
}

async function searchUserName(event){
    event.preventDefault();
    const formData = new FormData(event.target);
    const user = formData.get("name").trim();
    await getUserHistory(user);
}

async function getUserHistory(user){
    const response = await fetch(`/search/${user}`);
    const {expressionList} = await response.json();
    addHistory(expressionList);
}