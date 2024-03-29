const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const logger = require('../utils/logger')
const helper = require('./test_helper.js')
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
require('dotenv').config()

beforeEach(async () => {
  await Blog.deleteMany({})
  logger.info('cleared')

  await helper.initializeUsersDB()
  const usersInDatabase = await User.find({})
  const initialBlogs = helper.initialBlogs.map((blog) => {
    blog.user = usersInDatabase[0].id
    return blog
  })
  const blogObjects = initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  logger.info(`Saved ${helper.initialBlogs.length} blogs in the database`)
  await Promise.all(promiseArray)
})

describe('blogs returned from database', () => {
  test('blogs are returned as a json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are 6 blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('default "_id" field is returned as "id"', async () => {
    const response = await api.get('/api/blogs')
    const firstBlog = response.body[0]

    expect(firstBlog.id).toBeDefined()
  })

  test('GET to /api/blogs returns user information on each blog', async () => {
    const userProperties = ['name', 'username', 'id']

    const response = await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    for (const blog of response.body) {
      expect(blog).toHaveProperty('user')

      for (const property of userProperties) {
        expect(blog.user).toHaveProperty(property)
      }
    }
  })
})

describe('Inserting blogs in database', () => {
  const blog = {
    author: 'Rainey Reitman',
    likes: 5,
    title: 'Free Speech is Only as Strong as the Weakest Link',
    url: 'https://www.eff.org/deeplinks/2011/11/free-speech-only-strong-weakest-link'
  }

  test('Database length increases by one', async () => {
    await api.post('/api/blogs').send(blog)
    const response = await api.get('/api/blogs')
  })

  test('POST request returns a json object with the original properties', async () => {
    await helper.initializeUsersDB()

    const { username, password } = helper.initialUsers[0]

    const loginResponse = await api.post('/api/login/').send({ username, password })

    const insertResponse = await api.post('/api/blogs').send(blog).set('Authorization', `Bearer ${loginResponse.body.token}`)

      .expect('Content-Type', /application\/json/)
      .expect(201)

    expect(insertResponse.body).toHaveProperty('user')

    for (const property in blog) {
      expect(insertResponse.body).toHaveProperty(property)
    }
  })

  test('POST request without a valid JWT token returns an error', async () => {
    const insertResponse = await api.post('/api/blogs').send(blog)
      .expect('Content-Type', /application\/json/)
      .expect(401)

    expect(insertResponse.body).toHaveProperty('error', 'invalid token, login first')
  })

  test('POST with a invalid JWT token returns an error', async () => {
    const invalidToken = jwt.sign('invalidToken', 'invalidSecret')
    const insertResponse = await api.post('/api/blogs').send(blog).set('Authorization', `Bearer ${invalidToken}`)
      .expect('Content-Type', /application\/json/)
      .expect(401)

    expect(insertResponse.body).toHaveProperty('error', 'invalid token, login first')
  })

  test('Sending a blog without likes will default to 0', async () => {
    await helper.initializeUsersDB()

    const { username, password } = helper.initialUsers[0]

    const loginResponse = await api.post('/api/login/').send({ username, password })

    const blogWithoutLikes = {
      author: 'Rainey Reitman',
      title: 'Free Speech is Only as Strong as the Weakest Link',
      url: 'https://www.eff.org/deeplinks/2011/11/free-speech-only-strong-weakest-link'
    }

    const response = await api.post('/api/blogs').send(blogWithoutLikes).set('Authorization', `Bearer ${loginResponse.body.token}`)
    expect(response.body).toHaveProperty('likes')
    expect(response.body.likes).toBe(0)
  })

  test('Sending a blog without title returns 400 status code', async () => {
    const blogWithoutTitle = {
      author: 'Rainey Reitman',
      likes: 5,
      url: 'https://www.eff.org/deeplinks/2011/11/free-speech-only-strong-weakest-link'
    }

    const response = await api.post('/api/blogs').send(blogWithoutTitle)
    expect(response.status).toBe(400)
  })

  test('Sending a blog without url returns 400 status code', async () => {
    const blogWithoutUrl = {
      author: 'Rainey Reitman',
      likes: 5,
      title: 'Free Speech is only as Strong as the Weakest Link'
    }

    const response = await api.post('/api/blogs').send(blogWithoutUrl)
    expect(response.status).toBe(400)
  })
})

describe('Changing blogs in database', () => {
  test('Deleting an existing id from the datbase', async () => {
    await helper.initializeUsersDB()

    const { username, password } = helper.initialUsers[0]

    const loginResponse = await api.post('/api/login/').send({ username, password })
    const addingBlog = await api.post('/api/blogs').send(helper.initialBlogs[0]).set('Authorization', `Bearer ${loginResponse.body.token}`)
    const deletingBlog = await api.delete(`/api/blogs/${addingBlog.body.id}`)
      .set('Authorization', `Bearer ${loginResponse.body.token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(deletingBlog.body.id).toBe(addingBlog.body.id)
  })

  test('Updating an existing blog in the database', async () => {
    await helper.initializeUsersDB()

    const { username, password } = helper.initialUsers[0]
    const loginResponse = await api.post('/api/login/').send({ username, password })
    const addingBlog = await api.post('/api/blogs').send(helper.initialBlogs[0]).set('Authorization', `Bearer ${loginResponse.body.token}`)
    const updatingBlog = await api.put(`/api/blogs/${addingBlog.body.id}`).send({ likes: 29 }).set('Authorization', `Bearer ${loginResponse.body.token}`)

    expect(updatingBlog.status).toBe(200)
    expect(updatingBlog.body.likes).toBe(29)
  })

  test('Trying to update a blog not created by the user returns 403', async () => {
    await helper.initializeUsersDB()
    const { username, password } = helper.initialUsers[0]
    const loginResponse = await api.post('/api/login/').send({ username, password })
    const addingBlog = await api.post('/api/blogs').send(helper.initialBlogs[0]).set('Authorization', `Bearer ${loginResponse.body.token}`)

    const someUser = jwt.sign({ username: 'someUser', id: 'randomID' }, process.env.JWT_SECRET)
    const updatingBlog = await api.put(`/api/blogs/${addingBlog.body.id}`).send({ likes: 29 }).set('Authorization', `Bearer ${someUser}`)

    expect(updatingBlog.status).toBe(403)
  })

  test('Trying to delete a blog not created by the user returns 403', async () => {
    await helper.initializeUsersDB()
    const { username, password } = helper.initialUsers[0]
    const loginResponse = await api.post('/api/login/').send({ username, password })
    const addingBlog = await api.post('/api/blogs').send(helper.initialBlogs[0]).set('Authorization', `Bearer ${loginResponse.body.token}`)

    const someUser = jwt.sign({ username: 'someUser', id: 'randomID' }, process.env.JWT_SECRET)
    const updatingBlog = await api.delete(`/api/blogs/${addingBlog.body.id}`).send({ likes: 29 }).set('Authorization', `Bearer ${someUser}`)

    expect(updatingBlog.status).toBe(403)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
  logger.info('connection closed')
})
