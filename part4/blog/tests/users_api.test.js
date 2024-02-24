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

describe('users in database', () => {
  test('POST returns 201 and a JSON with name, username and id', async () => {
    const user = {
      name: 'Luke Skywalker',
      username: 'LukeJedi'
    }

    const response = await api.post('/api/users').send({ ...user, password: 'walkinginthesky' }).expect('Content-Type', /application\/json/)

    expect(response.status).toBe(201)
    for (const property in user) {
      expect(response.body).toHaveProperty(property, user[property])
    }
    expect(response.body).toHaveProperty('id')
  })
})

afterAll(async () => {
  await mongoose.connection.close()
  logger.info('connection closed')
})
