const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')
require('dotenv').config()

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user')
  res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  const body = req.body
  logger.info(body)

  if (!Object.hasOwn(body, 'likes')) {
    req.body.likes = 0
  }

  if (!Object.hasOwn(body, 'title') || !Object.hasOwn(body, 'url')) {
    return res.status(400).json({ message: 'title and url are required' })
  }

  if (!Object.hasOwn(body, 'token')) {
    return res.status(401).json({ error: 'login required' })
  }

  let token
  try {
    token = jwt.verify(body.token, process.env.JWT_SECRET)
  } catch (error) {
    return res.status(401).json({ error: 'invalid token, login first' })
  }

  const blog = new Blog({ ...body, user: token.id })
  const result = await blog.save()
  res.status(201).json(result)
})

blogsRouter.delete('/:id', async (req, res) => {
  const id = req.params.id
  const result = await Blog.findOneAndDelete({ _id: id })
  res.status(200).json(result)
})

blogsRouter.put('/:id', async (req, res) => {
  const id = req.params.id
  const body = req.body

  const result = await Blog.findOneAndUpdate({ _id: id }, body, { new: true })
  res.status(200).json(result)
})

module.exports = blogsRouter
