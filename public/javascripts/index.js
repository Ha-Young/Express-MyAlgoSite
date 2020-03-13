const problems = document.querySelectorAll('.problem');

for (const problem of problems) {
  problem.addEventListener('click', () => {
    const problemId = problem.dataset.id;

    location.assign(`${location.origin}/problems/${problemId}`);
  });
}
