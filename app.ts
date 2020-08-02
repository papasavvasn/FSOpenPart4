import cors from "cors"
import express from "express"
import mongoose from "mongoose"
import { blogsRouter } from "./controllers/blogs"
import { MONGODB_URI } from "./utils/config"
import { info } from "./utils/logger"

export const app = express()

info('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI as string, { useNewUrlParser: true, useUnifiedTopology: true })

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)
