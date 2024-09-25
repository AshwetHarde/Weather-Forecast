import React from 'react';
import { weatherDescriptions, getIcon } from './weatherUtils'; // Adjust the import according to your structure

const HourlyForecast = ({ hourlyData, hourlyWeatherCodes, hourlyTemperatures }) => {
  if (!hourlyData || hourlyData.length === 0) return <p>No hourly data available.</p>;

  // Get the current time
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();

  // Find the index for the current hour
  const currentTimeIndex = hourlyData.findIndex((time) => {
    const forecastTime = new Date(time);
    return (
      forecastTime.getHours() === currentHour &&
      forecastTime.getMinutes() === currentMinutes
    );
  });

  // If the exact current time is not found, find the next available hour
  const startIndex = currentTimeIndex !== -1 ? currentTimeIndex : hourlyData.findIndex((time) => {
    return new Date(time).getHours() > currentHour || (new Date(time).getHours() === currentHour && new Date(time).getMinutes() > currentMinutes);
  });

  // Ensure we display only 24 hours from the start index
  const displayedHourlyData = hourlyData.slice(startIndex, startIndex + 24);
  const displayedWeatherCodes = hourlyWeatherCodes.slice(startIndex, startIndex + 24);
  const displayedTemperatures = hourlyTemperatures.slice(startIndex, startIndex + 24);

  return (
    <div className="scroll-container">
      <div className="scroll-items">
        {displayedHourlyData.length > 0 ? (
          displayedHourlyData.map((time, index) => {
            const forecastTime = new Date(time);
            const formattedTime = forecastTime.toLocaleTimeString([], {
              hour: "numeric",
              hour12: true,
            });
            const hourlyWeatherIcon = getIcon(displayedWeatherCodes[index], forecastTime.getHours());

            return (
              <div key={index} className="hourly-item">
                <p>{formattedTime}</p>
                <img
                  src={`/icons/${hourlyWeatherIcon}`}
                  alt={weatherDescriptions[displayedWeatherCodes[index]]}
                  className="small-icon"
                />
                <p>{displayedTemperatures[index]}°C</p>
              </div>
            );
          })
        ) : (
          <p>No hourly data available.</p>
        )}
      </div>
    </div>
  );
};

export default HourlyForecast;
