const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.post('/', async (req, res) => {
  const { name, username, password } = req.body
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
