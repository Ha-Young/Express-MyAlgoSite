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
    super(message, 404, '페이지를 찾을 수 없습니다.');
  }
}

class GeneralError extends CodewarsError {
  constructor(message) {
    super(message, 500, '일시적인 오류가 발생하였습니다. 다시 시도해주세요.');
  }
}

module.exports = {
  NotFoundError,
  GeneralError
};
