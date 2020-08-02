//https://dev.to/aryanshmahato/setup-node-express-with-typescript-3bho
require('dotenv').config()
const http = require('http')
import express, { Request, Response } from 'express';
import cors from "cors";
import mongoose, { Schema, Document } from 'mongoose';

const app = express()

export interface IBlog extends Document {
    title: string;
    author: string;
    url: string;
    likes: number;
}

const blogSchema: Schema = new Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

const Blog = mongoose.model<IBlog>('Blog', blogSchema)

const mongoUrl = process.env.MONGODB_URI as string
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })

app.use(cors())
app.use(express.json())

app.get('/api/blogs', (req: Request, res: Response) => {
    Blog
        .find({})
        .then(blogs => { res.json(blogs) })
})

app.post('/api/blogs', (req: Request, res: Response) => {
    const blog = new Blog(req.body)

    blog.save().then(result => {
        res.status(201).json(result)
    })
})

const PORT = 3003
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})