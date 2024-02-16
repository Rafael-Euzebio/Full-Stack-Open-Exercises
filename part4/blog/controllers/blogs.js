const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  const body = req.body
  logger.info(body)

  if (!Object.hasOwn(body, 'likes')) {
    req.body.likes = 0
  }

  if (!Object.hasOwn(body, 'title')) {
    res.status(400).json({ message: 'title is required' })
  }

  const blog = new Blog(body)
  const result = await blog.save()
  res.status(201).json(result)
})

module.exports = blogsRouter
