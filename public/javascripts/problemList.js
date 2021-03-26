const problemBlocks = document.getElementsByClassName("problemBlock");

for (let problem of problemBlocks) {
  const id = problem.id;

  problem.addEventListener("click", () => {
    window.location.href = `/problem/${id}`;
  });
}
