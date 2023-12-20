import React, { useEffect, useState } from "react";
import axios from "axios";
const api_key = import.meta.env.VITE_SOME_KEY;
const App = () => {
  const [allNames, setAllNames] = useState([]);
  const [display, setDisplay] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [tooManyMatches, setTooManyMatches] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((res) => setAllNames(res.data))
      .catch((err) => console.error("Error fetching countries:", err));
  }, []);

  const handleInputChange = (e) => {
    const countryName = e.target.value.toLowerCase();

    if (countryName.trim() === "") {
      setDisplay([]);
      setTooManyMatches(false);
      return;
    }

    const filteredCountries = allNames.filter((country) =>
      country.name.common.toLowerCase().includes(countryName)
    );

    if (filteredCountries.length > 10) {
      setTooManyMatches(true);
      setDisplay([]);
    } else {
      setTooManyMatches(false);
      setDisplay(filteredCountries);
    }

    setSelectedCountry(null); // Reset selectedCountry when filtering countries
  };
  const fetchWeatherData = async (capital) => {
    try {
      const response = await axios.get(
        `http://api.weatherapi.com/v1/current.json?key=08de619fb7884c2bba862540232012&q=${capital}&aqi=no`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const handleCountryButtonClick = (country) => {
    setSelectedCountry(country);
    if (country.capital) {
      fetchWeatherData(country.capital[0]);
    }
  };
  return (
    <div>
      <h1>Countries</h1>
      <label htmlFor="countryInput">Country: </label>
      <input
        type="text"
        id="countryInput"
        placeholder="Enter country name..."
        onChange={handleInputChange}
      />
      {tooManyMatches && <p>Please make your query more specific.</p>}
      <ul>
        {display.map((country, index) => (
          <li key={index}>
            {country.name.common}
            <button onClick={() => handleCountryButtonClick(country)}>
              Show Details
            </button>
          </li>
        ))}
      </ul>
      {selectedCountry && (
        <div>
          <h2>{selectedCountry.name.common}</h2>
          <p>Capital: {selectedCountry.capital}</p>
          <p>Area: {selectedCountry.area} km²</p>
          <p>
            Languages: {Object.values(selectedCountry.languages).join(", ")}
          </p>
          <img
            src={selectedCountry.flags.png}
            alt={`${selectedCountry.name.common} flag`}
          />
          {weatherData && (
            <div>
              <h3>Weather in {selectedCountry.capital}</h3>
              <p>Temperature (celsius) : {weatherData.current.temp_c}°C</p>
              <p>Wind (Kph) : {weatherData.current.wind_kph}</p>
              <p>Local time : {weatherData.location.localtime}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
