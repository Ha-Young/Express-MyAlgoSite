const PrettyError = require('pretty-error');
const pe = new PrettyError();

class CodewarsError extends Error {
  constructor(message, status, displayMessage) {
    super(message);
    this.status = status;
    this.displayMessage = displayMessage;

    console.log(
      `< [STATUS: ${this.status}] ${pe.render(message)} >

      < Error Stack >
      ${pe.render(this)}
      `
    );
  }
}

class InvalidUrlError extends CodewarsError {
  constructor(message) {
    super(message, 404, '페이지를 찾을 수 없습니다.');
  }
}

class InvalidUserInfoError extends CodewarsError {
  constructor(message) {
    super(message, 401, '아이디/비밀번호를 다시 확인해주세요.');
  }
}

class LoginError extends CodewarsError {
  constructor(message) {
    super(message, 500, '로그인 중 알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
  }
}

class DocumentNotFoundError extends CodewarsError {
  constructor(message, problemId) {
    super(message, 500, `${problemId}번 문제는 존재하지 않습니다.`);
  }
}

class SaveError extends CodewarsError {
  constructor(message) {
    super(message, 500, 'Document가 존재하지 않아 자료를 저장할 수 없습니다.');
  }
}

class CastError extends CodewarsError {
  constructor(message) {
    super(message, 401, '유효한 데이터 값이 아닙니다.');
  }
}

class GeneralError extends CodewarsError {
  constructor(message) {
    super(message, 500, '서버에 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
  }
}

module.exports = {
  InvalidUrlError,
  InvalidUserInfoError,
  LoginError,
  DocumentNotFoundError,
  SaveError,
  CastError,
  GeneralError
};
