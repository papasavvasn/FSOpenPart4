import { IBlog } from "../models/blog";

export const dummy = (blogs: IBlog[]) => 1

export const totalLikes = (blogs: IBlog[]) =>
    blogs.reduce((acc, blog) => blog ? acc + blog.likes : 0, 0)

export const favoriteBlog = (blogs: IBlog[]) => {
    let maxLikes = 0
    let favoriteBlog: IBlog | undefined = undefined
    if (blogs.length) {
        blogs.forEach(blog => {
            if (blog.likes > maxLikes) {
                maxLikes = blog.likes
                favoriteBlog = blog
            }
        })
    }
    return favoriteBlog
}

interface AuthorAndSomethingCount {
    [key: string]: {
        something: number;
    }
}

const incrementByOne = (blog: IBlog) => 1
const incrementByLikes = (blog: IBlog) => blog.likes

const findAuthorWithMostOfSomething = (blogs: IBlog[], incrementor: (blog: IBlog) => number) => {

    let authorWithMostOfSomething = undefined
    let mostOfSomething = 0;
    const authorsAndSomething: AuthorAndSomethingCount = {}

    if (!blogs.length) return

    blogs.forEach(blog => {
        if (!authorsAndSomething[blog.author]) {
            authorsAndSomething[blog.author] = { something: incrementor(blog) }
        } else {
            authorsAndSomething[blog.author].something += incrementor(blog)
        }
        if (authorsAndSomething[blog.author].something > mostOfSomething) {
            mostOfSomething = authorsAndSomething[blog.author].something
            authorWithMostOfSomething = blog.author
        }
    })
    return authorWithMostOfSomething
}

export const mostBlogs = (blogs: IBlog[]) => findAuthorWithMostOfSomething(blogs, incrementByOne)
export const mostLikes = (blogs: IBlog[]) => findAuthorWithMostOfSomething(blogs, incrementByLikes)