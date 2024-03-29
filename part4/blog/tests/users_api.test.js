const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const logger = require('../utils/logger')
const mongoose = require('mongoose')
const User = require('../models/user')

beforeEach(async () => {
  await helper.initializeUsersDB()
})

describe('requests to /api/users', () => {
  test('POST returns 201 and a JSON with name, username and id and user is created', async () => {
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

    const userInDatabase = await User.find(user)

    for (const property in user) {
      expect(userInDatabase[0]).toHaveProperty(property, user[property])
    }
  })

  test('POST username with less than 3 characters return 400 and user is not created', async () => {
    const userWithShortName = {
      name: 'See-Threepio',
      username: 'C3',
      password: 'BuiltByAnakin'
    }

    const response = await api.post('/api/users')
      .send(userWithShortName)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveProperty('error')

    const invalidUser = await User.find({ name: userWithShortName.name })
    expect(invalidUser.length).toBe(0)
  })

  test('POST non-unique username returns 400 error and user is not created', async () => {
    const nonUniqueUser = {
      name: 'Darth Vader',
      username: helper.initialUsers[2].username,
      password: 'iAmYourFather'
    }

    const response = await api.post('/api/users')
      .send(nonUniqueUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveProperty('error')
  })

  test('POST password with less than 3 characters returns 400 and user is not created', async () => {
    const userWithShortPassword = {
      name: 'See-Threepio',
      username: 'C-3PO',
      password: 'C3'
    }

    const response = await api.post('/api/users')
      .send(userWithShortPassword)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveProperty('error')

    const invalidUser = await User.find({ name: userWithShortPassword.name })
    expect(invalidUser.length).toBe(0)
  })
})

describe('GET requests to /api/users', () => {
  test('GET returns all users in JSON format', async () => {
    const response = await api.get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.length).toBe(helper.initialUsers.length)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
  logger.info('connection closed')
})
