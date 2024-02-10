import { useState } from "react"
import phonebookServices from "../services/phonebookServices"

const PersonForm = ({ persons, setPersons, setMessage, }) => {

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
                if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) {
                    const updatedPerson = { ...person, number: newNumber }

                    phonebookServices
                        .update(updatedPerson)
                        .then(returnedPerson => {
                            setPersons(persons.map(person =>
                                person.id !== returnedPerson.id ? person : returnedPerson
                            ))
                            setMessage({ text: `Updated ${person.name}'s number to ${returnedPerson.number}`, type: 'confirmation' })
                        })
                        .catch(
                            error => {
                                setMessage({ text: `Information of ${person.name} has already been removed from the server`, type: 'error' })
                            }
                        )

                }
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
                    setMessage({ text: `Added ${newPerson.name}`, type: 'confirmation' })
                })
                .catch(error => {
                    setMessage({ text: error.response.data.error, type:'error'})
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
