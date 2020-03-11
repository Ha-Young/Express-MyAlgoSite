class CodewarsError extends Error {
  constructor(message, status, displayMessage) {
    super(message);

    this.status = status;
    this.displayMessage = displayMessage;
  }
}