export const DATABASE_NAMES = {
  USER_SERVICE: 'user_service_db',
  PRODUCT_SERVICE: 'product_service_db',
  ORDER_SERVICE: 'order_service_db',
  RATING_SERVICE: 'rating_service_db',
  EMAIL_SERVICE: 'email_service_db',
  PAYMENT_SERVICE: 'payment_service_db',
  SEARCH_SERVICE: 'search_service_db',
  CART_SERVICE: 'cart_service_db',
  ADMIN_SERVICE: 'admin_service_db',
  INVOICE_SERVICE: 'invoice_service_db',
  ANALYTICS_SERVICE: 'analytics_service_db',
  VENDOR_SERVICE: 'vendor_service_db',
} as const;

export type DatabaseNameKey = keyof typeof DATABASE_NAMES;
export type DatabaseName = (typeof DATABASE_NAMES)[DatabaseNameKey];
