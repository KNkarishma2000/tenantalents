import 'jest';
import { generateObjectPath } from '../lib/generate-path.util';

describe('generateObjectPath', () => {
  it('should return a combined object path', () => {
    const path = generateObjectPath('users/avatars/', 'avatar-uuid.jpg');
    expect(path).toBe('users/avatars/avatar-uuid.jpg');
  });
});
