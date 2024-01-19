const historyForm = document.getElementById("search-form");
const queryList = document.getElementById("query-list");
const userId = document.getElementById("userid");
const historyPreview = document.getElementById("history-preview");

historyForm.addEventListener("submit", getUserHistory);


async function getUserHistory(event){
    event.preventDefault();
    const formData = new FormData(event.target);
    const startDate = formData.get("startdate");
    const endDate = formData.get("enddate");
    const userId = formData.get("userid");
    const response = await fetch(`/history/${userId}/${startDate}/${endDate}/`);
    const {searchResult} = await response.json();
    displayUserHistory(searchResult);
}

function displayUserHistory(searchResult){
    historyPreview.textContent = "";
    for(elements of searchResult){
        const list = document.createElement("li");
        list.textContent = elements.expression + " = " + elements.result;
        historyPreview.appendChild(list);
    }
}