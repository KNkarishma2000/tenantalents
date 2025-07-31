export declare const DATABASE_NAMES: {
    readonly USER_SERVICE: "user_service_db";
    readonly PRODUCT_SERVICE: "product_service_db";
    readonly ORDER_SERVICE: "order_service_db";
    readonly RATING_SERVICE: "rating_service_db";
    readonly EMAIL_SERVICE: "email_service_db";
    readonly PAYMENT_SERVICE: "payment_service_db";
    readonly SEARCH_SERVICE: "search_service_db";
    readonly CART_SERVICE: "cart_service_db";
    readonly ADMIN_SERVICE: "admin_service_db";
    readonly INVOICE_SERVICE: "invoice_service_db";
    readonly ANALYTICS_SERVICE: "analytics_service_db";
    readonly VENDOR_SERVICE: "vendor_service_db";
};
export type DatabaseNameKey = keyof typeof DATABASE_NAMES;
export type DatabaseName = (typeof DATABASE_NAMES)[DatabaseNameKey];
