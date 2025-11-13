// let persons = [
//   {
//     "id": "1",
//     "name": "Arto Hellas",
//     "number": "040-123456"
//   },
//   {
//     "id": "2",
//     "name": "Ada Lovelace",
//     "number": "39-44-5323523"
//   },
//   {
//     "id": "3",
//     "name": "Dan Abramov",
//     "number": "12-43-234345"
//   },
//   {
//     "id": "4",
//     "name": "Mary Poppendieck",
//     "number": "39-23-6423122"
//   },
//   {
//       "id": "5",
//       "name": "Teppo Testaaja",
//       "number": "123-123-123"
//   }
// ]

// import dependencies
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

// initialize app
const app = express()

// middlewaret
app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

// request logging
morgan.token('body', (req) => JSON.stringify(req.body))

// logging HTTP requests
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// export app
module.exports = app

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'malformatted id' })
  }

  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

//hello
app.get('/api', (request, response) => {
  response.send('<h1>Hello Api!!!</h1>')
})

app.get('/info', (request, response) => {
  Person.countDocuments({})
    .then(count => {
      response.send(`
        <div>Phonebook has info for ${count} people</div>
        <p>${new Date().toString()}</p>
      `)
    })
    .catch(error => {
      console.error(error)
      response.status(500).json({ error: 'Database error' })
    })
})

// app.get('/api/persons/:id', (request, response) => {
//   const id = request.params.id
//   const person =  persons.find(person=>person.id===id)
//   if (person){
//       response.json(person)
//   }else{
//       response.status(404).end()
//   }
// })
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      }   else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      console.log(result.name,'deleted succuesfully')
      response.status(204).end()
    })
    .catch(error => next(error))
})

const nameExists = async (name) => {
  return await Person.findOne({ name }) !== null
}

app.post('/api/persons', async (request, response, next) => {
  try {
    const { name, number } = request.body

    if (!name || !number) {
      return response.status(400).json({ error: 'Name and number are required' })
    }

    if (await nameExists(name)) {
      return response.status(400).json({ error: `${name} already exists in persons` })
    }

    const person = new Person({ name, number })
    const savedPerson = await person.save() //validaattoreiden avulla lisäys

    console.log(savedPerson.name, 'added successfully')
    response.json(savedPerson)
  } catch (error) {
    next(error)
  }
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.put('/api/persons/:id', async (request, response, next) => {
  try {
    const { name, number } = request.body

    const person = await Person.findById(request.params.id)

    if (!person) {
      return response.status(404).json({ error: 'Person not found' }) //jos henkiloa ei löydykään
    }

    person.name = name
    person.number = number

    const updatedPerson = await person.save() //validaattorit

    response.json(updatedPerson)
  } catch (error) {
    next(error)
  }
})

// olemattomat osoitteet
app.use(unknownEndpoint)
// virheellisten pyyntöjen käsittely
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})