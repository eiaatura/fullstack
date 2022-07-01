require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

app.use(express.json())
app.use(cors())
app.use(express.static('build'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

morgan.token('token', (req) => {
  if (req.method === 'POST') return JSON.stringify(req.body)
  return null
})

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id).then(person => {
    if (person) {
      res.json(person)
    } else {
      res.status(404).end()
    }
  })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
  const { personName, number } = req.body

  if (personName.length === 0) {
    return res.status(400).json({
      error: 'name is missing'
    })
  }

  if (number.length === 0) {
    return res.status(400).json({
      error: 'number is missing'
    })
  }

  /* if (person.find({}).then(person => person.personName === personName)) {
        return res.status(400).json({
            error: 'name must be unique'
        })
    } */

  const person = new Person({
    personName: personName,
    number: number
  })

  person.save().then(savedPerson => {
    res.json(savedPerson.toJSON())
  })
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { personName, number } = request.body

  Person.findByIdAndUpdate(request.params.id, { personName, number }, { new: true, runValidators: true, context: 'query' })
    .then((updatedPerson) => {response.json(updatedPerson.toJSON())})
    .catch(error => next(error))
})

app.get('/info', (req, res) => {
  const currentDate = new Date().toLocaleString()
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  Person.find({}).then(person => {
    res.send(
      `
         <div>
            <p>Phonebook has info for ${person.length} people</p>
        </div>
        <div>
            <p>${currentDate} (${timeZone})</p>
        </div>
        `
    )
  })
})

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})