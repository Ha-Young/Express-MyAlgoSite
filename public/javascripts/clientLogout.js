const githubLoginButton = document.querySelector('#logout');

githubLoginButton.addEventListener('click', () => {
  location.assign('/logout');
});
