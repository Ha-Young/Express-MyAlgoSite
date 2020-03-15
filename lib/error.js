const PrettyError = require('pretty-error');
const pe = new PrettyError();

class CodewarsError extends Error {
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
  PageNotFoundError,
  CastError,
  GeneralError
};
