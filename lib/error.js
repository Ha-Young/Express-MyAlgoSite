const PrettyError = require('pretty-error');
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

class NotFoundError extends CodeWarsError {
  constructor(message) {
    super(message, 404, `해당 페이지는 존재하지 않습니다.`);
  }
}

class ValidationError extends CodeWarsError {
  constructor(message, field) {
    super(message, 400, `유효하지 않은 ${field} 값입니다.`);
  }
}

class GeneralError extends CodeWarsError {
  constructor(message) {
    super(
      message,
      500,
      "서버에 오류가 있었습니다. 잠시 후에 다시 시도해주시기 바랍니다."
    );
  }
}

module.exports = {
  ValidationError,
  NotFoundError,
  GeneralError
};
