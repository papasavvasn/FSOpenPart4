"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mostLikes = exports.mostBlogs = exports.favoriteBlog = exports.totalLikes = exports.dummy = void 0;
exports.dummy = function (blogs) { return 1; };
exports.totalLikes = function (blogs) {
    return blogs.reduce(function (acc, blog) { return blog ? acc + blog.likes : 0; }, 0);
};
exports.favoriteBlog = function (blogs) {
    var maxLikes = 0;
    var favoriteBlog = undefined;
    if (blogs.length) {
        blogs.forEach(function (blog) {
            if (blog.likes > maxLikes) {
                maxLikes = blog.likes;
                favoriteBlog = blog;
            }
        });
    }
    return favoriteBlog;
};
var incrementByOne = function (blog) { return 1; };
var incrementByLikes = function (blog) { return blog.likes; };
var findAuthorWithMostOfSomething = function (blogs, incrementor) {
    var authorWithMostOfSomething = undefined;
    var mostOfSomething = 0;
    var authorsAndSomething = {};
    if (!blogs.length)
        return;
    blogs.forEach(function (blog) {
        if (!authorsAndSomething[blog.author]) {
            authorsAndSomething[blog.author] = { something: incrementor(blog) };
        }
        else {
            authorsAndSomething[blog.author].something += incrementor(blog);
        }
        if (authorsAndSomething[blog.author].something > mostOfSomething) {
            mostOfSomething = authorsAndSomething[blog.author].something;
            authorWithMostOfSomething = blog.author;
        }
    });
    return authorWithMostOfSomething;
};
exports.mostBlogs = function (blogs) { return findAuthorWithMostOfSomething(blogs, incrementByOne); };
exports.mostLikes = function (blogs) { return findAuthorWithMostOfSomething(blogs, incrementByLikes); };
