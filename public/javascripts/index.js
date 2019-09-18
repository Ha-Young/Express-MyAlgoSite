const $tabs = document.querySelectorAll('.tabs button');

const fetchProblemsByLevel = (targetLevel) => {
  return fetch('/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      params: targetLevel
    }
  }).then(res => res.json());
};

const renderProblem = (problems) => {
  const $wrapper = document.querySelector('.problem-wrap');

  let $ul = '<ul class="problems">';

  problems.forEach(problem => {
    const $li = `<li class='problem-box level-${problem.difficulty_level}'>`
      + `<a href='/problems/${problem._id}'>`
      + `<span class="info level">Level ${problem.difficulty_level}</span>`
      + `<span class="info completed">${problem.completed_users.length}명 완료</span>`
      + `<span class="title">${problem.title}</span>`
      + `</a></li>`;
    $ul += $li;
  });

  $ul += '</ul>';
  $wrapper.innerHTML = $ul;
};

$tabs.forEach(tab => {
  tab.addEventListener('click', (e) => {
    const $curActiveTab = document.querySelector('.active-tab');

    $curActiveTab.classList.remove('active-tab');
    e.currentTarget.classList.add('active-tab');

    const targetLevel = e.currentTarget.dataset.level;

    fetchProblemsByLevel(targetLevel)
      .then(res => {
        renderProblem(res.problems);
      })
      .catch(err => console.error(err));
  });
});
