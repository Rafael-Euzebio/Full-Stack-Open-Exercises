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

  let decodedToken

  try {
    decodedToken = jwt.verify(req.token, process.env.JWT_SECRET)
  } catch (error) {
    return res.status(401).json({ error: 'invalid token, login first' })
  }

  const blog = new Blog({ ...body, user: decodedToken.id })
  const result = await blog.save()
  await User.findByIdAndUpdate(decodedToken.id, { $push: { blogs: result.id } })
  res.status(201).json(result)
})

blogsRouter.delete('/:id', async (req, res) => {
  const blogId = req.params.id
  let decodedToken

  try {
    decodedToken = jwt.verify(req.token, process.env.JWT_SECRET)
  } catch (error) {
    return res.status(401).json({ error: 'invalid token, login first' })
  }

  const blogToDelete = await Blog.findById(blogId)

  if (blogToDelete.user.toString() !== decodedToken.id) {
    return res.status(403).json({ error: 'You cannot delete blogs created by other users' })
  }

  const result = await Blog.findByIdAndDelete(blogId)
  return res.status(200).json(result)
})

blogsRouter.put('/:id', async (req, res) => {
  const blogId = req.params.id
  const body = req.body

  let decodedToken

  try {
    decodedToken = jwt.verify(req.token, process.env.JWT_SECRET)
  } catch (error) {
    return res.status(401).json({ error: 'invalid token, login first' })
  }

  const blogToUpdate = await Blog.findById(blogId)

  if (blogToUpdate.user.toString() !== decodedToken.id) {
    return res.status(403).json({ error: 'You cannot delete blogs created by other users' })
  }

  const result = await Blog.findOneAndUpdate({ _id: blogId }, body, { new: true })
  res.status(200).json(result)
})

module.exports = blogsRouter
