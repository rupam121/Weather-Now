import React, { useState, useEffect } from 'react';

function WeatherApp() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    try {
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=35&longitude=139&current_weather=true`);
      const data = await response.json();
      setWeather(data.current_weather);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    // 
  }, []);

  return (
    <div className="flex flex-col items-center p-6 bg-blue-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Weather Now</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="p-2 border border-gray-300 rounded mb-4"
      />
      <button
        onClick={fetchWeather}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-blue-600"
      >
        Check Weather
      </button>

      {loading && <p className="mt-4">Loading...</p>}

      {weather && (
        <div className="mt-4 p-4 bg-white shadow-md rounded">
          <h2 className="text-2xl font-semibold">Weather Details</h2>
          <p>Temperature: {weather.temperature}°C</p>
          <p>Wind Speed: {weather.windspeed} km/h</p>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
