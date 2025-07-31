import 'jest';
import { generateFilename } from '../lib/generate-filename.util';

describe('generateFilename', () => {
  it('should generate filename with prefix and extension', () => {
    const filename = generateFilename('avatar', '.jpg');
    expect(filename).toMatch(/^avatar-[a-f0-9-]{36}\.jpg$/);
  });
});
