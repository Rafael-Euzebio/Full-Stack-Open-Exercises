import { useState } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arthur Hellas', number: '040-124567' }
    ])


    return (
        <div>
            <h2>Phonebook</h2>
            <PersonForm persons={persons} setPersons={setPersons} />
            <h2>Numbers</h2>
            <Persons persons={persons} />
        </div>
    )
}

export default App
