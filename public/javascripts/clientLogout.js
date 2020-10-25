const githubLogoutButton = document.querySelector('#logout');

githubLogoutButton.addEventListener('click', () => {
  location.assign('/logout');
});
