import React from 'react';

const DailyForecast = ({ daily }) => {
  if (!daily) return null;

  return (
    <div className="daily-forecast">
      <h3>Daily Forecast (Next 5 Days)</h3>
      <div className="daily-items-container">
        {daily.time.map((time, index) => (
          <div key={index} className="daily-item">
            <p>{new Date(time).toLocaleDateString('en-GB')}</p>
            <img src={`path_to_icons/${daily.weathercode[index]}.png`} alt="Weather Icon" className="small-icon" />
            <p>Max: {daily.temperature_2m_max[index]}°C Min: {daily.temperature_2m_min[index]}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyForecast;
