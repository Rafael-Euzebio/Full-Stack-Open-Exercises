const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const logger = require('../utils/logger')
const helper = require('./test_helper.js')
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  logger.info('cleared')

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
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
})

describe('Inserting blogs in database', () => {
  const blog = {
    author: 'Rainey Reitman',
    likes: 5,
    title: 'Free Speech is Only as Strong as the Weakest Link',
    url: 'https://www.eff.org/deeplinks/2011/11/free-speech-only-strong-weakest-link'
  }

  test('Post request to database returns a succesful response', async () => {
    const response = await api.post('/api/blogs').send(blog)
    expect(response.status).toBe(201)
  })

  test('Database length increases by one', async () => {
    await api.post('/api/blogs').send(blog)
    const response = await api.get('/api/blogs')
    console.log(response.body)
  })

  test('Post request returns a json object', async () => {
    const response = await api.post('/api/blogs').send(blog)

    expect(response.type).toBe('application/json')
  })

  test('Returned object has the same properties as the original', async () => {
    const response = await api.post('/api/blogs').send(blog)

    for (const property in blog) {
      expect(response.body).toHaveProperty(property)
    }
  })

  test('Sending a blog without likes will default to 0', async () => {
    const blogWithoutLikes = {
      author: 'Rainey Reitman',
      title: 'Free Speech is Only as Strong as the Weakest Link',
      url: 'https://www.eff.org/deeplinks/2011/11/free-speech-only-strong-weakest-link'
    }

    const response = await api.post('/api/blogs', blogWithoutLikes)
    expect(response.body).toHaveProperty('likes')
    expect(response.body.likes).toBe(0)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
  logger.info('connection closed')
})
