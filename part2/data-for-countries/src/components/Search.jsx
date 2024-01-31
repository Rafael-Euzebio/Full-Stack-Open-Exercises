import { useEffect, useState } from "react";
import apiServices from "../services/apiServices";
import RenderCountry from "./RenderCountry";

const Search = ({ countries, setCountries, setFiltered }) => {
    const [query, setQuery] = useState('')

    useEffect(() => {
        apiServices.getAll().then((countries) => setCountries(countries))
    }, [query])

    const handleQueryChange = (event) => {
        setQuery(event.target.value)
        filter(countries, query)
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
