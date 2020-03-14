const PrettyError = require("pretty-error");
const pe = new PrettyError();

class CodewarsError extends Error {
  constructor(message, status, displayMessage) {
    super(message);

    this.status = status;
    this.displayMessage = displayMessage;

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
    super(
      message,
      400,
      "유효하지않은 입력 값입니다."
    );
  }
}

class GeneralError extends CodewarsError {
  constructor(message) {
    super(
      message,
      500,
      "서버에 오류가 있었습니다. 잠시 후에 다시 시도해주시기 바랍니다."
    );
  }
}

class LoginError extends CodewarsError {
  constructor(message) {
    super(
      message,
      401,
      "로그인에 실패했습니다."
    )
  }
}

module.exports = {
  ValidationError,
  GeneralError,
  LoginError
}
