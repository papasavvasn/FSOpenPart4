//https://dev.to/aryanshmahato/setup-node-express-with-typescript-3bho
import cors from "cors"
import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose"
// https://fullstackopen.com/en/part4/testing_the_backend#eliminating-the-try-catch
require('express-async-errors')
import { blogsRouter } from "./controllers/blogs"
import { usersRouter } from './controllers/users'
import { MONGODB_URI } from "./utils/config"
import { info } from "./utils/logger"

export const app = express()

info('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI as string, { useNewUrlParser: true, useUnifiedTopology: true })

app.use(cors())
app.use(express.json())

app.use('/api/users', usersRouter)
app.use('/api/blogs', blogsRouter)

const errorHandler = (error: Error, _: Request, response: Response, next: NextFunction) => {

    if (error.name === 'ValidationError') {
        // we expect an error when username is not provided or it is less than 3 characters or it is already in use
        response.status(400).json({ "error": (error as any).errors['username']?.message })
    }


    next(error)
}

app.use(errorHandler)
