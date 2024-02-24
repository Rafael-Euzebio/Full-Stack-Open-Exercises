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

module.exports = usersRouter
