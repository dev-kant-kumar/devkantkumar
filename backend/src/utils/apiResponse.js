const { STATUS_CODES, MESSAGES } = require('./constants');

class ApiResponse {
  static success(res, data = null, message = MESSAGES.SUCCESS, statusCode = STATUS_CODES.OK) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      timestamp: new Date().toISOString()
    });
  }

  static error(res, message = MESSAGES.ERROR, statusCode = STATUS_CODES.INTERNAL_SERVER_ERROR, errors = null) {
    return res.status(statusCode).json({
      success: false,
      message,
      errors,
      timestamp: new Date().toISOString()
    });
  }

  static validationError(res, errors) {
    return res.status(STATUS_CODES.UNPROCESSABLE_ENTITY).json({
      success: false,
      message: MESSAGES.VALIDATION_ERROR,
      errors,
      timestamp: new Date().toISOString()
    });
  }

  static unauthorized(res, message = MESSAGES.UNAUTHORIZED) {
    return res.status(STATUS_CODES.UNAUTHORIZED).json({
      success: false,
      message,
      timestamp: new Date().toISOString()
    });
  }

  static forbidden(res, message = MESSAGES.FORBIDDEN) {
    return res.status(STATUS_CODES.FORBIDDEN).json({
      success: false,
      message,
      timestamp: new Date().toISOString()
    });
  }

  static notFound(res, message = MESSAGES.NOT_FOUND) {
    return res.status(STATUS_CODES.NOT_FOUND).json({
      success: false,
      message,
      timestamp: new Date().toISOString()
    });
  }

  static created(res, data = null, message = MESSAGES.SUCCESS) {
    return res.status(STATUS_CODES.CREATED).json({
      success: true,
      message,
      data,
      timestamp: new Date().toISOString()
    });
  }

  static paginated(res, data, pagination, message = MESSAGES.SUCCESS) {
    return res.status(STATUS_CODES.OK).json({
      success: true,
      message,
      data,
      pagination,
      timestamp: new Date().toISOString()
    });
  }
}

module.exports = ApiResponse;
