import { Station, useLabwind } from "../../contexts/labwindContext";



function Options() {
  const { setStation, setDate,  date } = useLabwind();

  return (
    <div className="w-full flex flex-col md:flex-row md:justify-center gap-3 md:items-center mt-26  space-y-4 md:space-y-0">

   
        <div className="flex flex-col p-4 items-center md:items-center space-y-2 md:space-y-0 w-full md:w-auto">
          <label htmlFor="estacao" className="text-lg font-semibold mb-1 text-white">
            Estação (Única)
          </label>
          <select
            id="estacao"
            className="w-full p-2 rounded bg-white text-black shadow-sm cursor-pointer"
            defaultValue=""
            onChange={e => setStation(e.target.value as Station)} 
          >
            <option value="" disabled>Selecione uma estação</option>
            <option value="O">Origem</option>
            <option value="A">Simulada 1</option>
            <option value="B">Simulada 2</option>
          </select>
        </div>
      

        <div className="flex flex-col p-4 items-center md:items-center space-y-2 md:space-y-0 w-full md:w-auto">
          <label htmlFor="e-date" className="text-lg font-semibold mb-1 text-white">
            Data
          </label>
          <input
            type="date"
            id="e-date"
            value={date}
            className="bg-white text-black border border-gray-300 rounded px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200"
            onChange={e => setDate(e.target.value)}
          />
        </div>
   
    </div>
  );
}

export default Options;
