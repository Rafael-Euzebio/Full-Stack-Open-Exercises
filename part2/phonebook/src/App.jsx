import { useState } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])

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
