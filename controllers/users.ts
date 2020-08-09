import bcrypt from 'bcrypt'
import { User } from '../models/user'
import { Request, Response, Router } from 'express';

export const WRONG_PASSWORD = 'name and password must be at least 3 characters long'

export const usersRouter = Router()

usersRouter.post('/', async (req: Request, res: Response) => {
    const { name, username, password } = req.body

    if (!password || password.length < 3) {
        return res.status(400).json({
            error: WRONG_PASSWORD
        })
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({ username, name, passwordHash })


    const savedUser = await user.save()
    res.json(savedUser)

})

usersRouter.get('/', async (_: Request, res: Response) => {
    const users = await User.find({})
    res.json(users)

})