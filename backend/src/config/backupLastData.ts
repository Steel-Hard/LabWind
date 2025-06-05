import axios from "axios";

const estacao = "O"; 

const runBackup = async () => {
  try {
   
    const lastMongo = await axios.get(`http://localhost:3000/last/${estacao}`);
    if (!lastMongo.data || !lastMongo.data.reading_time) {
      console.log("Nenhum registro encontrado no MongoDB para a estação.");
      return;
    }
    const lastDate = new Date(lastMongo.data.reading_time);
    const datetime = lastDate.toISOString().slice(0, 19).replace('T', ' ');


    const mysqlResp = await axios.get(
      `http://localhost:3000/all_after_date_and_time?datetime=${encodeURIComponent(datetime)}`
    );
    const novosDados = mysqlResp.data;

    if (!novosDados || novosDados.length === 0) {
      console.log("Nenhum novo registro encontrado. Último registro:", lastMongo.data);
      return;
    }

    for (const dado of novosDados) {
  
      const dateObj = new Date(dado.reading_time);
      const [horaStr, minutoStr] = dado.reading_time.substring(11, 16).split(":");
      const hora = parseInt(horaStr);
      const minuto = parseInt(minutoStr);
      dateObj.setHours(hora, minuto, 0, 0);
      dado.reading_time = dateObj;
      dado.time = `${horaStr}:${minutoStr}`;
      dado.temp = parseFloat(dado.temp);
      dado.hum = parseFloat(dado.hum);
      dado.bar = parseFloat(dado.bar);
      dado.cab_temp = parseFloat(dado.cab_temp);
      dado.bat_volts = parseFloat(dado.bat_volts);
      dado.uv_level = parseFloat(dado.uv_level);
      dado.wind_peak = parseFloat(dado.wind_peak);
      dado.wind_rt = parseFloat(dado.wind_rt);
      dado.wind_avg = parseFloat(dado.wind_avg);
      dado.wind_dir_rt = parseFloat(dado.wind_dir_rt);
      dado.wind_dir_avg = parseFloat(dado.wind_dir_avg);
      dado.estacao = estacao;
      delete dado.id;
      try {
        await axios.post("http://localhost:3000/sensor-data", dado);
        console.log("Backup realizado com sucesso para:", dado);
      } catch (err) {
        console.error("Erro ao realizar backup para:", dado, err);
      }
    }
  } catch (err) {
    console.error("Erro geral na rotina de backup:", err);
  }
};

runBackup();
