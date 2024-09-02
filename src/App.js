// src/App.js
import React, { useState } from "react";
import axios from "axios";
import "./App.css";

// Componente principal
function WeatherApp() {
  const [city, setCity] = useState(""); // Estado para armazenar o nome da cidade
  const [weatherData, setWeatherData] = useState(null); // Estado para armazenar os dados do clima
  const [error, setError] = useState(null); // Estado para erros

  // Função para buscar dados da API
  const fetchWeatherData = async (city) => {
    const apiKey = "SUA_API_KEY"; // Substitua pela sua chave da API do OpenWeatherMap
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
      const response = await axios.get(apiUrl);
      setWeatherData(response.data); // Armazenar dados no estado
      setError(null); // Limpar erros anteriores
    } catch (error) {
      setError("Cidade não encontrada ou erro na API.");
      setWeatherData(null);
    }
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = (event) => {
    event.preventDefault();
    if (city) {
      fetchWeatherData(city);
    }
  };

  // Função para determinar o background com base na temperatura
  const getBackgroundClass = () => {
    if (!weatherData) return "default";
    return weatherData.main.temp > 15 ? "warm" : "cold";
  };

  // Função para obter o ícone do clima
  const getWeatherIcon = () => {
    if (!weatherData) return "";
    const weatherCondition = weatherData.weather[0].main.toLowerCase();
    switch (weatherCondition) {
      case "clear":
        return "☀️";
      case "clouds":
        return "☁️";
      case "rain":
        return "🌧️";
      case "snow":
        return "❄️";
      case "thunderstorm":
        return "⛈️";
      default:
        return "🌤️";
    }
  };

  return (
    <div className={`app ${getBackgroundClass()}`}>
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button type="submit">Get Weather</button>
      </form>
      {error && <p className="error">{error}</p>}
      {weatherData && (
        <div className="weather-info">
          <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Condition: {weatherData.weather[0].description}</p>
          <div className="weather-icon">{getWeatherIcon()}</div>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
