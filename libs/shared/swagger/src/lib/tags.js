"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagMap = void 0;
exports.getTagsByService = getTagsByService;
const admin_tags_1 = require("./tags/admin.tags");
const analytics_tags_1 = require("./tags/analytics.tags");
const cart_tags_1 = require("./tags/cart.tags");
const email_tags_1 = require("./tags/email.tags");
const invoice_tags_1 = require("./tags/invoice.tags");
const order_tags_1 = require("./tags/order.tags");
const payment_tags_1 = require("./tags/payment.tags");
const product_tags_1 = require("./tags/product.tags");
const rating_tags_1 = require("./tags/rating.tags");
const search_tags_1 = require("./tags/search.tags");
const user_tags_1 = require("./tags/user.tags");
const vendor_tags_1 = require("./tags/vendor.tags");
exports.tagMap = {
    admin: admin_tags_1.tags,
    analytics: analytics_tags_1.tags,
    cart: cart_tags_1.tags,
    email: email_tags_1.tags,
    invoice: invoice_tags_1.tags,
    order: order_tags_1.tags,
    payment: payment_tags_1.tags,
    product: product_tags_1.tags,
    rating: rating_tags_1.tags,
    search: search_tags_1.tags,
    user: user_tags_1.tags,
    vendor: vendor_tags_1.tags,
};
function getTagsByService(service) {
    return exports.tagMap[service] || [];
}
//# sourceMappingURL=tags.js.map