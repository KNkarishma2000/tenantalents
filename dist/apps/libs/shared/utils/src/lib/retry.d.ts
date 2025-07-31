/**
 * Retries a promise-returning function in case of failure.
 *
 * @param fn - The async function to retry.
 * @param attempts - Number of retry attempts (default: 3).
 * @param delayMs - Delay between retries in milliseconds (default: 1000).
 * @returns The resolved value of the function if successful.
 * @throws The last error encountered if all retries fail.
 */
export declare const retry: <T>(fn: () => Promise<T>, attempts?: number, delayMs?: number) => Promise<T>;
