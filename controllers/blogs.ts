import { Request, Response, Router } from 'express';
import { Blog } from "../models/blog"
import { runInNewContext } from 'vm';

export const blogsRouter = Router()

blogsRouter.get('/', async (_: Request, res: Response) => {
    const blogs = await Blog.find({})
    res.json(blogs)
})

blogsRouter.post('/', async (req: Request, res: Response) => {
    if (!req.body.url && !req.body.title) {
        return res.status(400).end()
    } else {
        const blog = new Blog({ ...req.body, likes: req.body.likes || 0 })
        const result = await blog.save()
        res.status(201).json(result)
    }
})


blogsRouter.put('/:id', async (req: Request, res: Response) => {
    const { title, author, url, likes } = req.body
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, { title, author, url, likes }, { new: true })
    res.json(updatedBlog)
})

blogsRouter.delete("/:id", async (req: Request, res: Response) => {
    const deletedPost = await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()
})