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

app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id).then(persons => {
        res.json(persons)
    })
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
  
    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const { personName, number } = req.body

    if (!personName) {
        return res.status(400).json({
            error: 'name is missing'
        })
    }

    if (!number) {
        return res.status(400).json({
            error: 'number is missing'
        })
    }

    if (persons.find(person => person.personName === personName)) {
        return res.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = new Person({
        personName,
        number
    })
    
    person.save().then(savedPerson => {
        res.json(savedPerson.toJSON())
    })
})

app.get('/info', (req, res) => {
    const currentDate = new Date().toLocaleString();
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    res.send(
        `
        <div>
            <p>Phonebook has info for ${persons.length} people</p>
        </div>
        <div>
            <p>${currentDate} (${timeZone})</p>
        </div>
        `
    )
})


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})