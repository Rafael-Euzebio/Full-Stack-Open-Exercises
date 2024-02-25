const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.post('/', async (req, res) => {
  const { name, username, password } = req.body

  if (username.length < 3 || password.length < 3) {
    return res.status(400).json({ error: 'Username and Password must be at least 3 characters long' })
  }
  const hashedPassword = await bcrypt.hash(password, 10)

  const user = new User({ name, username, password: hashedPassword })
  const result = await user.save()
  res.status(201).json(result)
})

usersRouter.get('/', async (req, res) => {
  const users = await User.find({})
  res.status(200).json(users)
})

module.exports = usersRouter
