import { Request, Response, Router } from 'express';
import { Blog } from '../models/blog';
import { User } from '../models/user';


export const testsRouter = Router()

// clears the test database for Cypress tests
testsRouter.post('/reset', async (req: Request, res: Response) => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    return res.status(204).end()
})

testsRouter.post('/reset-blogs', async (req: Request, res: Response) => {
    await Blog.deleteMany({})
    return res.status(204).end()
})
