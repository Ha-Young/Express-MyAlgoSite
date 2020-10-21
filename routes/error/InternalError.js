class InternalError extends Error {
  constructor(message) {
    super(message || 'Internal Error');
    this.name = 'InternalError';
    this.status = 500;
  }
}

module.exports = InternalError;
