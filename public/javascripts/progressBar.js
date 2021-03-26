const progressBar = document.querySelector(".progress-bar");
let countDown = 100;
progressBar.style.width = `${countDown}%`;

setInterval(() => {
  countDown -= 0.2;
  progressBar.style.width = `${countDown}%`;
}, 500);
