const signupSubmit = document.getElementById("signup");
const usernameInput = document.getElementById("username");
const usernameTaken = document.getElementById("usertaken");

signupSubmit.addEventListener("submit", checkUserAvailability);

async function checkUserAvailability(event) {
  event.preventDefault();
  const formElement = new FormData(event.target);
  const username = formElement.get("username").trim();
  const name = formElement.get("name").trim();
  const password = formElement.get("password").trim();
  const response = await fetch(`/checkuser/${username}`);
  const { id } = await response.json();
  console.log(id);
  if (id !== 0) {
    usernameTaken.textContent = "Username is already taken"
    return;
  } else {
    await fetch("/signup", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        name: name,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    window.location.href = "/signin";
  }
}
