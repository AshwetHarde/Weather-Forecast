import React from "react";
import { ImLocation } from "react-icons/im"; // Import the location icon
import "../App.css"; // Add styles in this file
import { FaAngleUp, FaAngleDown } from "react-icons/fa";

const weatherDescriptions = {
  // Weather descriptions
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Heavy drizzle",
  56: "Freezing drizzle (Light)",
  57: "Freezing drizzle (Dense)",
  61: "Light rain",
  63: "Moderate rain",
  65: "Heavy rain",
  66: "Freezing rain (Light)",
  67: "Freezing rain (Heavy)",
  71: "Light snowfall",
  73: "Moderate snowfall",
  75: "Heavy snowfall",
  77: "Snow grains",
  80: "Slight rain showers",
  81: "Heavy rain showers",
  82: "Violent showers",
  95: "Thunderstorm (Slight or moderate)",
  96: "Thunderstorm with slight hail",
  99: "Thunderstorm with heavy hail",
};

const weatherIcons = {
  // Weather icons
  0: "0.png",
  1: "1.png",
  2: "2.png",
  3: "3.png",
  45: "45.png",
  48: "48.png",
  51: "51.png",
  53: "53.png",
  55: "55.png",
  56: "56.png",
  57: "57.png",
  61: "61.png",
  63: "63.png",
  65: "65.png",
  66: "66.png",
  67: "67.png",
  71: "71.png",
  73: "73.png",
  75: "75.png",
  77: "77.png",
  80: "63.png",
  81: "65.png",
  82: "82.png",
  95: "95.png",
  96: "96.png",
  99: "99.png",
};

const isNightTime = (hour) => {
  return hour >= 19 || hour < 6; // 7 PM to 5:59 AM
};

const getIcon = (code, hour) => {
  const icon = weatherIcons[code] || "default.png";
  return isNightTime(hour) ? `night/${icon}` : icon;
};

// Function to format date to DDMMYYYY
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0"); // Add leading zero
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const WeatherDisplay = ({ weather, cityName }) => {
  if (!weather || !weather.current_weather) {
    return null; // Return null if no weather data is available
  }

  const { current_weather, hourly, daily } = weather;
  const currentHour = new Date(current_weather.time).getHours();
  const currentWeatherDescription =
    weatherDescriptions[current_weather.weathercode] || "Unknown weather";
  const currentWeatherIcon = getIcon(current_weather.weathercode, currentHour);

  const hourlyData = hourly.time.slice(0, 24) || [];
  const hourlyTemperatures = hourly.temperature_2m.slice(0, 24) || [];
  const hourlyWeatherCodes = hourly.weathercode.slice(0, 24) || [];

  const dailyData = daily.time.slice(0, 5) || [];
  const dailyMaxTemperatures = daily.temperature_2m_max.slice(0, 5) || [];
  const dailyMinTemperatures = daily.temperature_2m_min.slice(0, 5) || [];
  const dailyWeatherCodes = daily.weathercode.slice(0, 5) || [];

  return (
    <div>
      <div className="current-weather-container">
        <p className="current-temperature">{current_weather.temperature}°C</p>
        <div className="city">
          <h1>
            <ImLocation className="location-icon" /> {cityName}
          </h1>
        </div>
        <img
          src={`/icons/${currentWeatherIcon}`}
          alt={currentWeatherDescription}
          className="big-icon"
        />
        <div className="weather-details">
          <div className="weather-condition">
            <span className="text">{currentWeatherDescription}</span>
          </div>
          <div className="wind-speed">
            <img src="/icons/wind.png" alt="Wind Speed Icon" className="icon" />
            <span className="wtext">{current_weather.windspeed} km/h</span>
          </div>
        </div>
      </div>
      <hr className="hr" />
      <h3 className="txt24">Next 24-Hour Weather Prediction</h3>
      <div className="scroll-container">
        <div className="scroll-items">
          {hourlyData.length > 0 ? (
            // Get the current hour
            (() => {
              const currentTime = new Date();
              const currentHour = currentTime.getHours();

              // Create an array of hours starting from current time
              const hoursToDisplay = [];
              for (let i = 0; i < 24; i++) {
                hoursToDisplay.push((currentHour + i) % 24); // Wrap around to 0 after 23
              }

              // Rearrange hourlyData based on hoursToDisplay
              const adjustedHourlyData = hoursToDisplay
                .map((hour) => {
                  const index = hourlyData.findIndex(
                    (time) => new Date(time).getHours() === hour
                  );
                  return index !== -1 ? hourlyData[index] : null; // Only include valid data
                })
                .filter((time) => time !== null); // Filter out any null values

              return adjustedHourlyData.map((time, index) => {
                const forecastTime = new Date(time);
                const formattedTime = forecastTime.toLocaleTimeString([], {
                  hour: "numeric",
                  hour12: true,
                });
                const hourlyWeatherIcon = getIcon(
                  hourlyWeatherCodes[index],
                  forecastTime.getHours()
                );

                return (
                  <div key={index} className="hourly-item">
                    <p>{formattedTime}</p>
                    <img
                      src={`/icons/${hourlyWeatherIcon}`}
                      alt={weatherDescriptions[hourlyWeatherCodes[index]]}
                      className="small-icon"
                    />
                    <p>{hourlyTemperatures[index]}°C</p>
                  </div>
                );
              });
            })()
          ) : (
            <p>No hourly data available.</p>
          )}
        </div>
      </div>
      <hr className="hr" />

      <h3 className="txt24">Upcoming Days Weather Forecast</h3>
      <div className="daily-items-container">
  <div className="scrollable-content">
    {dailyData.length > 0 ? (
      dailyData.map((time, index) => {
        const dailyWeatherIcon = getIcon(
          dailyWeatherCodes[index],
          currentHour
        );
        const formattedDate = formatDate(time); // Format date to DDMMYYYY
        return (
          <div key={index} className="daily-item">
            <p>{formattedDate}</p>
            <img
              src={`/icons/${dailyWeatherIcon}`}
              alt={weatherDescriptions[dailyWeatherCodes[index]]}
              className="small-icon"
            />
            <p>Max: {dailyMaxTemperatures[index]}°C</p>
            <p>Min: {dailyMinTemperatures[index]}°C</p>
          </div>
        );
      })
    ) : (
      <p>No daily data available.</p>
    )}
  </div>
  
  {/* Up and Down Scroll Indicators */}
  <div className="scroll-indicators">
    <span className="icon-up">
      <FaAngleUp />
    </span>
    <span className="icon-down">
      <FaAngleDown />
    </span>
  </div>
</div>

    </div>
  );
};

export default WeatherDisplay;
