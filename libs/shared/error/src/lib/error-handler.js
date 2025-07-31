"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const api_error_1 = require("./api-error");
const errorHandler = (err, req, res, next) => {
    let customError = err;
    // If error is not an instance of ApiError, make it so
    if (!(err instanceof api_error_1.ApiError)) {
        customError = new api_error_1.ApiError(500, 'Something went wrong');
    }
    const apiError = customError;
    res.status(apiError.statusCode || 500).json({
        success: false,
        message: apiError.message || 'Internal Server Error',
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error-handler.js.map