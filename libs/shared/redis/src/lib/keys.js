"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_TTL = exports.RedisKey = void 0;
var RedisKey;
(function (RedisKey) {
    RedisKey["USER_PROFILE"] = "user:profile:";
    RedisKey["PRODUCT_DETAIL"] = "product:detail:";
    RedisKey["ORDER_SUMMARY"] = "order:summary:";
    RedisKey["CART_CONTENT"] = "cart:content:";
    RedisKey["RATING_SUMMARY"] = "rating:summary:";
})(RedisKey || (exports.RedisKey = RedisKey = {}));
exports.DEFAULT_TTL = 60 * 60; // 1 hour
//# sourceMappingURL=keys.js.map