const githubLoginButton = document.querySelector('#githubLoginButton');

githubLoginButton.addEventListener('click', () => {
  location.assign('/login/github');
});