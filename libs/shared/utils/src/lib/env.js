"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnv = void 0;
const getEnv = (key, fallback) => {
    const value = process.env[key] || fallback;
    if (!value)
        throw new Error(`Missing environment variable: ${key}`);
    return value;
};
exports.getEnv = getEnv;
//✅ Benefits: Prevents silent misconfigurations; one place for fallback/defaults.
//# sourceMappingURL=env.js.map