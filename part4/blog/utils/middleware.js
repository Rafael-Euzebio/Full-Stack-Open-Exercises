const logger = require('./logger')
require('dotenv').config()

const requestLogger = (req, res, next) => {
  logger.info('Method:', req.method)
  logger.info('Path', req.path)
  logger.info('Body', req.body)
  logger.info('---')
  next()
}

const tokenExtractor = (req, res, next) => {
  const token = req.get('Authorization')

  if (token) {
    req.token = token
  } else {
    req.token = null
  }
  next()
}

const unknowEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknow endpoint' })
}

const errorHandler = (error, req, res, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).json({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}

module.exports = {
  requestLogger,
  tokenExtractor,
  unknowEndpoint,
  errorHandler
}
