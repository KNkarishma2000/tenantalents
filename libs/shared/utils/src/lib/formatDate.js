"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = void 0;
const formatDate = (date = new Date()) => date.toISOString();
exports.formatDate = formatDate;
// ✅ Benefits: Standard logging format for OpenTelemetry, Loki, and timestamps in events.
//# sourceMappingURL=formatDate.js.map