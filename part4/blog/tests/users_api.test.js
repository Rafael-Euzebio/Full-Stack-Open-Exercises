const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const mongoose = require('mongoose')
const User = require('../models/user')
const logger = require('../utils/logger')

beforeEach(async () => {
  await User.deleteMany({})
  logger.info('cleared')
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
