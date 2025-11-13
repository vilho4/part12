const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument and new name and new number')
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://Vilho4:${password}@phonebook.hdqr9.mongodb.net/?retryWrites=true&w=majority&appName=Phonebook`

mongoose.set('strictQuery', false)
mongoose.connect(url)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message)
    process.exit(1)
  })


const personSchema = new mongoose.Schema({
  name:string,
  number:string
})

// console.log(process.argv[1], process.argv[2], process.argv[3], process.argv[4], 'testi')
const Person = mongoose.model('Person', personSchema)

if (process.argv.length == 3) {
  Person.find({}).then(result => {
    if (result) {
      console.log('Phonebook:')
      result.forEach(Person => {
        console.log(Person.name, Person.number)
      })
    }
    mongoose.connection.close()
  }).catch(error => {
    console.error('Error fetching data:', error.message)
    mongoose.connection.close()
  })
}

if (process.argv.length > 3) {
  const newPerson = new Person({
    Name: process.argv[3],
    Number: process.argv[4],
  })

  newPerson.save().then(result => {
    console.log(`Added ${result.name} with number ${result.number} to phonebook`)
    mongoose.connection.close()
  }).catch(error => {
    console.error('Error saving data:', error.message)
    mongoose.connection.close()
  })
}