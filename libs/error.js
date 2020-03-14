const PrettyError = require("pretty-error");
const pe = new PrettyError();

class CodewarsError extends Error {
  constructor (message, status, displayMessage) {
    super(message);

    this.status = status;
    this.displayMessage = displayMessage;

    console.log(
      `< [STATUS: ${this.status}] Error Message ${pe.render(message)}>
      <Error Stack>
      ${pe.render(this)}
      `
    );
  }
}

class DuplicateError extends CodewarsError {
  constructor (message, field) {
    super(message, 400, `${field}는 이미 존재하는 값입니다.`);
  }
}

class ValidationError extends CodewarsError {
  constructor (message, field) {
    super(message, 400, `${field}는 유효하지않은 값입니다.`);
  }
}

class UndefinedError extends CodewarsError {
  constructor (message) {
    super(message, 404, '404 : NOT FOUND. 페이지를 찾을수없습니다.');
  }
}

class GeneralError extends CodewarsError {
  constructor (message) {
    super(message, 500, '서버에 오류가 있습니다. 잠시후 다시 시도해주세요.');
  }
}

module.exports = {
  DuplicateError,
  ValidationError,
  UndefinedError,
  GeneralError
};
