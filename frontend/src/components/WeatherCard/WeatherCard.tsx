import React from 'react';
import './WeatherCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWind, faArrowUp } from '@fortawesome/free-solid-svg-icons';

interface WeatherCardProps {
  title: string;
  value: string | number;
  unit: string;
  icon: React.JSX.Element;
  type: 'temperature' | 'humidity' | 'pressure' | 'solarRadiation' | 'windSpeed' | 'windDirection' | 'dam';
}

type ColorScheme = {
  low: string;
  medium: string;
  high: string;
};

type ColorSchemes = {
  temperature: ColorScheme;
  humidity: ColorScheme;
  pressure: ColorScheme;
  solarRadiation: ColorScheme;
  windSpeed: ColorScheme;
  windDirection: { default: string };
  dam: ColorScheme;
};

const getCardColor = (type: string, value: number): string => {
  const colors: ColorSchemes = {
    temperature: {
      low: '#FF7F50',   // Coral suave
      medium: '#FF7F50',
      high: '#FF7F50'
    },
    humidity: {
      low: '#5DADE2',   // Azul serenity
      medium: '#5DADE2',
      high: '#5DADE2'
    },
    pressure: {
      low: '#85929E',   // Cinza azulado
      medium: '#85929E',
      high: '#85929E'
    },
    solarRadiation: {
      low: '#F7DC6F',   // Amarelo suave
      medium: '#F7DC6F',
      high: '#F7DC6F'
    },
    windSpeed: {
      low: '#b0bec5',   // Verde menta
      medium: '#b0bec5',
      high: '#b0bec5'
    },
    windDirection: {
      default: '#AF7AC5' // Lilás claro
    },
    dam: {
      low: '#DC2626',    // Vermelho (baixo volume)
      medium: '#FACC15', // Amarelo (volume médio)
      high: '#22C55E'    // Verde (volume alto)
    }
  };

  const thresholds = {
    temperature: { low: 15, high: 30 },
    humidity: { low: 30, high: 70 },
    pressure: { low: 980, high: 1020 },
    solarRadiation: { low: 200, high: 800 },
    windSpeed: { low: 5, high: 15 },
    dam: { low: 30, high: 70 }
  };

  if (type === 'windDirection') {
    return colors.windDirection.default;
  }

  const threshold = thresholds[type as keyof typeof thresholds];
  const colorScheme = colors[type as keyof typeof colors] as ColorScheme;

  if (value <= threshold.low) return colorScheme.low;
  if (value >= threshold.high) return colorScheme.high;
  return colorScheme.medium;
};

const Wave = ({ percent, color }: { percent: number; color: string }) => {
  const y = 100 - (percent / 100) * 100;

  return (
    <svg className="wave-svg" viewBox="0 0 200 100" preserveAspectRatio="none">
      <path
        className="wave-path"
        d={`
          M0,${y}
          Q25,${y - 8} 50,${y}
          T100,${y}
          T150,${y}
          T200,${y}
          V100 H0 Z
        `}
      />
    </svg>
  );
};

const WeatherCard: React.FC<WeatherCardProps> = ({ title, value, unit, icon, type }) => {
  const numericValue = typeof value === 'string' ? parseFloat(value) : value;
  const backgroundColor = getCardColor(type, numericValue);

  if (type === 'dam') {
    return (
      <div className="dam-card-full">
        <div className="dam-content">
          <div className="wave-container">
            <Wave percent={numericValue} color={backgroundColor} />
          </div>
          <div className="dam-info">
            <div className="dam-title">{title}</div>
            <div className="dam-value-big">
              <span>{value}</span>
              <span className="dam-unit">{unit}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'windDirection') {
    return (
      <div className="weather-card" style={{ backgroundColor }}>
        <div className="weather-card-header">
          <h3>{title}</h3>
          <div className="wind-direction-icon">
            <FontAwesomeIcon size={'5x'} color='black' icon={faWind} />
          </div>
        </div>
        <div className="weather-card-content">
          <span className="weather-value">{value}</span>
          <span className="weather-unit">{unit}</span>
          <div className="wind-arrow" style={{ transform: `rotate(${value}deg)` }}>
            <FontAwesomeIcon size={'2x'} color='white' icon={faArrowUp} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="weather-card" style={{ backgroundColor }}>
      <div className="weather-card-header">
        <h3>{title}</h3>
        {icon}
      </div>
      <div className="weather-card-content">
        <span className="weather-value">{value}</span>
        <span className="weather-unit">{unit}</span>
      </div>
    </div>
  );
};

export default WeatherCard;
