import { useEffect, useState } from 'react'
import './RenderCountry.css'
import weatherServices from '../services/weatherServices'

const WeatherData = ({ country }) => {
    const latitude = country.capitalInfo.latlng[0]
    const longitude = country.capitalInfo.latlng[1]
    const parameters = weatherServices.parameters
    const [values, setvalues] = useState({ temperatture: null, wind: null })

    useEffect(() => {
        weatherServices.getForecast(latitude, longitude).then((weather) => {
            setvalues({ temperature: weather.hourly[parameters.temperature][0], wind: weather.hourly[parameters.wind][0] })
        })
    }, [])

    return (
        <>
            <h3>Weather in {country.capital}</h3>
            <ul>
                <li key="temperature">Temperature: {values.temperature} celsius</li>
                <li key="wind">{values.wind} km/h</li>
            </ul>
        </>
    )


}
const CountryButton = ({ country }) => {
    const [show, setshow] = useState(false)

    const handleClick = () => {
        setshow(!show)
    }
    return (
        <>
            <button onClick={handleClick}>show</button>
            {
                show === true ?
                    <div>
                        <CountryData country={country} />
                    </div>
                    : null
            }
        </>
    )
}

const CountryList = ({ countries }) => {
    return (
        <>
            {
                countries.map((country) => {
                    return (
                        <li key={country.name.official}>{country.name.common} <CountryButton country={country} /></li>
                    )
                })
            }
        </>
    )
}

const CountryData = ({ country }) => {
    let languages = []
    for (let language in country.languages) {
        languages = languages.concat(country.languages[language])
    }

    return (
        <>
            <h2>{country.name.common}</h2>
            <p>capital: {country.capital}</p>
            <p>area: {country.area}</p>
            <h3>languages: </h3>
            <ul>
                {
                    languages.map((language) => {
                        return (
                            <li key={language}>{language}</li>
                        )
                    })
                }
            </ul>

            <div className="flag">{country.flag}</div>

            <WeatherData country={country} />
        </>
    )
}
const RenderCountry = ({ countries }) => {

    if (countries.length === 0 || countries.length > 10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    }
    else if (countries.length <= 10 && countries.length > 1) {

        return (
            <ul>
                <CountryList countries={countries} />
            </ul>
        )
    }
    else {
        return (
            <CountryData country={countries[0]} />
        )

    }
}

export default RenderCountry
