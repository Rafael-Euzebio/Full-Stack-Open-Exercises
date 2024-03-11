const User = require('../models/user')
const logger = require('../utils/logger')
const bcrypt = require('bcrypt')

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  }
]

const initialUsers = [
  {
    _id: '65db9b03311501d8198cf483',
    name: 'Obi-Wan Kenobi',
    username: 'heIsMe',
    password: 'anElegantWeaponForaMoreCivilizedTime'
  },
  {
    _id: '65db9b03311501d8198cf482',
    name: 'Artoo Detoo',
    username: 'R2-D2',
    password: 'binaryLanguage'
  },
  {
    _id: '65db9b03311501d8198cf481',
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
