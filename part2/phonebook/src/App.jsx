import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' }
    ])
    const [newName, setNewName] = useState('')

    const handleNameInsert = (event) => {
        setNewName(event.target.value)
    }

    const isInPhonebook = (newName) => {
        persons.map((person) => {
            const name = person.name
            if (newName === name) {
                return true
            }
        })
    }

    const handleNameSubmit = (event) => {
        event.preventDefault()

        if (isInPhonebook == false) {
            setPersons(persons.concat({ name: newName }))
            setNewName('')
        }
        else {
            alert(newName + ' is already in phonebook')
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
                    <button type="submit" onClick={handleNameSubmit}>add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <ul>
                {persons.map(person => {
                    return (
                        <li key={person.name}>{person.name}</li>
                    )
                })}
            </ul>
        </div>
    )
}

export default App
