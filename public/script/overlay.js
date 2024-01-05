const backdrop = document.getElementById("backdrop");
const popup = document.getElementById("config-overlay");

const formElement = document.getElementById("create-user-form");

formElement.addEventListener("submit", createSaveUser);

function createSaveUser(event){
    event.preventDefault();
    const formData = new FormData(event.target);
    const username = formData.get("username").trim();
}