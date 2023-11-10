import { useState, useEffect } from 'react'
import axios from 'axios'

const NumberList = ({list}) =>{
  return (
    <ul>
      {list.map(person =><li key={person.name} >{person.name} {person.number}</li>)}
    </ul>
  )
}

const SearchFilter = ({newFilter,changeHandler}) =>{
  return(
    <div>
      filter shown with: <input 
      value={newFilter}
      onChange={changeHandler}/>
    </div>
  )
}

const FormForAdding = ({name,number,nameHandler,numberHandler,submitHandler}) =>{
  return(
    <form onSubmit={submitHandler}>
      <div>
        name: <input 
        value={name}
        onChange={nameHandler}/>
      </div>
      <div>
        number: <input 
        value={number}
        onChange={numberHandler}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  //Asks the server for the necesary info (initial numbers)
  const getListFromServer = () => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      console.log('got it!')
      setPersons(response.data)
    })
  }

  useEffect(getListFromServer,[])

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
      <SearchFilter newFilter={newFilter} changeHandler={handleFilterChange}/>
      <h2>Add a new one</h2>
      <FormForAdding name={newName} number={newNumber} 
      nameHandler={handleNameChange} numberHandler={handleNumberChange}
      submitHandler={handleSubmit}/>
      <h2>Numbers</h2>
      <NumberList list={listToShow}/>
    </div>
  )
}

export default App
