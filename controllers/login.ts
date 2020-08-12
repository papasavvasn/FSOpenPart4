/* Usernames, passwords and applications using token authentication must always be used over HTTPS. 
We could use a Node HTTPS server in our application instead of the HTTP server (it requires more configuration). 
On the other hand, the production version of our application is in Heroku, 
so our applications stays secure: Heroku routes all traffic between a browser and the Heroku server over HTTPS.
https://fullstackopen.com/en/part4/token_authentication
 */
import { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { User } from '../models/user'

export const loginRouter = Router()

loginRouter.post('/', async (req: Request, resp: Response) => {
    const body = req.body

    const user = await User.findOne({ username: body.username })
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(body.password, (user as any).passwordHash)

    if (!(user && passwordCorrect)) {
        return resp.status(401).json({
            error: 'invalid username or password'
        })
    }

    const userForToken = {
        username: (user as any).username,
        id: user._id,
    }

    const token = jwt.sign(userForToken, process.env.SECRET as string)

    resp
        .status(200)
        .send({ token, username: (user as any).username, name: (user as any).name })
})
