import { useState } from "react"
import phonebookServices from "../services/phonebookServices"

const PersonForm = ({ persons, setPersons }) => {

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
        const newPerson = { name: newName, number: newNumber }

        if (isInPhonebook() == false) {
            phonebookServices
                .create(newPerson)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                })

            setNewName('')
            setNewNumber('')
        }
    }

    return (
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
    )
}

export default PersonForm