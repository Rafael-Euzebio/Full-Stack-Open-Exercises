const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
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

  if (!Object.hasOwn(body, 'title') || !Object.hasOwn(body, 'url')) {
    return res.status(400).json({ message: 'title and url are required' })
  }

  const users = await User.find({})
  const blogCreator = users[0].id
  const blog = new Blog({ ...body, user: blogCreator })
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
  console.log(result)
  res.status(200).json(result)
})

module.exports = blogsRouter
