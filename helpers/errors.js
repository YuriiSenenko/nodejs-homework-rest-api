class ContactListError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class WrongParametersError extends ContactListError {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}

class NotAutorizedError extends ContactListError {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}

class ConflictAutorizedError extends ContactListError {
  constructor(message) {
    super(message);
    this.status = 409;
  }
}
module.exports = {
  ContactListError,
  WrongParametersError,
  NotAutorizedError,
  ConflictAutorizedError,
};
