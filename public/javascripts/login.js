/* eslint-disable no-unused-vars */
const loginButton = document.querySelector(".login");

loginButton.addEventListener("click", (e) => {
  window.location = "/auth/github";
});
