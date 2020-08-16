"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var list_helper_1 = require("../utils/list_helper");
test('dummy returns one', function () {
    var blogs = [];
    var result = list_helper_1.dummy(blogs);
    expect(result).toBe(1);
});
var blogs = [{ _id: "5a422a851b54a676234d17f7", title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7, __v: 0 },
    { _id: "5a422aa71b54a676234d17f8", title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", likes: 5, __v: 0 },
    { _id: "5a422b3a1b54a676234d17f9", title: "Canonical string reduction", author: "Edsger W. Dijkstra", url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", likes: 12, __v: 0 },
    { _id: "5a422b891b54a676234d17fa", title: "First class tests", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", likes: 10, __v: 0 },
    { _id: "5a422ba71b54a676234d17fb", title: "TDD harms architecture", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", likes: 0, __v: 0 },
    { _id: "5a422bc61b54a676234d17fc", title: "Type wars", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", likes: 2, __v: 0 }
];
describe('totalLikes', function () {
    test('of empty list is zero', function () {
        var blogs = [];
        expect(list_helper_1.totalLikes(blogs)).toBe(0);
    });
    test('when list has only one blog equals the likes of that', function () {
        var listWithOneBlog = [
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                likes: 5,
                __v: 0
            }
        ];
        expect(list_helper_1.totalLikes(listWithOneBlog)).toBe(5);
    });
    test('of a bigger list is calculated right', function () {
        expect(list_helper_1.totalLikes(blogs)).toBe(36);
    });
});
describe('favoriteBlog', function () {
    test('of empty list is undefined', function () {
        var blogs = [];
        expect(list_helper_1.favoriteBlog(blogs)).toBe(undefined);
    });
    test('when list has only one blog it returns that one', function () {
        var listWithOneBlog = [
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                likes: 5,
                __v: 0
            }
        ];
        expect(list_helper_1.favoriteBlog(listWithOneBlog)).toEqual(listWithOneBlog[0]);
    });
    test('if finds the correct blog in a bigger list', function () {
        expect(list_helper_1.favoriteBlog(blogs)).toEqual(blogs[2]);
    });
});
describe('mostBlogs', function () {
    test('of empty list is undefined', function () {
        var blogs = [];
        expect(list_helper_1.mostBlogs(blogs)).toBe(undefined);
    });
    test('when the list has only one blog it returns the author of that blog', function () {
        var listWithOneBlog = [
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                likes: 5,
                __v: 0
            }
        ];
        expect(list_helper_1.mostBlogs(listWithOneBlog)).toBe('Edsger W. Dijkstra');
    });
    test('if finds correctly the author with the most blogs in a bigger list of posts', function () {
        expect(list_helper_1.mostBlogs(blogs)).toBe("Robert C. Martin");
    });
});
describe('mostLikes', function () {
    test('of empty list is undefined', function () {
        var blogs = [];
        expect(list_helper_1.mostLikes(blogs)).toBe(undefined);
    });
    test('when the list has only one blog it returns the author of that blog', function () {
        var listWithOneBlog = [
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                likes: 5,
                __v: 0
            }
        ];
        expect(list_helper_1.mostLikes(listWithOneBlog)).toBe('Edsger W. Dijkstra');
    });
    test('if finds correctly the author with the most liked blogs in a bigger list of posts', function () {
        expect(list_helper_1.mostLikes(blogs)).toBe("Edsger W. Dijkstra");
    });
});
