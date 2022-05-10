import axios from 'axios';

const baseUrl = 'https://ongapi.alkemy.org/api/'
const access_token = ""

const config = {
    headers: {
        Group: 01,                //Aqui va el ID del equipo!!
        Authorization: `token ${access_token}`
    }
}

const Get = (endpoint, id = "") => {
    axios.get(`${baseUrl}${endpoint}/${id}` ,config)
    .then(res => res.data)
    .catch(err => err)
}


export default Get