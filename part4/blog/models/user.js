const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  password: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject.password
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User
