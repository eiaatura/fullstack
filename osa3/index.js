const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('build'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

morgan.token('token', (req) => {
    if (req.method === 'POST') return JSON.stringify(req.body)
    return null
})

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Jarkko Liedes",
        number: "039-123456"   
    },
    {
     id: 3,
     name: "Dan Uunis",
     number: "12-3456789"
    },
    {
     id: 4,
     name: "Pirkko-Liisa Kattilas",
     number: "050-123456"
    }
 ]

const generateId = () => {
    const newId = Math.random() * (10000) + 50
    return Math.floor(newId)
}

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})  

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        res.json(person)        
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
  
    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const { name, number } = req.body

    if (!name) {
        return res.status(400).json({
            error: 'name is missing'
        })
    }

    if (!number) {
        return res.status(400).json({
            error: 'number is missing'
        })
    }

    if (persons.find(person => person.name === name)) {
        return res.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        id: generateId(),
        name,
        number
    }

    persons = persons.concat(person)
    res.json(person)
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


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})