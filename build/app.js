"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
//https://dev.to/aryanshmahato/setup-node-express-with-typescript-3bho
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var tokerExtractor_1 = require("./middlewares/tokerExtractor");
// https://fullstackopen.com/en/part4/testing_the_backend#eliminating-the-try-catch
require('express-async-errors');
var blogs_1 = require("./controllers/blogs");
var users_1 = require("./controllers/users");
var login_1 = require("./controllers/login");
var tests_1 = require("./controllers/tests");
var config_1 = require("./utils/config");
var logger_1 = require("./utils/logger");
exports.app = express_1.default();
logger_1.info('connecting to', config_1.MONGODB_URI);
mongoose_1.default.connect(config_1.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
exports.app.use(cors_1.default());
exports.app.use(express_1.default.json());
exports.app.use(tokerExtractor_1.tokenExtractor);
exports.app.use('/api/login', login_1.loginRouter);
exports.app.use('/api/users', users_1.usersRouter);
exports.app.use('/api/blogs', blogs_1.blogsRouter);
exports.app.use('/api/testing', tests_1.testsRouter);
var errorHandler = function (error, _, response, next) {
    var _a;
    if (error.name === 'CastError') {
        return response.status(400).send({
            error: 'malformatted id'
        });
    }
    else if (error.name === 'ValidationError') {
        // we expect an error when username is not provided or it is less than 3 characters or it is already in use
        response.status(400).json({ "error": (_a = error.errors['username']) === null || _a === void 0 ? void 0 : _a.message });
    }
    else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({
            error: 'invalid token'
        });
    }
    next(error);
};
exports.app.use(errorHandler);
