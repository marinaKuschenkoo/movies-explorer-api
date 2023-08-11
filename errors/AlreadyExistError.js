const { ALREADY_EXIST_ERROR } = require('../utils/constants');

class AlreadyExistError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ALREADY_EXIST_ERROR;
  }
}

module.exports = AlreadyExistError;
