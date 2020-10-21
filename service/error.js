class MongoError extends Error {
  constructor(message = "mongodb server has error", status = 500) {
    super();
    this.message = message;
    this.status = status;
  }
}

class JwtError extends Error {
  constructor(message = "token error") {
    super();
    this.message = message;
    this.status = 401;
  }
}

class ValidationError extends Error {
  constructor(message = "validation error") {
    super();
    this.message = message;
    this.status = 400;
  }
}

module.exports = {
  MongoError,
  JwtError,
  ValidationError,
};
