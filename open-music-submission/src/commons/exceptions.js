class ClientError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'ClientError';
  }
}

class NotFoundError extends ClientError {
  constructor(message) {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}

class InvariantError extends ClientError {
  constructor(message) {
    super(message, 400);
    this.name = 'InvariantError';
  }
}

class AuthenticationError extends ClientError {
  constructor(message) {
    super(message, 401);
    this.name = 'AuthenticationError';
  }
}

class ForbiddenError extends ClientError {
  constructor(message) {
    super(message, 403);
    this.name = 'ForbiddenError';
  }
}

class BigSizeError extends ClientError {
  constructor(message) {
    super(message, 415);
    this.name = 'BigSizeError';
  }
}


module.exports = {
  ClientError, NotFoundError, InvariantError, AuthenticationError, ForbiddenError, BigSizeError,
};
