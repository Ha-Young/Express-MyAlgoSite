const githubLoginButton = document.querySelector('#github-login');

githubLoginButton.addEventListener('click', () => {
  location.assign('/login/github');
});
