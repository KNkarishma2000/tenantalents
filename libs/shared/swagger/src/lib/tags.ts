import { tags as admin } from './tags/admin.tags';
import { tags as analytics } from './tags/analytics.tags';
import { tags as cart } from './tags/cart.tags';
import { tags as email } from './tags/email.tags';
import { tags as invoice } from './tags/invoice.tags';
import { tags as order } from './tags/order.tags';
import { tags as payment } from './tags/payment.tags';
import { tags as product } from './tags/product.tags';
import { tags as rating } from './tags/rating.tags';
import { tags as search } from './tags/search.tags';
import { tags as user } from './tags/user.tags';
import { tags as vendor } from './tags/vendor.tags';

export const tagMap: Record<string, any[]> = {
  admin,
  analytics,
  cart,
  email,
  invoice,
  order,
  payment,
  product,
  rating,
  search,
  user,
  vendor,
};

export function getTagsByService(service: string): any[] {
  return tagMap[service] || [];
}
