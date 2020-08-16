"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGODB_URI = exports.PORT = void 0;
//https://dev.to/aryanshmahato/setup-node-express-with-typescript-3bho
require('dotenv').config();
exports.PORT = process.env.PORT;
exports.MONGODB_URI = process.env.MONGODB_URI;
if (process.env.NODE_ENV === 'test') {
    exports.MONGODB_URI = process.env.TEST_MONGODB_URI;
}
