import { app } from "./app"
import { PORT } from "./utils/config"
import { info } from "./utils/logger"
import http from 'http'

const server = http.createServer(app)

server.listen(PORT, () => {
    info(`Server running on port ${PORT}`)
})