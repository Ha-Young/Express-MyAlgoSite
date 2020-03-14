const PrettyError = require('pretty-error');
const pe = new PrettyError();

class CodewarsError extends Error {
  constructor(message, status, displayMessage) {
    super(message);
    console.log(message, status, displayMessage);
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

class DuplicateError extends CodewarsError {
  constructor(message, field) {
    super(message, 400, `${field}는 이미 존재하는 값입니다.`);
  }
}
class CastError extends CodewarsError {
  constructor(message) {
    super(message, 400, '정보를 불러오는데 실패했습니다.');
  }
}

class PageNotFoundError extends CodewarsError {
  constructor(message) {
    super(message, 404, '페이지가 존재하지 않습니다.');
  }
}

class GeneralError extends CodewarsError {
  constructor(message) {
    super(
      message,
      500,
      '서버에 오류가 있었습니다. 잠시 후에 다시 시도해주시기 바랍니다.'
    );
  }
}

module.exports = {
  DuplicateError,
  PageNotFoundError,
  CastError,
  GeneralError
};
