import React, { useState } from 'react';
import CityList from './components/CityList'; // Adjust the path as necessary
import cities from './components/cities.json';

const App = () => {
  const [selectedCity, setSelectedCity] = useState(null);

  const handleSelectCity = (city) => {
    setSelectedCity(city);
    // Fetch weather data or perform any other action
  };

  return (
    <div>
      <h1>SkyMate</h1>
      <CityList cities={cities} onSelectCity={handleSelectCity} />
      {/* Other components like WeatherDisplay */}
    </div>
  );
};

export default App;
