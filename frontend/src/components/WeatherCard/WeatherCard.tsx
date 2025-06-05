// WeatherCardComPrevisaoPorProps.tsx
import React from 'react';
import './WeatherCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { weatherIconMap } from '../../utils/weatherIconMap';
import Wave from './Wave';

interface WeatherCardProps {
  title?: string;
  value: string | number;
  unit?: string;
  icon?: React.JSX.Element;
  type: 'temperature' | 'humidity' | 'pressure' | 'solarRadiation' | 'windSpeed' | 'windDirection' | 'dam' | 'previsao' | 'map';
  espValue?: string; 
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
    temperature: { low: '#FF7F50', medium: '#FF7F50', high: '#FF7F50' },
    humidity: { low: '#5DADE2', medium: '#5DADE2', high: '#5DADE2' },
    pressure: { low: '#85929E', medium: '#85929E', high: '#85929E' },
    solarRadiation: { low: '#F7DC6F', medium: '#F7DC6F', high: '#F7DC6F' },
    windSpeed: { low: '#b0bec5', medium: '#b0bec5', high: '#b0bec5' },
    windDirection: { default: '#AF7AC5' },
    dam: { low: '#DC2626', medium: '#FACC15', high: '#22C55E' }
  };

  const thresholds = {
    temperature: { low: 15, high: 30 },
    humidity: { low: 30, high: 70 },
    pressure: { low: 980, high: 1020 },
    solarRadiation: { low: 200, high: 800 },
    windSpeed: { low: 5, high: 15 },
    dam: { low: 30, high: 70 }
  };

  const colorScheme = colors[type as keyof ColorSchemes] as ColorScheme;
  if (type === 'windDirection') return colors.windDirection.default;
  if (!thresholds[type as keyof typeof thresholds]) return colorScheme.medium;

  const threshold = thresholds[type as keyof typeof thresholds];
  if (value <= threshold.low) return colorScheme.low;
  if (value >= threshold.high) return colorScheme.high;
  return colorScheme.medium;
};

const WeatherCard: React.FC<WeatherCardProps> = ({
  title,
  value,
  unit,
  icon,
  type,
  espValue
}) => {
  const numericValue = typeof value === 'string' ? parseFloat(value) : value;
  const backgroundColor =
    type === 'previsao' ? '#1976d2' : getCardColor(type, numericValue);

    if (type === 'dam') {
    return (
      <div className="dam-card-full">
        <div className="dam-content">
          <div className="wave-container">
            <Wave percent={numericValue} color={backgroundColor} />
          </div>
          <div className="dam-info">
            <div className='dam-header'>
            <div className="dam-title">{title}</div>
            {icon}
            </div>
            <div className="weather-card-content">
              <span className='weather-value'>{value}</span>
              <span className="weather-unit">{unit}</span>
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
          {icon}
        </div>
        <div className="weather-card-content">
          <span className="weather-value">{value}</span>
          <span className="weather-unit">{unit}</span>
          <div className="wind-arrow" style={{ transform: `rotate(${value}deg)` }}>
            <FontAwesomeIcon size="2x" color="white" icon={faArrowUp} />
          </div>
        </div>
      </div>
    );
  }

  if (type === 'previsao') {
    const iconDef = weatherIconMap[espValue ?? 'Unknown'] ?? weatherIconMap['Unknown'];

    return (
      <div className="weather-card" style={{ backgroundColor }}>
        <div className="weather-card-header">
          <h3>{title}</h3>
          <FontAwesomeIcon  icon={iconDef} size="5x" color="white" />
        </div>
        <div className="weather-card-content">
          <span className="weather-value">{value}</span>
          <span className="weather-unit">{unit}</span>
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
