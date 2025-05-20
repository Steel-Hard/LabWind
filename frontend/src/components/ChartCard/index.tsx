/* eslint-disable @typescript-eslint/no-explicit-any */
// components/ChartCard.tsx
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';
import { ISensorData } from '../../types';

export type ChartCardProps = {
  data: ISensorData[];
  /** nomes dos campos a serem plotados, ex: ['WindSpeed_Avg_estacaoA','WindSpeed_Avg_estacaoB'] */
  dataKeys: string[];
  /** cores correspondentes a cada dataKey */
  colors: string[];
  title?: string;
};

export const ChartCard = ({
  data,
  dataKeys,
  colors,
  title,
}: ChartCardProps) => {

  
  return (
  <div className="mb-6 bg-white" style={{ minWidth: '800px' }}>
    {title && <h3 className="text-lg text-black font-semibold mb-2">{title}</h3>}
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        {dataKeys.map((key, i) => (
          <Line
            key={key}
            type="monotone"
            dataKey={key}
            stroke={colors[i]}
            dot={false}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  </div>
);}
