"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRouter = void 0;
var express_1 = require("express");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var blog_1 = require("../models/blog");
var user_1 = require("../models/user");
exports.blogsRouter = express_1.Router();
exports.blogsRouter.get('/', function (_, res) { return __awaiter(void 0, void 0, void 0, function () {
    var blogs;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, blog_1.Blog.find({}).populate('user', { username: 1, name: 1 })];
            case 1:
                blogs = _a.sent();
                res.json(blogs);
                return [2 /*return*/];
        }
    });
}); });
exports.blogsRouter.post('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, url, likes, token, decodedToken, user, blog, savedBlog;
    var _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = req.body, title = _a.title, url = _a.url, likes = _a.likes;
                if (!(!url && !title)) return [3 /*break*/, 1];
                return [2 /*return*/, res.status(400).end()];
            case 1:
                token = req.token;
                decodedToken = jsonwebtoken_1.default.verify(token, process.env.SECRET);
                if (!token || !decodedToken.id) {
                    return [2 /*return*/, res.status(401).json({ error: 'token missing or invalid' })];
                }
                return [4 /*yield*/, user_1.User.findById(decodedToken.id)];
            case 2:
                user = _d.sent();
                blog = new blog_1.Blog(__assign(__assign({}, req.body), { user: user === null || user === void 0 ? void 0 : user._id, likes: likes || 0 }));
                return [4 /*yield*/, blog.save()];
            case 3:
                savedBlog = _d.sent();
                user.blogs = (_c = (_b = user) === null || _b === void 0 ? void 0 : _b.blogs) === null || _c === void 0 ? void 0 : _c.concat(savedBlog._id);
                return [4 /*yield*/, (user === null || user === void 0 ? void 0 : user.save())];
            case 4:
                _d.sent();
                res.status(201).json(savedBlog);
                _d.label = 5;
            case 5: return [2 /*return*/];
        }
    });
}); });
exports.blogsRouter.delete("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, decodedToken, userId, postToDelete, authorId, deletedPost;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                token = req.token;
                decodedToken = jsonwebtoken_1.default.verify(token, process.env.SECRET);
                userId = decodedToken.id;
                return [4 /*yield*/, blog_1.Blog.findById(req.params.id)];
            case 1:
                postToDelete = _c.sent();
                if (!postToDelete)
                    return [2 /*return*/, res.status(404).end()];
                authorId = (_b = (_a = postToDelete) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.toString();
                if (!(userId === authorId)) return [3 /*break*/, 3];
                return [4 /*yield*/, blog_1.Blog.findByIdAndRemove(req.params.id)];
            case 2:
                deletedPost = _c.sent();
                return [2 /*return*/, res.status(204).end()];
            case 3: return [2 /*return*/, res.status(401).end()];
        }
    });
}); });
exports.blogsRouter.put('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, author, url, likes, updatedBlog;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, title = _a.title, author = _a.author, url = _a.url, likes = _a.likes;
                return [4 /*yield*/, blog_1.Blog.findByIdAndUpdate(req.params.id, { title: title, author: author, url: url, likes: likes }, { new: true })];
            case 1:
                updatedBlog = _b.sent();
                res.json(updatedBlog);
                return [2 /*return*/];
        }
    });
}); });
