const mongoose = require('mongoose')

const password = process.argv[2]
const personName = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://fullstack:${password}@cluster0.v2ps02q.mongodb.net/personApp?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  personName: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  personName,
  number
})

if (process.argv.length === 3) {
  console.log('puhelinluettelo:')
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(`${person.personName} ${person.personName}`)
    })
    mongoose.connection.close()
    process.exit(1)
  })
}

person.save().then(() => {
  console.log('Person and number ' + `${personName}  ${number}` + ' was saved')
  mongoose.connection.close()
})

