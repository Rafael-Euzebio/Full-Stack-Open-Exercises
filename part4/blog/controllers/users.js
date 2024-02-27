const usersRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')

usersRouter.post('/', async (req, res) => {
  const { name, username, password } = req.body

  if (username.length < 3 || password.length < 3) {
    return res.status(400).json({ error: 'Username and Password must be at least 3 characters long' })
  }

  const uniqueUser = await User.find({ username })
  if (uniqueUser.length !== 0) {
    return res.status(400).json({ error: 'Username must be unique' })
  }
  const hashedPassword = await bcrypt.hash(password, 10)

  const blogs = await Blog.find({})
  const user = new User({ name, username, password: hashedPassword, blogs: [blogs[0].id] })
  const result = await user.save()
  res.status(201).json(result)
})

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs')
  res.status(200).json(users)
})

module.exports = usersRouter
