import { useEffect, useState } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import phonebookServices from './services/phonebookServices'

const App = () => {
    const [persons, setPersons] = useState([])

    useEffect(() => {
        phonebookServices
            .getAll()
            .then(registeredPersons => {
                setPersons(registeredPersons)
            })
    }, [])

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter persons={persons} setPersons={setPersons} />

            <h3>Add new</h3>
            <PersonForm persons={persons} setPersons={setPersons} />

            <h3>Numbers</h3>
            <Persons persons={persons} setPersons={setPersons} />

        </div>
    )
}

export default App
