"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = void 0;
/**
 * Delays execution for a given number of milliseconds.
 *
 * @param ms - Milliseconds to wait.
 * @returns A Promise that resolves after the delay.
 */
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
exports.sleep = sleep;
// ✅ Benefits: Simplifies writing retry loops, rate-limited logic, polling operations, or test delays.
//# sourceMappingURL=sleep.js.map