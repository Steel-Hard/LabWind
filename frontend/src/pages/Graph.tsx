import { SensorProvider } from '../contexts/sensorContext';
import { Teste,ChartList, Header, Nav  } from '../components';


export default function SensorDashboard() {
  return (
    <SensorProvider>
      <Header>
        <Nav/>
      </Header>
      <Teste />
      <div className="p-6 overflow-x-auto w-full">
        <ChartList />
      </div>
    </SensorProvider>
  );
}
