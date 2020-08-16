"use strict";
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
var mongoose_1 = __importDefault(require("mongoose"));
var supertest_1 = __importDefault(require("supertest"));
var app_1 = require("../app");
var blog_1 = require("../models/blog");
var user_1 = require("../models/user");
var api = supertest_1.default(app_1.app);
var newUser = {
    "name": "a new User",
    "username": "nicksUserName",
    "password": "nicksPassword"
};
var savedNewUser = {
    "username": "nicksUserName",
    "password": "nicksPassword"
};
var initialBlogPosts = [
    {
        "title": "Blog title 1",
        "author": "Thanasis",
        "url": "aUrl",
        "likes": 24
    },
    {
        "title": "Blog title 2",
        "author": "Thanasis",
        "url": "aUrl",
        "likes": 24,
    }
];
var newPost = {
    "title": "Blog title 3",
    "author": "Third Author",
    "url": "aUrl of the third blog post",
    "likes": 14,
};
var token = "";
beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
    var body, blogObject;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, blog_1.Blog.deleteMany({})];
            case 1:
                _a.sent();
                return [4 /*yield*/, user_1.User.deleteOne({ usename: "nicksUserName" })
                    // create a new user
                ];
            case 2:
                _a.sent();
                // create a new user
                return [4 /*yield*/, api.post('/api/users').send(newUser)
                    // login the new user to get the token
                ];
            case 3:
                // create a new user
                _a.sent();
                return [4 /*yield*/, api.post('/api/login').send(savedNewUser)];
            case 4:
                body = (_a.sent()).body;
                token = body.token;
                blogObject = new blog_1.Blog(initialBlogPosts[0]);
                return [4 /*yield*/, blogObject.save()];
            case 5:
                _a.sent();
                blogObject = new blog_1.Blog(initialBlogPosts[1]);
                return [4 /*yield*/, blogObject.save()];
            case 6:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
test('blog posts are returned as json', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, api
                    .get('/api/blogs')
                    .expect(200)
                    .expect('Content-Type', /application\/json/)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
test('all blog posts are returned', function () { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, api.get('/api/blogs')];
            case 1:
                response = _a.sent();
                expect(response.body).toHaveLength(initialBlogPosts.length);
                return [2 /*return*/];
        }
    });
}); });
test('a specific blog post is within the returned blog posts', function () { return __awaiter(void 0, void 0, void 0, function () {
    var response, titles;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, api.get('/api/blogs')];
            case 1:
                response = _a.sent();
                titles = response.body.map(function (blog) { return blog.title; });
                expect(titles).toContain("Blog title 1");
                return [2 /*return*/];
        }
    });
}); });
test('all blog posts contain an "id" field', function () { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, api.get('/api/blogs')];
            case 1:
                response = _a.sent();
                response.body.forEach(function (blog) {
                    expect(blog.id).toBeDefined();
                });
                return [2 /*return*/];
        }
    });
}); });
test('a valid blog post can be added', function () { return __awaiter(void 0, void 0, void 0, function () {
    var response, titles;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, api
                    .post('/api/blogs')
                    .set('Authorization', "bearer " + token)
                    .send(newPost)
                    .expect(201)
                    .expect('Content-Type', /application\/json/)];
            case 1:
                _a.sent();
                return [4 /*yield*/, api.get('/api/blogs')];
            case 2:
                response = _a.sent();
                titles = response.body.map(function (blog) { return blog.title; });
                expect(response.body).toHaveLength(initialBlogPosts.length + 1);
                expect(titles).toContain("Blog title 3");
                return [2 /*return*/];
        }
    });
}); });
test('an unauthorized user can not add a valid blog post', function () { return __awaiter(void 0, void 0, void 0, function () {
    var response, titles;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, api
                    .post('/api/blogs')
                    .send(newPost)
                    .expect(401)];
            case 1:
                _a.sent();
                return [4 /*yield*/, api.get('/api/blogs')];
            case 2:
                response = _a.sent();
                titles = response.body.map(function (blog) { return blog.title; });
                expect(response.body).toHaveLength(initialBlogPosts.length);
                expect(titles).not.toContain("Blog title 3");
                return [2 /*return*/];
        }
    });
}); });
test('if likes property is missing likes are set to 0 by default', function () { return __awaiter(void 0, void 0, void 0, function () {
    var newPost, response, likes;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                newPost = {
                    "title": "Blog without likes",
                    "author": "Unliked Author",
                    "url": "aUrl ",
                };
                return [4 /*yield*/, api
                        .post('/api/blogs')
                        .set('Authorization', "bearer " + token)
                        .send(newPost)
                        .expect(201)
                        .expect('Content-Type', /application\/json/)];
            case 1:
                _a.sent();
                return [4 /*yield*/, api.get('/api/blogs')];
            case 2:
                response = _a.sent();
                likes = response.body.map(function (blog) { return blog.likes; });
                expect(response.body).toHaveLength(initialBlogPosts.length + 1);
                expect(likes).toContain(0);
                return [2 /*return*/];
        }
    });
}); });
test('if title and url propertes are missing the API responds with a 400 code and the post is not saved in the database', function () { return __awaiter(void 0, void 0, void 0, function () {
    var newPost, response, authors;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                newPost = {
                    "author": "Author of an untitled blogpost",
                    "likes": 22
                };
                return [4 /*yield*/, api
                        .post('/api/blogs')
                        .send(newPost)
                        .expect(400)];
            case 1:
                _a.sent();
                return [4 /*yield*/, api.get('/api/blogs')];
            case 2:
                response = _a.sent();
                authors = response.body.map(function (blog) { return blog.author; });
                expect(response.body).toHaveLength(initialBlogPosts.length);
                expect(authors).not.toContain("Author of an untitled blogpost");
                return [2 /*return*/];
        }
    });
}); });
test('a blog post can successfully be deleted', function () { return __awaiter(void 0, void 0, void 0, function () {
    var resp, idOfBlogToDelete, respAfterDelete, blogIds;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, api
                    .post('/api/blogs')
                    .set('Authorization', "bearer " + token)
                    .send(newPost)];
            case 1:
                _a.sent();
                return [4 /*yield*/, api.get('/api/blogs')];
            case 2:
                resp = _a.sent();
                expect(resp.body).toHaveLength(initialBlogPosts.length + 1);
                idOfBlogToDelete = resp.body[2].id;
                return [4 /*yield*/, api
                        .delete("/api/blogs/" + idOfBlogToDelete)
                        .set('Authorization', "bearer " + token)
                        .expect(204)];
            case 3:
                _a.sent();
                return [4 /*yield*/, api.get('/api/blogs')];
            case 4:
                respAfterDelete = _a.sent();
                blogIds = respAfterDelete.body.map(function (blog) { return blog.id; });
                expect(respAfterDelete.body).toHaveLength(resp.body.length - 1);
                expect(blogIds).not.toContain(idOfBlogToDelete);
                return [2 /*return*/];
        }
    });
}); });
afterAll(function () {
    mongoose_1.default.connection.close();
});
