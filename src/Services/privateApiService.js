import axios from 'axios';

const API_BASE_URL = 'https://ongapi.alkemy.org/api/'
const access_token = ""

const config = {
    headers: {
        Group: 1,                //Aqui va el ID del equipo!!
        Authorization: `token ${access_token}`
    }
}

 export const Get = (endpoint, id = "") => {
    axios.get(`${API_BASE_URL}${endpoint}/${id}`, config)
    .then(res => res.data)
    .catch(err => err)
}

