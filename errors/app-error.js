const { GraphQLError } = require('graphql');

/**
 * An error that occurs within the business logic of the application.
 *
 * @class AppError
 * @extends {GraphQLError}
 */
class AppError extends GraphQLError {
  constructor(error) {
    super(error.code);
    this.payload = error;
  }
}

module.exports.AppError = AppError;
