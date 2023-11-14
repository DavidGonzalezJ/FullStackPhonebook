import { useState, useEffect } from 'react'
import personService from './services/persons'

const NumberList = ({list,deleteHandler}) =>{
  return (
    <ul>
      {list.map(person =><li 
      key={person.name} >
        {person.name} {person.number}
        <button onClick={() => deleteHandler(person)}>delete</button>
      </li>)}
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
    personService.getAll().then(initialList => {
      setPersons(initialList)
      console.log('got list!')
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
      personService.create(peep)
      .then(newOne => {
        setPersons(persons.concat(newOne))
        setNewName('')
        setNewNumber('')
        console.log('saved ',newOne.name)
      })
    }
    else{
      if(window.confirm(`${newName} is already in the phonebook,
       do you want to replace the old number with a new one?`)){
        const peep = {name : newName, number : newNumber}
        personService.update(found.id, peep)
        .then(() => {
          setNewName('')
          setNewNumber('')
          getListFromServer()
          console.log('Number updated')
        })
      
      }
      else{
        setNewName('')
        setNewNumber('')
        console.log('Number not updated')
      }
    }
  }

  const handleDelete = (person) => {
    if(window.confirm(`Do you want to delete ${person.name}?`)){
      personService.deletePerson(person.id)
      .then(() => {
        const newList = persons.filter(p => p.id !== person.id)
        setPersons(newList)
        console.log(person.name, ' has been deleted')
      })

    }
    else console.log(person.name, ' has NOT been deleted')
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
      <NumberList list={listToShow}
      deleteHandler={handleDelete}/>
    </div>
  )
}

export default App
