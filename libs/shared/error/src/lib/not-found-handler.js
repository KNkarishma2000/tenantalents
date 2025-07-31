"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = void 0;
const api_error_1 = require("./api-error");
const notFoundHandler = (req, _res, next) => {
    const message = `🔍 Not Found - ${req.originalUrl}`;
    next(new api_error_1.ApiError(404, message));
};
exports.notFoundHandler = notFoundHandler;
//# sourceMappingURL=not-found-handler.js.map