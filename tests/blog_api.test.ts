import mongoose from 'mongoose'
import supertest from 'supertest'
import { app } from '../app'
import { Blog, IBlog } from '../models/blog'
const api = supertest(app)


const initialBlogPosts = [
    {
        "title": "Blog title 1",
        "author": "Thanasis",
        "url": "aUrl",
        "likes": 24,
    },
    {
        "title": "Blog title 2",
        "author": "Thanasis",
        "url": "aUrl",
        "likes": 24,
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})

    let blogObject = new Blog(initialBlogPosts[0])
    await blogObject.save()

    blogObject = new Blog(initialBlogPosts[1])
    await blogObject.save()
})


test('blog posts are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blog posts are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogPosts.length)
})

test('a specific blog post is within the returned blog posts', async () => {
    const response = await api.get('/api/blogs')
    const titles = response.body.map((blog: IBlog) => blog.title)
    expect(titles).toContain(
        "Blog title 1"
    )
})

test('all blog posts contain an "id" field', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach((blog: IBlog) => {
        expect(blog.id).toBeDefined()
    })
})

test('a valid blog post can be added', async () => {
    const newPost = {
        "title": "Blog title 3",
        "author": "Third Author",
        "url": "aUrl of the third blog post",
        "likes": 14,
    }

    await api
        .post('/api/blogs')
        .send(newPost)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const titles = response.body.map((blog: IBlog) => blog.title)

    expect(response.body).toHaveLength(initialBlogPosts.length + 1)
    expect(titles).toContain(
        "Blog title 3",
    )
})

test('if likes property is missing likes are set to 0 by default', async () => {
    const newPost = {
        "title": "Blog without likes",
        "author": "Unliked Author",
        "url": "aUrl ",
    }

    await api
        .post('/api/blogs')
        .send(newPost)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const likes = response.body.map((blog: IBlog) => blog.likes)

    expect(response.body).toHaveLength(initialBlogPosts.length + 1)
    expect(likes).toContain(0)
})

test('if title and url propertes are missing the API responds with a 400 code and the post is not saved in the database', async () => {
    const newPost = {
        "author": "Author of an untitled blogpost",
        "likes": 22
    }

    await api
        .post('/api/blogs')
        .send(newPost)
        .expect(400)

    const response = await api.get('/api/blogs')

    const authors = response.body.map((blog: IBlog) => blog.author)

    expect(response.body).toHaveLength(initialBlogPosts.length)
    expect(authors).not.toContain("Author of an untitled blogpost")
})

test('a blog post can successfully be deleted', async () => {

    let resp = await api.get('/api/blogs')

    const idOfBlogToDelete = resp.body[0].id

    await api
        .delete(`/api/blogs/${idOfBlogToDelete}`)
        .expect(204)

    let respAfterDelete = await api.get('/api/blogs')

    const blogIds = respAfterDelete.body.map((blog: IBlog) => blog.id)

    expect(respAfterDelete.body).toHaveLength(initialBlogPosts.length - 1)
    expect(blogIds).not.toContain(idOfBlogToDelete)
})

afterAll(() => {
    mongoose.connection.close()
})