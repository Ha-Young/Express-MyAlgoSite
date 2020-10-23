const express = require('express');

const router = express.Router();

console.log('hello world!');
const registerButton = document.getElementById('register');
registerButton.addEventListener('click', () => {
  alert('click');
  router.get('/new', (req, res, next) => {
    res.redirect('/success');
  });
});
