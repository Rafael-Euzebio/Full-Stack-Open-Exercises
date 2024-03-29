const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const mongoose = require('mongoose')
const User = require('../models/user')

beforeEach(async () => {
  await helper.initializeUsersDB()
})

test('POST to login returns a valid JWT token if username and password are correct', async () => {
  const { username, password } = helper.initialUsers[0]
  const response = await api.post('/api/login').send({ username, password })

  expect(response.body).toHaveProperty('token')

  const tokenVerification = jwt.verify(response.body.token, process.env.JWT_SECRET)
  expect(tokenVerification).toHaveProperty('username')
  expect(tokenVerification).toHaveProperty('id')
})

afterAll(async () => {
  await mongoose.connection.close()
  logger.info('connection closed')
})
