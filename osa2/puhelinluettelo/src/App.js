import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const Persons = ({persons, filter, onDelete}) => {
  const caseinsensitiveFilter = (person) => (
    person.name.toUpperCase().includes(filter.toUpperCase())
  )
  return (
    <div>
      <h2>Numbers</h2>
      {persons.filter(caseinsensitiveFilter).map(person => <Number key={person.name} person={person} onDelete={onDelete}/>)}
    </div>
  )
}

const personExists = (persons, name) => {
  return persons.filter(person => person.name === name).length > 0
}

const Number = ({person, onDelete}) => (
  <div>{person.name} {person.number} <button onClick={() => onDelete(person)}>delete</button></div>
)

const App = () => {

  const [ newName, setNewName ] = useState('')
  const [ persons, setPersons] = useState([])
  const [ newNumber, setNewNumber ] = useState('')
  const [ message, setMessage ] = useState(null)
  const [ filter, setFilter ] = useState('')
  const color_green = message === null ? null : message.color_green
  const content = message === null ? null : message.content

  useEffect(() => {
    personService
      .getAll()
      .then(allPersons =>
        setPersons(allPersons)
        )
    }, [])

  useEffect(() => {
    const clearMessage = () => setMessage(null)
    const timer = setTimeout(clearMessage, 5000)
    return () => clearInterval(timer)
  }, [content, color_green])

  const filterUpdate = (event) => setFilter(event.target.value)
  const changeName = (event) => setNewName(event.target.value)
  const changeNumber = (event) => setNewNumber(event.target.value)
  const updatePerson = (name) => {
    const oldPerson = persons.find(p => p.name === name)
    const updatedPerson = {...oldPerson, number: newNumber}
    personService.update(updatedPerson.id, updatedPerson).then(returnedPerson => {
        setPersons(persons.map(person => person.id !== oldPerson.id ? person: returnedPerson))
        setMessage({content:`Updated ${updatedPerson.name}.`, color_green: true})
        })
    }

  const createNewPerson = () => {
    const newPerson = {
      name: newName,
      number: newNumber
    }

    personService.create(newPerson).then(newPerson => {
        setPersons(persons.concat(newPerson))
        setMessage({content: `Added ${newPerson.name}`, color_green: true})
      })
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = deletedPerson => {
    const accepted = window.confirm(`Delete ${deletedPerson.name}?`)
    if (accepted) {
      personService.remove(deletedPerson.id).then(() => {
          setPersons(persons.filter(person => person.id !== deletedPerson.id))
          setMessage({content: `Deleted ${deletedPerson.name}`, color_green:false})
        })
        .catch(error => {
          if (error.message === "Request failed with status code 404"){
            setMessage({content: `Information of ${deletedPerson.name} has already been removed from server`, color_green: true})
          } else {
            setMessage({content: error.response.data.error, color_green: false})
          }
        })
      }
    }

  const addPerson = (event) => {
    event.preventDefault()
    if (personExists(persons, newName)) {
      const acceptModification = window.confirm(`${newName} is created already. Do you want to update it with new number?`)
      if (acceptModification)
        updatePerson(newName)
    } 
    else
      createNewPerson()
  }


  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message}/>
      <Filter filter={filter} onFilterChange={filterUpdate}/>
      <h2>Add a new</h2>
      <PersonForm
        addPerson={addPerson}
        changeName={changeName}
        changeNumber={changeNumber}
        newName={newName}
        newNumber={newNumber}
      />
      <Persons persons={persons} filter={filter} onDelete={deletePerson}/>
    </div>
  )
}

export default App 