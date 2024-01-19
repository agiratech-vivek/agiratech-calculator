const backdrop = document.getElementById("backdrop");
const popup = document.getElementById("config-overlay");
const userheader = document.getElementById("usernamedisplay");
const errorMessage = document.getElementById("error");

const formElement = document.getElementById("create-user-form");

formElement.addEventListener("submit", createSaveUser);

async function createSaveUser(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const userName = formData.get("username").trim();
  const password = formData.get("password").trim();
  if (!userName) return;
  const response = await fetch("/submit", {
    method: "POST",
    body: JSON.stringify({ user: userName, plainTextPassword: password }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const { message = "", id = "" } = await response.json();
  console.log(message);
  if (
    message === "No user found" ||
    message === "Username or Password incorrect"
  ) {
    errorMessage.textContent = message;
    return;
  }
  backdrop.style.display = "none";
  popup.style.display = "none";
  userheader.textContent = message;
  userId.value = id;
  await getUserHistory(userName);
  return;
}
