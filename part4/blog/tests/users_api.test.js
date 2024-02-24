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

describe('requests to /api/users', () => {
  test('POST returns 201 and a JSON with name, username and id', async () => {
    const user = {
      name: 'Luke Skywalker',
      username: 'LukeJedi'
    }

    const response = await api.post('/api/users')
      .send({ ...user, password: 'walkinginthesky' })
      .expect(201)
      .expect('Content-Type', /application\/json/)

    for (const property in user) {
      expect(response.body).toHaveProperty(property, user[property])
    }
    expect(response.body).toHaveProperty('id')
  })

  test('GET returns all users in JSON format', async () => {
    const response = await api.get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    console.log(response.body)
    expect(response.body.length).toBe(helper.initialUsers.length)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
  logger.info('connection closed')
})
