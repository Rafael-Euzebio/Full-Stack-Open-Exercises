import { useEffect, useState } from "react";
import apiServices from "../services/apiServices";

const Search = ({ countries, setCountries, setFiltered }) => {
    const [query, setQuery] = useState('')

    useEffect(() => {
        apiServices.getAll().then((countries) => setCountries(countries))
    }, [query])

    const handleQueryChange = (event) => {
        const updatedQuery = event.target.value
        setQuery(updatedQuery)
        filter(countries, updatedQuery)
    }

    const filter = (countries, query) => {
        const filtered = countries.filter((country) => {
            const name = country.name.common
            return name.toLowerCase().includes(query.toLowerCase())
        })
        setFiltered(filtered)
    }

    return (
        <>
            <input value={query} onChange={handleQueryChange} />
        </>
    )
}

export default Search
