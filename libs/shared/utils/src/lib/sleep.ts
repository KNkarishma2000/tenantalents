/**
 * Delays execution for a given number of milliseconds.
 *
 * @param ms - Milliseconds to wait.
 * @returns A Promise that resolves after the delay.
 */
export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

// ✅ Benefits: Simplifies writing retry loops, rate-limited logic, polling operations, or test delays.
