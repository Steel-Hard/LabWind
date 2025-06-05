/* eslint-disable @typescript-eslint/no-unused-vars */
import { useSensor } from '../../contexts/graphContext';
import Select, { MultiValue, ActionMeta } from 'react-select';
import { OptionType, CheckboxOption } from '../Options/CheckboxOption';

const optionsEstacoes: OptionType[] = [
  { value: 'origem', label: 'Origem' },
  { value: 'simulada_1', label: 'Simulada 1' },
  { value: 'simulada_2', label: 'Simulada 2' },
];

export function GraphSelect() {
  const { setStations, setDate } = useSensor();

  const handleStations = (
    newValue: MultiValue<OptionType>,
    _actionMeta: ActionMeta<OptionType>
  ) => {
    setStations(newValue.map(o => o.value));
  };

  return (
    <div className="flex flex-wrap gap-4 mt-26 items-center justify-center ">
      <div className="p-4 w-full md:w-auto">
        <label className="block text-lg font-semibold text-white mb-1">Estações (Múltiplas)</label>
        <Select
          options={optionsEstacoes}
          isMulti
          onChange={handleStations}
          closeMenuOnSelect={false}
          components={{ Option: CheckboxOption }}
          placeholder="Selecione as estações"
          className="text-black"
        />
      </div>
      <div className="p-4 w-full md:w-auto">
        <label className="block text-lg font-semibold text-white mb-1">Data</label>
        <input
          type="date"
          onChange={e => setDate(e.target.value)}
          className="bg-white text-black border rounded px-4 py-2 shadow-sm"
        />
      </div>
    </div>
  );
}