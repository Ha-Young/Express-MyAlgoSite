const PrettyError = require('pretty-error');
const pe = new PrettyError();

class CodewarsError extends Error {
  constructor(message, status, displayMessage) {
    super(message);

    this.status = status;
    this.displayMessage = displayMessage;

    console.log(
      `< Error ${this.status} >
      ${message}

      < Error Stack >
      ${pe.render(this)}
      `
    );
  }
}

class NotFoundError extends CodewarsError {
  constructor(message) {
    super(
      message,
      404,
      "We can't find that page"
    );
  }
}

class GeneralError extends CodewarsError {
  constructor(message) {
    super(
      message,
      500,
      'Something went wrong. Please reload the site.'
    );
  }
}

module.exports = {
  NotFoundError,
  GeneralError
};
