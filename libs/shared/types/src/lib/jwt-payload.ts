export type UserRole =
  | 'buyer'
  | 'seller'
  | 'admin'
  | 'super_admin'
  | 'buyer_seller';

export interface JwtPayload {
  sub: string;
  email: string;
  role: UserRole;
}
