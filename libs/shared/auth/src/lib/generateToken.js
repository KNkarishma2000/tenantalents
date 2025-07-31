"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("./jwt");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// Load .env from root
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../../../..', '.env') });
const JWT_SECRET = process.env.JWT_SECRET || 'super_secret';
if (!JWT_SECRET || JWT_SECRET === 'super_secret') {
    console.error('❌ JWT_SECRET not set correctly in .env');
    process.exit(1);
}
const payload = {
    userId: 'abc123',
    email: 'admin@example.com',
    role: 'super_admin',
};
const token = (0, jwt_1.signToken)(payload, JWT_SECRET, '1h');
console.log('\n🔐 Generated JWT Token:\n');
console.log(token);
console.log('\n👉 Use in Authorization header:\n');
console.log(`Authorization: Bearer ${token}`);
//# sourceMappingURL=generateToken.js.map