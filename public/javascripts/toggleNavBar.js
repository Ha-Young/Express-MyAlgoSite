const toggler = document.querySelector(".navbar-toggler");
const navbar = document.querySelector(".navbar-collapse");

function handleClick() {
  navbar.classList.toggle("show");
}

toggler.addEventListener("click", handleClick);
