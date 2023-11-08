import { useState } from 'react'

const NumberList = ({list}) =>{
  return (
    <ul>
      {list.map(person =><li key={person.name} >{person.name}</li>)}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleInputChange = (event) => {
    setNewName(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const found = persons.find((person)=>person.name === newName)
    if (found === undefined){
      const peep = {name : newName}
      setPersons(persons.concat(peep))
      setNewName('')
    }
    else{
      alert(`${newName} is already in the phonebook`)
      setNewName('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input 
          value={newName}
          onChange={handleInputChange}/>
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
