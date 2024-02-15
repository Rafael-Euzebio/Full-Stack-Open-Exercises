const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  logger.info(req.body)
  const blog = new Blog(req.body)
  const result = await blog.save()
  res.status(201).json(result)
})

module.exports = blogsRouter
