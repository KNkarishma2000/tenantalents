"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSuperAdmin = exports.isAdmin = exports.isBuyerSeller = exports.isSeller = exports.isBuyer = exports.ROLES = void 0;
// Define constant ROLES object
exports.ROLES = {
    BUYER: 'buyer',
    SELLER: 'seller',
    BUYER_SELLER: 'buyer_seller',
    ADMIN: 'admin',
    SUPER_ADMIN: 'super_admin',
};
// ✅ Role-check helpers using ROLES constant
const isBuyer = (user) => user?.role === exports.ROLES.BUYER;
exports.isBuyer = isBuyer;
const isSeller = (user) => user?.role === exports.ROLES.SELLER;
exports.isSeller = isSeller;
const isBuyerSeller = (user) => user?.role === exports.ROLES.BUYER_SELLER;
exports.isBuyerSeller = isBuyerSeller;
const isAdmin = (user) => user?.role === exports.ROLES.ADMIN;
exports.isAdmin = isAdmin;
const isSuperAdmin = (user) => user?.role === exports.ROLES.SUPER_ADMIN;
exports.isSuperAdmin = isSuperAdmin;
//# sourceMappingURL=types.js.map