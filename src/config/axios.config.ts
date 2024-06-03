import axios from "axios"


export const axiosEnergy= axios.create({
    baseURL: `${import.meta.env.VITE_APP_URL}/api/`,
  
  });