const jwt = require('jsonwebtoken')
require('dotenv').config()
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })
  const isPasswordCorrect = user === null ? false : await bcrypt.compare(password, user.password)

  if (!(user && isPasswordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password'
    })
  }

  const useForToken = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(useForToken, process.env.JWT_SECRET)

  res.status(200).send({
    token,
    id: user.id,
    username: user.username,
    name: user.name
  })
})

module.exports = loginRouter
