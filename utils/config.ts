//https://dev.to/aryanshmahato/setup-node-express-with-typescript-3bho
require('dotenv').config()
export const PORT = process.env.PORT

export let MONGODB_URI = process.env.MONGODB_URI
if (process.env.NODE_ENV === 'test') {
    MONGODB_URI = process.env.TEST_MONGODB_URI
}
