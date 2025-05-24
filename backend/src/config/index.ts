import fs from 'fs';
import axios from 'axios'; 
import { ISensorData } from '../types/interfaces/ISensorData';
import { error } from 'console';


let sensorDataArray: Array<ISensorData> = [];

const path  = process.argv.slice(2);
let filePath = path[0];

const data = fs.readFileSync(filePath, { encoding: 'utf8' })
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

    const [horaStr, minutoStr] = l[1].split(':');
    const hora = parseInt(horaStr);
    const minuto = parseInt(minutoStr);

    dateObj.setHours(hora, minuto, 0, 0);


    //const dateObj = new Date(Date.UTC(ano, mes, dia, hora, minuto, 0));
    const sensorDataObj: ISensorData = {
      reading_time: dateObj, 
      time: l[1],
      temp: parseFloat(l[2].replace(',', '.')),
      hum: parseFloat(l[3].replace(',', '.')),
      bar: parseFloat(l[4].replace(',', '.')),
      cab_temp: parseFloat(l[5].replace(',', '.')),
      bat_volts: parseFloat(l[6].replace(',', '.')),
      uv_level: parseFloat(l[7].replace(',', '.')),  
      wind_peak: parseFloat(l[8].replace(',', '.')),
      wind_rt: parseFloat(l[9].replace(',', '.')),
      wind_avg: parseFloat(l[10].replace(',', '.')),
      wind_dir_rt: parseFloat(l[11].replace(',', '.')),
      wind_dir_avg: parseFloat(l[12].replace(',', '.')),
      estacao: l[13]
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
