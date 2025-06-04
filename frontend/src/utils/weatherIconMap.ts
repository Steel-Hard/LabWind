// src/utils/weatherIconMap.ts
import {
  faSun,
  faCloud,
  faCloudRain,
  faCloudShowersHeavy,
  faBolt,
  faSnowflake,
  faSmog,
  faWind,
  faQuestionCircle
} from '@fortawesome/free-solid-svg-icons';

import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export const weatherIconMap: Record<string, IconDefinition> = {
  Clear: faSun,
  Clouds: faCloud,
  Rain: faCloudRain,
  Drizzle: faCloudShowersHeavy,
  Thunderstorm: faBolt,
  Snow: faSnowflake,
  Mist: faSmog,
  Smoke: faSmog,
  Haze: faSmog,
  Dust: faSmog,
  Fog: faSmog,
  Sand: faSmog,
  Ash: faSmog,
  Squall: faWind,
  Tornado: faWind,
  Unknown: faQuestionCircle
};
