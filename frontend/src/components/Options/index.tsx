import { useState } from "react";
import Select, {
    MultiValue,
    ActionMeta
  } from "react-select";
  
import { OptionType, CheckboxOption } from "./CheckboxOption";
interface IOptions {
  estacoes?: boolean;
  date?: boolean;
  estacoesSelector?: boolean;
}



const optionsEstacoes: OptionType[] = [
  { value: "estacao0", label: "Estação 0" },
  { value: "estacao1", label: "Estação 1" },
  { value: "estacao2", label: "Estação 2" },
];



function Options({ estacoes, date, estacoesSelector }: IOptions) {
  const [selectedOptions, setSelectedOptions] = useState<OptionType[]>([]);

  const handleChange = (
    newValue: MultiValue<OptionType>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _actionMeta: ActionMeta<OptionType>
  ) => {
    setSelectedOptions([...newValue]);
  };
  
  return (
    <div className="w-full flex flex-col md:flex-row md:justify-center gap-3 md:items-center mt-8 space-y-4 md:space-y-0">
      {estacoes && (
        <div className="flex flex-col  p-4 items-start md:items-center space-y-2 md:space-y-0 w-full md:w-auto">
          <label className="text-lg font-semibold mb-1 text-white">
            Estações (Múltiplas)
          </label>
          <Select
            options={optionsEstacoes}
            isMulti
            value={selectedOptions}
            onChange={handleChange}
            closeMenuOnSelect={false}
            components={{ Option: CheckboxOption }}
            placeholder="Selecione as estações"
            className="w-full text-black"
          />
        </div>
      )}

      {estacoesSelector && (
        <div className="flex flex-col  p-4 items-start md:items-center space-y-2 md:space-y-0 w-full md:w-auto">
          <label htmlFor="estacao" className="text-lg font-semibold mb-1 text-white">
            Estação (Única)
          </label>
          <select
            id="estacao"
            className="w-full p-2 rounded bg-white text-black shadow-sm cursor-pointer"
            defaultValue=""
          >
            <option value="" disabled>Selecione uma estação</option>
            <option value="Estação 0">Estação 0</option>
            <option value="Estação 1">Estação 1</option>
            <option value="Estação 2">Estação 2</option>
          </select>
        </div>
      )}

      {date && (
        <div className="flex flex-col  p-4 items-start md:items-center space-y-2 md:space-y-0 w-full md:w-auto">
          <label htmlFor="e-date" className="text-lg font-semibold mb-1 text-white">
            Data
          </label>
          <input
            type="date"
            id="e-date"
            className="bg-white text-black border border-gray-300 rounded px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200"
          />
        </div>
      )}
    </div>
  );
}

export default Options;
