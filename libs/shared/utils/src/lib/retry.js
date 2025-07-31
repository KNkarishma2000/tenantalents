"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retry = void 0;
const sleep_1 = require("./sleep");
/**
 * Retries a promise-returning function in case of failure.
 *
 * @param fn - The async function to retry.
 * @param attempts - Number of retry attempts (default: 3).
 * @param delayMs - Delay between retries in milliseconds (default: 1000).
 * @returns The resolved value of the function if successful.
 * @throws The last error encountered if all retries fail.
 */
const retry = async (fn, attempts = 3, delayMs = 1000) => {
    let lastError;
    for (let i = 0; i < attempts; i++) {
        try {
            return await fn();
        }
        catch (err) {
            lastError = err;
            if (i < attempts - 1) {
                await (0, sleep_1.sleep)(delayMs);
            }
        }
    }
    throw lastError;
};
exports.retry = retry;
//# sourceMappingURL=retry.js.map