import mongoose from 'mongoose'
import supertest from 'supertest'
import { app } from '../app'
import { User, IUser } from '../models/user'
import { WRONG_PASSWORD } from '../controllers/users'
const api = supertest(app)


const initialUsers = [
    {
        name: "Name of user 1",
        username: "Username of user 1",
        password: "password of user 1"
    },
    {
        name: "Name of user 2",
        username: "Username of user 2",
        password: "password of user 2"
    }
]

beforeEach(async () => {
    await User.deleteMany({})

    let userObject = new User(initialUsers[0])
    await userObject.save()

    userObject = new User(initialUsers[1])
    await userObject.save()
})

test('if the password is missing the API responds with a 400 code and the user is not added to the database', async () => {
    const newUser = {
        name: "Name of user 3",
        username: "Username of user without password",
    }

    const { body: { error } } = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    expect(error).toEqual(WRONG_PASSWORD)

    const response = await api.get('/api/users')

    const userNames = response.body.map((user: IUser) => user.username)

    expect(response.body).toHaveLength(initialUsers.length)
    expect(userNames).not.toContain("Username of user without password")
})

test('if the username is missing the API responds with a 400 code and the user is not added to the database', async () => {
    const newUser = {
        name: "Name of user without password",
        password: "Password of user with a username"
    }

    const { body: { error } } = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)


    expect(error).toEqual('Path `username` is required.')


    const response = await api.get('/api/users')

    const names = response.body.map((user: IUser) => user.name)

    expect(response.body).toHaveLength(initialUsers.length)
    expect(names).not.toContain("Name of user without password")
})

test('if the username is already being used the API responds with a 400 code, with the correct error message and the user is not added to the database', async () => {
    const newUser = {
        name: "Name of user without password",
        password: "password of user without username",
        username: "Username of user 1"
    }

    const { body: { error } } = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    expect(error).toEqual("Error, expected `username` to be unique. Value: `Username of user 1`")

    const response = await api.get('/api/users')

    const names = response.body.map((user: IUser) => user.name)

    expect(response.body).toHaveLength(initialUsers.length)
    expect(names).not.toContain("Name of user without password")
})


afterAll(() => {
    mongoose.connection.close()
})