//https://dev.to/aryanshmahato/setup-node-express-with-typescript-3bho
import cors from "cors"
import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose"
import { tokenExtractor } from "./middlewares/tokerExtractor"
// https://fullstackopen.com/en/part4/testing_the_backend#eliminating-the-try-catch
require('express-async-errors')
import { blogsRouter } from "./controllers/blogs"
import { usersRouter } from './controllers/users'
import { loginRouter } from './controllers/login'
import { testsRouter } from './controllers/tests'
import { MONGODB_URI } from "./utils/config"
import { info } from "./utils/logger"


export const app = express()

info('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI as string, { useNewUrlParser: true, useUnifiedTopology: true })

app.use(cors())
app.use(express.json())
app.use(tokenExtractor as any)

app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/blogs', blogsRouter)

if (process.env.NODE_ENV === 'test') {
    app.use('/api/testing', testsRouter)
}


const errorHandler = (error: Error, _: Request, response: Response, next: NextFunction) => {
    if (error.name === 'CastError') {
        return response.status(400).send({
            error: 'malformatted id'
        })
    } else if (error.name === 'ValidationError') {
        // we expect an error when username is not provided or it is less than 3 characters or it is already in use
        response.status(400).json({ "error": (error as any).errors['username']?.message })
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({
            error: 'invalid token'
        })
    }


    next(error)
}

app.use(errorHandler)
