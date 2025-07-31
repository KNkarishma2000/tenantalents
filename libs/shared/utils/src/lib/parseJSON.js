"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeParseJSON = void 0;
const safeParseJSON = (str) => {
    try {
        return JSON.parse(str);
    }
    catch {
        return null;
    }
};
exports.safeParseJSON = safeParseJSON;
// ✅ Benefits: Prevents service crashes when receiving malformed JSON.
//# sourceMappingURL=parseJSON.js.map