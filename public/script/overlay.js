const backdrop = document.getElementById("backdrop");
const popup = document.getElementById("config-overlay");

const formElement = document.getElementById("create-user-form");

formElement.addEventListener("submit", createSaveUser);

async function createSaveUser(event){
    event.preventDefault();
    const formData = new FormData(event.target);
    const userName = formData.get("username").trim();
    if(!userName) return;
    await fetch("/submit", {
        method: "POST",
        body: JSON.stringify({username : userName}),
        headers: {
            "Content-Type" : "application/json"
        }
    });
    backdrop.style.display = "none";
    popup.style.display = "none";
}