const PrettyError = require("pretty-error");
const pe = new PrettyError();

class CodeWarsError extends Error {
  constructor(message, status, displayMessage) {
    super(message);

    this.status = status;
    this.displayMessage = displayMessage;

    console.log(
      `< [STATUS: ${this.status}] Error Message>

      ${message}

      < Error Stack >

      ${pe.render(this)}
      `
    );
  }
}

class PageNotFoundError extends CodeWarsError {
  constructor(message) {
    super(message, 404, 'Page Not Found');
  }
}

class GeneralError extends CodeWarsError {
  constructor(message) {
    super(
      message,
      500,
      "Server had error processing your request. Please try again."
    );
  }
}

module.exports = {
  PageNotFoundError,
  GeneralError
};
