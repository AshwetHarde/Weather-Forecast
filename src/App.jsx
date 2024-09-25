import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cities from './components/cities.json';
import WeatherDisplay from './components/WeatherDisplay';
import SearchBar from './components/SearchBar';
import Footer from './components/Footer'; // Import the Footer component
import './App.css';
import Loader from './components/Loader';

const App = () => {
  const [weather, setWeather] = useState(null);
  const [cityName, setCityName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async (city) => {
    const { latitude, longitude } = city;
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,weathercode&daily=temperature_2m_max,temperature_2m_min,weathercode`);
      setWeather(response.data);
      setCityName(city.city);
      localStorage.setItem('lastSearchedCity', JSON.stringify(city));
    } catch (error) {
      if (error.response) {
        setError("Error fetching weather data. Please try again.");
      } else {
        setError("Network error. Please check your connection.");
      }
      console.error("Error fetching weather data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const lastCity = localStorage.getItem('lastSearchedCity');
    if (lastCity) {
      const city = JSON.parse(lastCity);
      fetchWeather(city);
      setCityName(city.city);
    } else {
      // Optional: Set a default city if no previous search exists
      const defaultCity = cities[0]; // Example: first city in the list
      if (defaultCity) {
        fetchWeather(defaultCity);
      }
    }
  }, []);

  return (
    <div className="app-container">
      <div className="search-container">
        <SearchBar 
          onSearch={(cityName) => {
            const city = cities.find(city => city.city.toLowerCase() === cityName.toLowerCase());
            if (city) {
              fetchWeather(city);
            } else {
              setError("City not found. Please enter a valid city.");
            }
          }} 
          cities={cities} 
        />
      </div>
      <div className="weather-container">
        {loading && <Loader/>}
        {error && <p className="error-message">{error}</p>}
        {weather && <WeatherDisplay weather={weather} cityName={cityName} />}
      </div>
      <Footer /> {/* Add Footer component */}
    </div>
    
  );
};

export default App;
