"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSuccess = void 0;
__exportStar(require("./lib/env"), exports);
__exportStar(require("./lib/sleep"), exports);
__exportStar(require("./lib/retry"), exports);
__exportStar(require("./lib/uuid"), exports);
__exportStar(require("./lib/formatDate"), exports);
__exportStar(require("./lib/parseJSON"), exports);
__exportStar(require("./lib/hash"), exports);
__exportStar(require("./lib/validator"), exports);
__exportStar(require("./lib/response"), exports);
__exportStar(require("./lib/invoice-generator"), exports);
const sendSuccess = (res, message, data) => {
    return res.status(200).json({ success: true, message, data });
};
exports.sendSuccess = sendSuccess;
// ✅ Benefits: Clean and organized imports like:
//# sourceMappingURL=index.js.map