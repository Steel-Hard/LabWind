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
  Label,
} from 'recharts';
import { ISensorData } from '../../types';

export type ChartCardProps = {
  data: ISensorData[];
  dataKeys: string[];
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
    margin={{ top: 20, right: 30, left: 20, bottom: 30 }} // espaço para o label X
  >
    <CartesianGrid strokeDasharray="3 3" />
    
    <XAxis dataKey="time">
      <Label
        value="Tempo"
        offset={-10}
        position="insideBottom"
        style={{ textAnchor: 'middle' }}
      />
    </XAxis>


    <YAxis domain={[0, 20]}/>
    <YAxis domain={[0, 'auto']}>
      <Label
        value="Valor"
        angle={-90}
        position="insideLeft"
        style={{ textAnchor: 'middle' }}
      />
    </YAxis>

    <Tooltip />

    <Legend
      verticalAlign="top"
      align="center"
      wrapperStyle={{ paddingBottom: '20px' }}
    />

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
