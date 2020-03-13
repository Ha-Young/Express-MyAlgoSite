const buttons = document.querySelectorAll('.button');

buttons[0].addEventListener('click', () => history.back());
buttons[1].addEventListener('click', () => location.assign(location.origin));
