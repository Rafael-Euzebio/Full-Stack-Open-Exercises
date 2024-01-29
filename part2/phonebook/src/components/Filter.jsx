import { useState } from "react"

const Filter = ({ persons, setPersons }) => {

    const [nameFilter, setNameFilter] = useState('')

    const handleFilterChange = (event) => {
        const updatedFilter = event.target.value
        const filteredPersons = filterPersons(updatedFilter)
        setPersons(filteredPersons)
        setNameFilter(event.target.value)
    }

    const filterPersons = (filter) => {
        return persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))
    }



    return (
        <input value={nameFilter} onChange={handleFilterChange} />
    )
}

export default Filter
