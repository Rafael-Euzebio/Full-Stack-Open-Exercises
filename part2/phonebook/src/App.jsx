import { useEffect, useState } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import axios from 'axios'

const App = () => {
    const [persons, setPersons] = useState([])

    useEffect(() => {
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                setPersons(response.data)
            })
    }, [])

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter persons={persons} setPersons={setPersons} />

            <h3>Add new</h3>
            <PersonForm persons={persons} setPersons={setPersons} />

            <h3>Numbers</h3>
            <Persons persons={persons} />

        </div>
    )
}

export default App
