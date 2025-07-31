import { sleep } from './sleep';

/**
 * Retries a promise-returning function in case of failure.
 *
 * @param fn - The async function to retry.
 * @param attempts - Number of retry attempts (default: 3).
 * @param delayMs - Delay between retries in milliseconds (default: 1000).
 * @returns The resolved value of the function if successful.
 * @throws The last error encountered if all retries fail.
 */
export const retry = async <T>(
  fn: () => Promise<T>,
  attempts = 3,
  delayMs = 1000
): Promise<T> => {
  let lastError: unknown;

  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (i < attempts - 1) {
        await sleep(delayMs);
      }
    }
  }

  throw lastError;
};
