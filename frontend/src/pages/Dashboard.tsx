/* eslint-disable @typescript-eslint/no-explicit-any */
import { Header, Nav, WeatherCard } from '../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWind,
  faTemperatureHigh,
  faWater,
  faSun,
  faGaugeHigh,
  faDroplet
} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { WeatherData, getSimulatedWeatherData } from '../utils/simulatedWeather';
import BarragemService from '../services/BarragemService';

const Dashboard: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData>(getSimulatedWeatherData());
  const [windDirection, setWindDirection] = useState(0);
  const [barragemData, setBarragemData] = useState<string | any>();

  useEffect(() => {
    const interval = setInterval(() => {
      setWeatherData(getSimulatedWeatherData());
      setWindDirection(Math.floor(Math.random() * 360));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchBarragemData = async () => {
      try {
        const response = await BarragemService.getStatus();
        setBarragemData(response.volumeUtil);
      } catch (error) {
        console.error("Erro ao buscar dados da barragem:", error);
      }
    };
    fetchBarragemData();
  }, []);

  return (
    <>
      <Header>
        <Nav />
      </Header>

      <div className="page-container min-h-screen flex flex-col items-center p-4">
      <div className="grid-container flex-1 flex items-center justify-center">
          <WeatherCard
            title="Temperatura"
            value={weatherData.temperature.value.toFixed(1)}
            unit={weatherData.temperature.unit}
            icon={<FontAwesomeIcon size={'5x'} color='black' icon={faTemperatureHigh} />}
            type="temperature"
          />
          <WeatherCard
            title="Umidade"
            value={weatherData.humidity.value.toFixed(1)}
            unit={weatherData.humidity.unit}
            icon={<FontAwesomeIcon size={'5x'} color='black' icon={faDroplet} />}
            type="humidity"
          />
          <WeatherCard
            title="Pressão Atmosférica"
            value={weatherData.pressure.value.toFixed(1)}
            unit={weatherData.pressure.unit}
            icon={<FontAwesomeIcon size={'5x'} color='black' icon={faGaugeHigh} />}
            type="pressure"
          />
          <WeatherCard
            title="Radiação Solar"
            value={weatherData.solarRadiation.value.toFixed(1)}
            unit={weatherData.solarRadiation.unit}
            icon={<FontAwesomeIcon size={'5x'} color='black' icon={faSun} />}
            type="solarRadiation"
          />
          <WeatherCard
            title="Velocidade do Vento"
            value={`${weatherData.wind.value.toFixed(1)} `}
            unit={weatherData.wind.unit}
            icon={<FontAwesomeIcon size={'5x'} color='black' icon={faWind} />}
            type="windSpeed"
          />
          <WeatherCard
            title="Direção do Vento"
            value={windDirection}
            unit="°"
            icon={<FontAwesomeIcon size={'5x'} color='black' icon={faWater} />}
            type="windDirection"
          />
        </div>

        {barragemData && (
         <div className="dam-card-container w-full flex justify-center mt-10">
            <WeatherCard
            title="Volume da Barragem"
            value={barragemData}
            unit="%"
            icon={<FontAwesomeIcon size={'5x'} color='black' icon={faWater} />}
            type="dam"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
