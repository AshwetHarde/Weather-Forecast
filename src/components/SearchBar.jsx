import React, { useState } from 'react';
import { IoSearch } from "react-icons/io5";  // This imports a search icon, but you can use ⌕ if you prefer

const SearchBar = ({ onSearch, cities }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value) {
      const filteredCities = cities.filter(city =>
        city.city.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredCities);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (city) => {
    setQuery(city.city);
    setSuggestions([]);
    onSearch(city.city);
  };

  return (
    <div className="search-container">
      <div className="search-input-wrapper">
        <span className="search-icon"><IoSearch /></span> {/* Search icon */}
        <input 
          type="text" 
          value={query} 
          onChange={handleChange} 
          placeholder="Search for a City " 
          className="search-input"
        />
      </div>
      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map(city => (
            <li key={city.id} onClick={() => handleSelect(city)}>
              {city.city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
