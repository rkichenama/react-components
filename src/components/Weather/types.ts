export interface CurrentWeather {
  temperature: number;
  windspeed: number;
  winddirection: number;
  weathercode: number;
  time: string;
}

export interface Units {
  time: string;
  temperature2m?: '°F' | '°C';
  temperature2mMax?: '°F' | '°C';
  temperature2mMin?: '°F' | '°C';
  precipitationHours?: string;
}

export interface OpenMeteoResponse {
  latitude: number;
  longitude: number;
  utcOffsetSeconds: number;
  timezone: string;
  timezoneAbbreviation: string;
  elevation: number;
  currentWeather: CurrentWeather;
  hourlyUnits: Units;
  dailyUnits: Units;
  hourly: {
    time: string[];
    temperature2m: number[];
    weathercode: number[];
  };
  daily: {
    time: string[];
    temperature2mMax: number[];
    temperature2mMin: number[];
    precipitationHours: number[];
    weathercode: number[];
  }
}

export interface WeatherProps {
  cardCount: number;
  showDescription: boolean;
}
