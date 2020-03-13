const PrettyError = require("pretty-error");
const pe = new PrettyError();

class CodewarsError extends Error {
  constructor(message, status, displayMessage) {
    super(message);

    this.status = status;
    this.displayMessage = displayMessage;

    console.log(
      `[STATUS: ${this.status}]

      ${message}

      [Error Stack]

      ${pe.render(this)}
      `
    )
  }
}

class ValidationError extends CodewarsError {
  constructor(message, field) {
    super(message, 400, `유효하지 않은 ${field}값 입니다.`)
  }
}

module.exports = {
  ValidationError
}
