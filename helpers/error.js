const PrettyError = require("pretty-error");
const pe = new PrettyError();

class CodewarsError extends Error {
  constructor(message, status, displayMessage) {
    super(message);

    this.status = status;
    this.displayMessage = displayMessage;
    console.log(displayMessage, 'displayMessage')
    console.log(
      `
      STATUS: ${this.status}

      ${message}

      Error Stack:

      ${pe.render(this)}
      `
    )
  }
}

class ValidationError extends CodewarsError {
  constructor(message) {
    super(message, 400)
  }
}

module.exports = {
  ValidationError
}
