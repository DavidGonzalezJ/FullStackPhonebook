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
    { name: 'Arto Hellas',
      number: '8734792837'  
  }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
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

  return (
    <div>
      <h2>Phonebook</h2>
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
      <NumberList list={persons}/>
    </div>
  )
}

export default App
