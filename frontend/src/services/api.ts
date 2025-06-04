import axios from "axios";



export const api = axios.create({
    baseURL: 'http://localhost:3000',
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