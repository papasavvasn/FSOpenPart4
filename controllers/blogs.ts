import { Request, Response, Router } from 'express';
import { Blog } from "../models/blog"

export const blogsRouter = Router()

blogsRouter.get('/', (_: Request, res: Response) => {
    Blog
        .find({})
        .then(blogs => { res.json(blogs) })
})

blogsRouter.post('/', (req: Request, res: Response) => {
    const blog = new Blog(req.body)

    blog.save().then(result => {
        res.status(201).json(result)
    })
})
