import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import { errorlogger, logger } from './shared/logger'
import { Server } from 'http'

process.on('uncaughtException', error => {
  errorlogger.error(error)
  process.exit(1)
})

let server: Server
async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('Database Connect Successfully')

    server = app.listen(config.port, () => {
      logger.info(`Apllication listening on port ${config.port}`)
    })
  } catch (error) {
    errorlogger.error('Failed to connect databse', error)
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        errorlogger.error(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

main()

process.on('SIGALRM', () => {
  logger.info('SIGALRM is recive')
  if (server) {
    server.close()
  }
})
