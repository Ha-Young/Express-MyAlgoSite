class RequestError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }

  static badRequest(message) {
    return new RequestError(400, message || 'Bad Request');
  }

  static notFound(message) {
    return new RequestError(404, message || 'Not Found');
  }
}

module.exports = RequestError;
