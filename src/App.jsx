import { useState } from 'react'

const NumberList = ({list}) =>{
  return (
    <ul>
      {list.map(person =><li key={person.name} >{person.name} {person.number}</li>)}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  //Auxiliar method to filter the list
  const checkFilter = (person) =>{
    const name = person.name
    const strToCompare = name.substring(0,newFilter.length)
    return strToCompare.toUpperCase() === newFilter.toUpperCase()
  }

  const getFilteredList = () => {
    if (newFilter === '') return persons
    else return persons.filter(checkFilter)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const found = persons.find((person)=>person.name === newName)
    if (found === undefined){
      const peep = {name : newName,
      number : newNumber}
      setPersons(persons.concat(peep))
      setNewName('')
      setNewNumber('')
    }
    else{
      alert(`${newName} is already in the phonebook`)
      setNewName('')
      setNewNumber('')
    }
  }

  const listToShow = getFilteredList()

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
          filter shown with: <input 
          value={newFilter}
          onChange={handleFilterChange}/>
      </div>
      <h2>Add a new one</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input 
          value={newName}
          onChange={handleNameChange}/>
        </div>
        <div>
          number: <input 
          value={newNumber}
          onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      
      <h2>Numbers</h2>
      <NumberList list={listToShow}/>
    </div>
  )
}

export default App
