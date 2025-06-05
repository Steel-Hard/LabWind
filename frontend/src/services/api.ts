import axios from "axios";


const URL = import.meta.env.VITE_API_URL  || "http://localhost:3000";

export const api = axios.create({
    baseURL: URL,
    headers: {
        'content-type': 'application/json'
    }
})

export const openWeatheraApi = axios.create({
    baseURL: "https://api.openweathermap.org/data/2.5",
  
     headers: {
        'content-type': 'application/json'
    }

})