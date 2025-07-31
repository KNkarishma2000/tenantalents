export const ROLES = [
  'buyer',
  'seller',
  'buyer_seller',
  'admin',
  'super_admin',
] as const;

export type Role = (typeof ROLES)[number];
