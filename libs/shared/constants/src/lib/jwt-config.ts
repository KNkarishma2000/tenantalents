export const JWT_CONFIG = {
  secret: process.env.JWT_SECRET || 'default_jwt_secret',
  expiresIn: '1d',
};
