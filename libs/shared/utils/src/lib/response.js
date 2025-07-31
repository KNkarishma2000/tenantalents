"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSuccess = sendSuccess;
exports.sendError = sendError;
/**
 * Sends a standardized success response.
 * @param res - Express response object
 * @param message - Success message
 * @param data - Response payload
 * @param statusCode - HTTP status code (default 200)
 */
function sendSuccess(res, message, data, statusCode = 200) {
    return res.status(statusCode).json({
        status: 'success',
        message,
        data,
    });
}
/**
 * Sends a standardized error response.
 * @param res - Express response object
 * @param message - Error message
 * @param statusCode - HTTP status code (default 500)
 */
function sendError(res, message, statusCode = 500) {
    return res.status(statusCode).json({
        status: 'error',
        message,
    });
}
//# sourceMappingURL=response.js.map