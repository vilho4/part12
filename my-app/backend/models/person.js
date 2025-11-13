const mongoose = require('mongoose')
// const { validate } = require('./models/person')
// require('dotenv').config()

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

  const personSchema = new mongoose.Schema({
    name: {
      type:String,
      minlength:3,
      required:true
    },
    number: {
      type: String,
      validate: {
        validator: function (phonenumber) {
          return /^(\d{2}-\d{6,}|\d{3}-\d{5,})$/.test(phonenumber) ///number length must be 8 or more
        },                                                         ///number must have '-' and format must be 123-123456 or 12-123123
        message: (props) => `${props.value} is not a valid phone number!`,
      },
      required: [true, 'User phone number required'],
    }
  })

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id=returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model('Person', personSchema)