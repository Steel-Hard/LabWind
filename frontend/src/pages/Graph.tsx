import {  ChartList, Header, Nav } from "../components";
import { GraphSelect } from "../components/GraphSelect";

export default function SensorDashboard() {
  return (
    <>
      <Header>
        <Nav />
      </Header>
      <GraphSelect/>
      <div className="p-6 overflow-x-auto w-full">
        <ChartList />
      </div>
    </>
  );
}
