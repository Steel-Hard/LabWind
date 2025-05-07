import React, { useState, useEffect } from 'react';
import WeatherCard from '../components/WeatherCard';
import { getSimulatedWeatherData, WeatherData } from '../services/SensorDataService';
import './Dashboard.css';
import { Header, Nav } from '../components';

const Dashboard: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData>(getSimulatedWeatherData());
  const [windDirection, setWindDirection] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWeatherData(getSimulatedWeatherData());
      // Simula mudança na direção do vento (0-359 graus)
      setWindDirection(Math.floor(Math.random() * 360));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Header>
        <Nav />
      </Header>
      <div className="dashboard-container">
        <div className="main-content">
          <div className="grid-container">
            <WeatherCard
              title="Temperatura"
              value={weatherData.temperature.value.toFixed(1)}
              unit={weatherData.temperature.unit}
              icon="🌡️"
              type="temperature"
            />
            <WeatherCard
              title="Umidade"
              value={weatherData.humidity.value.toFixed(1)}
              unit={weatherData.humidity.unit}
              icon="💧"
              type="humidity"
            />
            <WeatherCard
              title="Pressão"
              value={weatherData.pressure.value.toFixed(1)}
              unit={weatherData.pressure.unit}
              icon="🧭"
              type="pressure"
            />
            <WeatherCard
              title="Radiação Solar"
              value={weatherData.solarRadiation.value.toFixed(1)}
              unit={weatherData.solarRadiation.unit}
              icon="☀️"
              type="solarRadiation"
            />
            <WeatherCard
              title="Velocidade do Vento"
              value={weatherData.wind.value.toFixed(1)}
              unit={weatherData.wind.unit}
              icon="💨"
              type="windSpeed"
            />
            <WeatherCard
              title="Direção do Vento"
              value={windDirection}
              unit="°"
              icon="🧭"
              type="windDirection"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;