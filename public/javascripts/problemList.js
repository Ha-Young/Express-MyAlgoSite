const problemBlocks = document.getElementsByClassName("problemBlock");

for (let problem of problemBlocks) {
  problem.addEventListener("click", (event) => {
    window.location.href = `/problem/${event.target.id}`
  });
}
