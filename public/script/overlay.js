const backdrop = document.getElementById("backdrop");
const popup = document.getElementById("config-overlay");
const userheader = document.getElementById("usernamedisplay");

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
    body: JSON.stringify({ username: userName, password: password }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const {error = ""} = await response.json();
  console.log(error);

  if (error === "") {
    backdrop.style.display = "none";
    popup.style.display = "none";
    userheader.textContent = userName;
    await getUserHistory(userName);
    return;
  }
  console.log(error);
}
