const signupSubmit = document.getElementById("signup");
const usernameInput = document.getElementById("username");

signupSubmit.addEventListener("submit", checkUserAvailability);

async function checkUserAvailability(event){
    event.preventDefault();
    const formElement = new FormData(event.target);
    const username = formElement.get("username").trim();
    const name = formElement.get("name").trim();
    const password = formElement.get("password").trim();
    const response = await fetch(`/checkuser/${username}`);
    const {id = 0} = await response.json();
    console.log(id);
    if(id !== 0){
        usernameInput.classList.add("warning");
        return;
    }
    await fetch("/signup", {
        method: "POST",
        body: JSON.stringify({username : username, name : name, password : password}),
        headers: {
            "Content-Type" : "application/json"
        }
    });
    window.location.href = "/signin";
}