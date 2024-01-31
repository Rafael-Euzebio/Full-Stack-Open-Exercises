import { useEffect, useState } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import Message from './components/Message'
import phonebookServices from './services/phonebookServices'

const App = () => {
    const [persons, setPersons] = useState([])
    const [message, setMessage] = useState({ text: null, type: null })

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
            <Message message={message} setMessage={setMessage} />
            <Filter persons={persons} setPersons={setPersons} />

            <h3>Add new</h3>
            <PersonForm
                persons={persons} setPersons={setPersons}
                setMessage={setMessage}
            />

            <h3>Numbers</h3>
            <Persons
                persons={persons} setPersons={setPersons}
                setMessage={setMessage}
            />

        </div>
    )
}

export default App
