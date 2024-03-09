const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const logger = require('../utils/logger')
const mongoose = require('mongoose')
const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})
  logger.info('cleared')

  const userObjects = await Promise.all(helper.initialUsers.map(async (user) => {
    const { name, username, password } = user
    const hashedPassword = await bcrypt.hash(password, 2)
    return new User({ name, username, password: hashedPassword })
  }))

  const promiseArray = userObjects.map(user => user.save())
  await Promise.all(promiseArray)
})


afterAll(async () => {
  await mongoose.connection.close()
  logger.info('connection closed')
})
