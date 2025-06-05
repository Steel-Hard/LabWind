import axios from "axios";

const fetchData = async () => {
  const response = await axios.get("http://localhost:3000/labwind/all");

  if (response.status !== 200) {
    throw new Error(`Erro ao buscar dados: ${response.statusText}`);
  }

  console.log("Dados recebidos:", response.data);

  for (let i = 0; i < response.data.length; i++) {
    const dateObj = new Date(response.data[i]["reading_time"]);
    const [horaStr, minutoStr] = response.data[i]["reading_time"]
      .substring(11, 16)
      .split(":");
    const hora = parseInt(horaStr);
    const minuto = parseInt(minutoStr);

    dateObj.setHours(hora, minuto, 0, 0);
    delete response.data[i]["id"];
    response.data[i]["reading_time"] = dateObj;
    response.data[i]["time"] = `${horaStr}:${minutoStr}`;
    response.data[i]["temp"] = parseFloat(response.data[i]["temp"]);
    response.data[i]["hum"] = parseFloat(response.data[i]["hum"]);
    response.data[i]["bar"] = parseFloat(response.data[i]["bar"]);
    response.data[i]["cab_temp"] = parseFloat(response.data[i]["cab_temp"]);
    response.data[i]["bat_volts"] = parseFloat(response.data[i]["bat_volts"]);
    response.data[i]["uv_level"] = parseFloat(response.data[i]["uv_level"]);
    response.data[i]["wind_peak"] = parseFloat(response.data[i]["wind_peak"]);
    response.data[i]["wind_rt"] = parseFloat(response.data[i]["wind_rt"]);
    response.data[i]["wind_avg"] = parseFloat(response.data[i]["wind_avg"]);
    response.data[i]["wind_dir_rt"] = parseFloat(
    response.data[i]["wind_dir_rt"]
    );
    response.data[i]["wind_dir_avg"] = parseFloat(
      response.data[i]["wind_dir_avg"]
    );
    response.data[i]["estacao"] = "O";

    try {
      await axios.post("http://localhost:3000/sensor-data",response.data[i]);
      console.log(
        `Dado enviado com sucesso: ${JSON.stringify(response.data[i])}`
      );
    } catch (error) {
      console.error("Erro ao enviar dado:", error, response.data[i]);
    }
  }
};

fetchData();

