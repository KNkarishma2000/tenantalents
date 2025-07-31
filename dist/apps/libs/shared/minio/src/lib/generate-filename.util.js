import { randomUUID } from 'crypto';
export function generateFilename(prefix, extension) {
    const uuid = randomUUID();
    return `${prefix}-${uuid}${extension}`;
}
//# sourceMappingURL=generate-filename.util.js.map