"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//https://dev.to/aryanshmahato/setup-node-express-with-typescript-3bho
require('dotenv').config();
var http = require('http');
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var mongoose_1 = __importStar(require("mongoose"));
var app = express_1.default();
var blogSchema = new mongoose_1.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
});
var Blog = mongoose_1.default.model('Blog', blogSchema);
var mongoUrl = process.env.MONGODB_URI;
mongoose_1.default.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
app.use(cors_1.default());
app.use(express_1.default.json());
app.get('/api/blogs', function (req, res) {
    Blog
        .find({})
        .then(function (blogs) { res.json(blogs); });
});
app.post('/api/blogs', function (req, res) {
    var blog = new Blog(req.body);
    blog.save().then(function (result) {
        res.status(201).json(result);
    });
});
var PORT = 3003;
app.listen(PORT, function () {
    console.log("Server running on port " + PORT);
});
