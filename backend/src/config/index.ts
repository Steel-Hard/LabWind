import fs from 'fs';
import axios from 'axios'; 
import { ISensorData } from '../types/interfaces/ISensorData';


let sensorDataArray: Array<ISensorData> = [];

const data = fs.readFileSync('./src/Meteo.csv', { encoding: 'utf8' })
               .split(/\r?\n/);

console.log('Dados lidos:', data);
console.log(`Total de linhas: ${data.length}`);

function processLine(linha: string): ISensorData | null {
  if (!linha.trim()) return null;

  const l = linha.split(';');

  try {
    const ano = parseInt(l[0].substring(6, 10));
    const mes = parseInt(l[0].substring(3, 5)) - 1;
    const dia = parseInt(l[0].substring(0, 2));
    const dateObj = new Date(ano, mes, dia);

    const sensorDataObj: ISensorData = {
      date: dateObj,
      time: l[1],
      temp_C: parseFloat(l[2].replace(',', '.')),
      hum: parseFloat(l[3].replace(',', '.')),
      press_Bar: parseFloat(l[4].replace(',', '.')),
      tempCabine_C: parseFloat(l[5].replace(',', '.')),
      charge: parseFloat(l[6].replace(',', '.')),
      SR_Wm2: parseFloat(l[7].replace(',', '.')),
      WindPeak_ms: parseFloat(l[8].replace(',', '.')),
      WindSpeed_Inst: parseFloat(l[9].replace(',', '.')),
      WindSpeed_Avg: parseFloat(l[10].replace(',', '.')),
      WindDir_Inst: parseFloat(l[11].replace(',', '.')),
      WindDir_Avg: parseFloat(l[12].replace(',', '.'))
    };
    return sensorDataObj;
  } catch (error) {
    console.error('Erro ao processar linha:', linha, error);
    return null;
  }
}

async function sendData(sensorData: ISensorData) {
  try {
    await axios.post('http://localhost:3000/sensor-data', sensorData);
    console.log('Dados enviados com sucesso:', sensorData);
  } catch (error) {
    console.error('Erro ao enviar dado:', error, sensorData);
  }
}

async function main() {
  const batchSize = 100;
  let batch: Array<ISensorData> = [];

  for (let i = 1; i < data.length; i++) {
    const linha = data[i];

    const parsedData = processLine(linha);
    if (parsedData) {
      sensorDataArray.push(parsedData);
      batch.push(parsedData);
    }

    if (batch.length >= batchSize || i === data.length - 1) {
      const promises = batch.map((item) => sendData(item));
      try {
        await Promise.all(promises);
        console.log(`Enviados ${batch.length} registros até a linha ${i}`);
      } catch (err) {
        console.error(`Erro ao enviar lote na linha ${i}:`, err);
      }
      batch = [];
    }
  }

  console.log('Todos os dados foram processados.');
}

main().catch((err) => {
  console.error('Erro ao executar o processamento:', err);
});
