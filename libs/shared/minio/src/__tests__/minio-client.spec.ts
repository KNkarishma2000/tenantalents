import 'jest';
import { minioClient } from '../lib/minio-client';

describe('minioClient', () => {
  it('should be defined and have basic methods', () => {
    expect(minioClient).toBeDefined();
    expect(minioClient).toHaveProperty('makeBucket');
    expect(minioClient).toHaveProperty('putObject');
  });
});
