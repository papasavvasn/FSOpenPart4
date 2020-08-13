import { Request, Response, NextFunction } from 'express';

const getTokenFrom = (request: Request) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}

export const tokenExtractor = (req: Request &{token:string | null} , res: Response, next: NextFunction) => {
    // put the token to the req object
    // so that all the next requests are authenticated
    req.token = getTokenFrom(req)
    next()
  }