class handle_error extends Error {
  constructor() {
    super();
  }

  custom_error(statuscode, message, status) {
    this.status_code = statuscode;
    this.message = message;
    this.status = status;
    return this;
  }
}

module.exports = new handle_error();
