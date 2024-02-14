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
afterAll(async () => {
  await mongoose.connection.close()
  logger.info('connection closed')
})
