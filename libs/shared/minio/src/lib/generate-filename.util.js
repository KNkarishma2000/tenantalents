"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFilename = generateFilename;
const crypto_1 = require("crypto");
function generateFilename(prefix, extension) {
    const uuid = (0, crypto_1.randomUUID)();
    return `${prefix}-${uuid}${extension}`;
}
//# sourceMappingURL=generate-filename.util.js.map