import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arthur Hellas', number: '040-124567' }
    ])

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const handleNameInsert = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberInsert = (event) => {
        setNewNumber(event.target.value)
    }

    const isInPhonebook = () => {
        let found = false

        persons.map((person) => {
            const name = person.name
            if (newName === name) {
                alert(`${newName} is already in phonebook`)
                found = true
            }
        })

        return found
    }

    const handleNameSubmit = (event) => {
        event.preventDefault()

        if (isInPhonebook() == false) {
            setPersons(persons.concat({
                name: newName, number: newNumber
            }))
            setNewName('')
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form>
                <div>
                    name: <input type="text" value={newName} onChange={handleNameInsert} />
                </div>
                <div>
                    number: <input type="text" value={newNumber} onChange={handleNumberInsert} />
                </div>
                <div>
                    <button type="submit" onClick={handleNameSubmit}>add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <ul>
                {persons.map(person => {
                    return (
                        <li key={person.name}>{person.name} {person.number}</li>
                    )
                })}
            </ul>
        </div>
    )
}

export default App
