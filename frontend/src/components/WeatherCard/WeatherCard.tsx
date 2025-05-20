import React from 'react';
import './WeatherCard.css';

interface WeatherCardProps {
  title: string;
  value: string | number;
  unit: string;
  icon: React.JSX.Element;
  type: 'temperature' | 'humidity' | 'pressure' | 'solarRadiation' | 'windSpeed' | 'windDirection';
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
};

const getCardColor = (type: string, value: number): string => {
  const colors: ColorSchemes = {
    temperature: {
      low: '#3B82F6',    // Azul claro
      medium: '#FBBF24', // Amarelo
      high: '#B91C1C'    // Vermelho escuro
    },
    humidity: {
      low: '#FDE68A',    // Bege seco
      medium: '#60A5FA', // Azul claro
      high: '#1E40AF'    // Azul escuro
    },
    pressure: {
      low: '#DC2626',    // Vermelho
      medium: '#86EFAC', // Verde claro
      high: '#065F46'    // Verde escuro
    },
    solarRadiation: {
      low: '#D1D5DB',    // Cinza
      medium: '#FACC15', // Amarelo
      high: '#EA580C'    // Laranja
    },
    windSpeed: {
      low: '#E5E7EB',    // Cinza claro
      medium: '#22D3EE', // Ciano
      high: '#0E7490'    // Azul petróleo
    },
    windDirection: {
      default: '#F3F4F6' // Neutro
    }
  };

  const thresholds = {
    temperature: { low: 15, high: 30 },
    humidity: { low: 30, high: 70 },
    pressure: { low: 980, high: 1020 },
    solarRadiation: { low: 200, high: 800 },
    windSpeed: { low: 5, high: 15 }
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

// const getWindDirectionIcon = (degrees: number): string => {
//   const directions = ['↑', '↗️', '→', '↘️', '↓', '↙️', '←', '↖️'];
//   const index = Math.round(degrees / 45) % 8;
//   return directions[index];
// };

const WeatherCard: React.FC<WeatherCardProps> = ({ title, value, unit, icon, type }) => {
  const numericValue = typeof value === 'string' ? parseFloat(value) : value;
  const backgroundColor = getCardColor(type, numericValue);
  // const isWindDirection = type === 'windDirection';
  // const displayIcon = isWindDirection ? getWindDirectionIcon(numericValue) : icon;

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