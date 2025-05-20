import { useSensor } from '../../contexts/sensorContext';
import { ChartCard } from '../ChartCard';

const METRIC_INFO = [
  { key: 'temp_C', title: 'Temperatura (°C)' },
  { key: 'hum', title: 'Umidade (%)' },
  { key: 'press_Bar', title: 'Pressão (Bar)' },
  { key: 'SR_Wm2', title: 'Radiação Solar (W/m²)' },
  { key: 'WindSpeed_Avg', title: 'Velocidade do Vento Média' },
  { key: 'WindPeak_ms', title: 'Rajada de Vento (m/s)' },
];

const METRIC_COLOR_MAP: Record<string, string[]> = {
  temp_C: ['#2196f3', '#4caf50', '#00bcd4'],
  hum: ['#9c27b0', '#ff9800', '#f06292'],
  press_Bar: ['#3f51b5', '#8bc34a', '#ffeb3b'],
  SR_Wm2: ['#ff5722', '#ffc107', '#ff9800'],
  WindSpeed_Avg: ['#607d8b', '#03a9f4', '#00acc1'],
  WindPeak_ms: ['#e91e63', '#673ab7', '#c2185b'],
};


export function ChartList() {
  const { stations, chartData } = useSensor();

  if (!chartData.length) return null;

  return (
    <>
      {METRIC_INFO.map((metric) => {

        //possíveis chaves com base nas estações
        const expectedKeys = stations.map(est => `${metric.key}_${est}`);

       
        const availableKeys = expectedKeys;

        const colors = METRIC_COLOR_MAP[metric.key] || ['#8884d8'];
        const colorSet = stations.map((_, i) => colors[i % colors.length]);

        if (!availableKeys.length) return null;

        return (
          <ChartCard
            key={metric.key}
            title={metric.title}
            data={chartData}
            dataKeys={availableKeys}
            colors={colorSet}
          />
        );
      })}
    </>
  );
}
