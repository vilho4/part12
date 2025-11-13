import { useState, useEffect } from 'react'
import axios from 'axios'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import PersonService from './services/persons'
import HandleList from './components/HandleList'
import NotificationMessage from './components/NotificationMessage'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('A new person')
  const [newNumber, setNewNumber] = useState('A new number')
  const [searchName, setSearchName] = useState('')
  const [notification, setNotification] = useState({ message: '', type: '' })

  useEffect(() => {
    PersonService
      .getAll()
      .then(alustaPersons => {
        setPersons(alustaPersons)
      })
  }, [])

  console.log(persons)
  const addPerson = (event) => {
    event.preventDefault()
      const personObject = {
      name: newName,
      number: newNumber
      }
    if (personExists(personObject.name)) {
      const foundPerson=personExists(personObject.name)
      if(window.confirm(`${foundPerson.name} is already added to the phonebook, would you like to update their phone number?`))
        // this is their number ${foundPerson.name} 
        // and this is their id ${foundPerson.id}`))
        PersonService
        .update(foundPerson.id, personObject)
        .then(vastaus => {
          //console.log(vastaus, 'vastauksen testaus', vastaus.id, '=tämä on vastauksen id')
          setPersons(persons.map(person => person.id !== vastaus.id ? person : vastaus))
          setNotification({ message: `${foundPerson.name} Number updated successfully!`, type: 'success' })
          setTimeout(() => setNotification({ message: '', type: '' }), 5000)
        })
      setNewName('')
      setNewNumber('')
      return
    }
    const newId = persons.length > 0 ? (Math.max(...persons.map(p => parseInt(p.id))) + 1).toString() : '1'
    if (!personExists(personObject.name)){
      PersonService
      .create({...personObject, id:newId})
      .then((person) => {
        setPersons(persons.concat(person))
        setNewName('')
        setNewNumber('')
        setNotification({ message: `${person.name} Added successfully`, type: 'success' })
        setTimeout(() => setNotification({ message: '', type: '' }), 5000)
      })
      .catch(error=>{
        // console.log(error.response.data.error)
        setNotification({ message: `${error.response.data.error}`, type: 'error' })
        setTimeout(() => setNotification({ message: '', type: '' }), 5000)
      })
    }
  }

  const deletePerson = (person) => {
    if (window.confirm(`Are you sure you want to delete ${person.name}?`)) {
      PersonService
      .deletePerson(person.id)
      .then((reply)=>{
        // console.log(reply, 'deleted succesfully')
        setPersons(persons.filter(p => p.id !== person.id))
        setNotification({ message: `${person.name} deleted successfully`, type: 'success' })
        setTimeout(() => setNotification({ message: '', type: '' }), 5000)
      })
      .catch((error) => {
        setNotification({ message: `Error: ${person.name} was already removed from the server`, type: 'error' })
        setTimeout(() => setNotification({ message: '', type: '' }), 5000)
      })
    } else {
      console.log("false")
    }
  }
  
  const personExists = (newName) => {
    return persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    )
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchName(event.target.value)
  }

  const filteredPersons = persons.filter((person) =>
    person.name?.toLowerCase().includes(searchName.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <NotificationMessage notification={notification} />
      <input type='text' placeholder='search name' value={searchName} onChange={handleSearchChange} />
      <PersonForm
        onSubmit={addPerson} 
        newName={newName}
        handleNameChange={handleNameChange} 
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange}/>
      <h3>Persons!</h3>
      <HandleList persons={filteredPersons} deletePerson={deletePerson}/>
    </div>
  )
}

export default App