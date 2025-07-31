import { randomUUID } from 'crypto';

export function generateFilename(prefix: string, extension: string): string {
  const uuid = randomUUID();
  return `${prefix}-${uuid}${extension}`;
}
