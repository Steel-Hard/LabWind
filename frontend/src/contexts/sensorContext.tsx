/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import  { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import SensorDataService from '../services/SensorDataService';
import { ISensorData } from '../types';

// Definições do contexto
type SensorContextType = {
  stations: string[];
  setStations: (s: string[]) => void;
  date: string;
  setDate: (d: string) => void;
  chartData: ISensorData[];
};

const SensorContext = createContext<SensorContextType | undefined>(undefined);

export const useSensor = () => {
  const ctx = useContext(SensorContext);
  if (!ctx) throw new Error('useSensor must be used within SensorProvider');
  return ctx;
};

export const SensorProvider = ({ children }: { children: ReactNode }) => {
  const [stations, setStations] = useState<string[]>([]);
  const [date, setDate] = useState<string>('');
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    if (!date || stations.length === 0) {
      setChartData([]);
      return;
    }

    const METRICS = [
      'temp',       
      'hum',        
      'bar',        
      'uv_level',   
      'wind_avg',   
      'wind_peak'   
    ];

    Promise.all(
      stations.map(est =>
        SensorDataService.getByDateAndEstacao(date, est).then(data =>
          data.map(d => ({
            time: d.time,
            ...METRICS.reduce((acc, key) => {
              acc[`${key}_${est}`] = (d as any)[key];
              return acc;
            }, {} as Record<string, any>)
          }))
        )
      )
    ).then(arrays => {
      const merged: any[] = [];
      const len = arrays[0]?.length || 0;
      for (let i = 0; i < len; i++) {
        merged.push(Object.assign({}, ...arrays.map(arr => arr[i])));
      }
      setChartData(merged);
    });
  }, [stations, date]);

  return (
    <SensorContext.Provider value={{ stations, setStations, date, setDate, chartData }}>
      {children}
    </SensorContext.Provider>
  );
};
