import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

//Gets all persons in the server
const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

//Adds a person to the server
const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

//Updates the person with the id with a new one
const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

//Deletes the person with the passed id
const deletePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    //returns true if its done propperly?
    return request.then(response => response.data)
}

export default { getAll, create, update, deletePerson }