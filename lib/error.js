const PrettyError = require("pretty-error");
const pe = new PrettyError();

class PetsError extends Error {
  constructor(message, status, displayMessage) {
    super(message);

    this.status = status;
    this.displayMessage = displayMessage;

    console.log(
      `< [STATUS: ${this.status}] Error Message>
        ${message}
       < ERROR STACK >
       ${pe.render(this)}
      `
    );
  }
}

class ValidationError extends PetsError {
  constructor(message, field) {
    super(message, 400, `유효하지 않은 ${field} 값입니다.`);
  }
}


class DuplicateError extends PetsError {
  constructor(message, field) {
    super(message, 400, `${field}이 이미 존재하는 값입니다.`);
  }
}

class InternalError extends PetsError {
  constructor(message) {
    super(
      message,
      500,
      "서버에 오류가 있었습니다. 잠시 후에 다시 접속해주세요."
    );
  }
}

module.exports = {
  InternalError,
  DuplicateError,
  InternalError
};