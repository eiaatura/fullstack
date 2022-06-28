import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios'

const COUNTRY_RESOURCE = 'https://restcountries.com/v2/all';
const WEATHER_RESOURCE = 'https://api.openweathermap.org/data/2.5/weather?'
const WEATHER_ICON_RESOURCE = 'http://openweathermap.org/img/wn/{icon}@2x.png'
const API_KEY = '584c73c074af1ccb7b3234341328ca3d' 
const METRICS = 'metric'
// Tämä ei jostain syystä toiminut näin kuten yllä, 
//mutta kaikki toimii kun laitan oman API avaimen tähän kohtaan


const Filter = ({filter, handleFilterChanged}) => {
  return (<p>filter countries <input value={filter} onChange={handleFilterChanged}/></p>)
}

const MainView = ({countries, selectedCountry}) => {
  if (countries.length < 1 || countries.length > 190) {
    return (<p>No Countries Found</p>)
  }
  if (countries.length < 2) {
    return (<CountryInfo country={countries[0]}/>)
  } else if ( 1 < countries.length && countries.length < 10) {
    return ( <CountryListing countries={countries} selectedCountry={selectedCountry}/>
    )
  } else {
    return (<p>Too many matches, specify another filter</p>)
  }
}

const CountryListing = ({countries, selectedCountry}) => {
  return (
    <div>
      <ul>
        {countries.map(country =>
          <CountryListingItem key={country.name} country={country} selectedCountry={selectedCountry}/>)}
      </ul>
    </div>
  )
}

const CountryListingItem = ({country, selectedCountry}) => {
  const createClickHandler = (country) => {
    return () => selectedCountry(country)
  }
  return (
    <div>
      <li>
        {country.name} <button onClick={createClickHandler(country)}> show </button>
      </li>
    </div>
  )
}

const CountryInfo = ({country}) => (
  <div>
    <h1>{country.name}</h1>
    <p>capital {country.capital}<br/>
    population {country.population}</p>
    <h3>Languages:</h3>
      <ul>
        {country.languages.map(l => <li key={l.name}>{l.name}</li>)}
      </ul>
    <img src={country.flag} width="150" alt=""/>
    <Weather country={country}/>
  </div>
)

const buildWeatherUrl = (country) => {
  const url = new URL(WEATHER_RESOURCE);
  url.searchParams.append('q', country.capital);
  url.searchParams.append('units', METRICS);
  url.searchParams.append('appid', API_KEY);
  return url.toString();
}

const Weather = ({country}) => {

  const [weather, setWeather] = useState(undefined)
  const [iconUrl, setIconUrl] = useState('')
  const weatherUrl = buildWeatherUrl(country)
  useEffect(() => {
    axios.get(weatherUrl).then(response => {
      const icon = response.data.weather[0].icon
      const iconUrl = WEATHER_ICON_RESOURCE.replace("{icon}", icon)
      setWeather(response.data)
      setIconUrl(iconUrl)
    })
  }, [weatherUrl])

  if (weather) {
    return (
      <div>
        <h3>Weather in {country.capital}</h3>
        <p>temperature {weather.main.temp} Celsius</p>
        <img src={iconUrl} alt='' />
        <p>wind {weather.wind.speed} m/s</p>
      </div>
    )
  } else {
    return(<h5>Weather not found</h5>)
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  const handleFilterChanged = (event) => (
    setFilter(event.target.value)
  )

  const countryNameFilter = (country) => (
    country.name.toLowerCase().includes(filter.toLowerCase())
  )

  const selectedCountry = (country) => (
    setFilter(country.name)
  )

  useEffect(() => {
    axios.get(COUNTRY_RESOURCE).then(response => {
        setCountries(response.data)
      })
    }, [])


  return (
    <div>
      <Filter filter={filter} handleFilterChanged={handleFilterChanged} />
      <MainView countries={countries.filter(countryNameFilter)} selectedCountry={selectedCountry}/>
    </div>
  );
}

export default App;