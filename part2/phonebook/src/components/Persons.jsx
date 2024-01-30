import phonebookServices from "../services/phonebookServices"


const DeleteButton = ({ toDelete, persons, setPersons }) => {

    const handleDelete = () => {
        const { name, id } = toDelete

        if (window.confirm(`Delete ${name}?`)) {
            phonebookServices
                .remove(id)
                .then(removedPerson => {
                    const personsToKeep = persons.filter((person) => {
                        if (person.id !== removedPerson.id) {
                            return person;
                        }
                    })
                    setPersons(personsToKeep)
                })
        }
    }

    return (
        <button onClick={() => handleDelete()}>delete</button>
    )
}

const Persons = ({ persons, setPersons }) => {
    return (
        <ul>
            {persons.map(person => {
                return (
                    <li key={person.name}>{person.name} {person.number} <DeleteButton toDelete={person} persons={persons} setPersons={setPersons} /> </li>
                )
            })}
        </ul>
    )
}

export default Persons
