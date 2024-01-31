import { useState } from 'react'
import Search from './components/Search'
import RenderCountry from './components/RenderCountry'

function App() {
    const [countries, setCountries] = useState([])
    const [filtered, setFiltered] = useState(countries)

    return (
        <>
            <p>Find countries</p>
            <Search countries={countries} setCountries={setCountries} setFiltered={setFiltered} />
            <RenderCountry countries={filtered} />
        </>
    )
}

export default App
