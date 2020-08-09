import { Request, Response, Router } from 'express';
import { Blog } from "../models/blog"
import { User } from '../models/user';

export const blogsRouter = Router()

blogsRouter.get('/', async (_: Request, res: Response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    res.json(blogs)
})

blogsRouter.post('/', async (req: Request, res: Response) => {
    const { title, url, likes } = req.body
    if (!url && !title) {
        return res.status(400).end()
    } else {
        const user = await User.findById(req.body.user)
        const blog = new Blog({ ...req.body, user: user?._id, likes: likes || 0 })
        const savedBlog = await blog.save();
        (user as any).blogs = (user as any)?.blogs?.concat(savedBlog._id)
        await user?.save()
        res.status(201).json(savedBlog)
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