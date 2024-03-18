const User = require('../models/user')
const logger = require('../utils/logger')
const bcrypt = require('bcrypt')

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  }
]

const initialUsers = [
  {
    name: 'Obi-Wan Kenobi',
    username: 'heIsMe',
    password: 'anElegantWeaponForaMoreCivilizedTime'
  },
  {
    name: 'Artoo Detoo',
    username: 'R2-D2',
    password: 'binaryLanguage'
  },
  {
    name: 'Anakin Skywalker',
    username: 'Darth Vader',
    password: 'iAmYourFather'
  }
]

const initializeUsersDB = async () => {
  await User.deleteMany({})
  logger.info('cleared')

  const userObjects = await Promise.all(initialUsers.map(async (user) => {
    const { name, username, password } = user
    const hashedPassword = await bcrypt.hash(password, 2)
    return new User({ name, username, password: hashedPassword })
  }))

  const userPromiseArray = userObjects.map(user => user.save())
  await Promise.all(userPromiseArray)
}

module.exports = { initialBlogs, initialUsers, initializeUsersDB }
