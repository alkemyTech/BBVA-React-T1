import axios from 'axios';

const baseUrl = 'https://ongapi.alkemy.org/api/'

const config = {
    headers: {
        Group: 01,                //Aqui va el ID del equipo!!
        Authorization: `token ${access_token}`
    }
}

const Get = () => {
    axios.get('https://jsonplaceholder.typicode.com/users', config)
    .then(res => console.log(res))
    .catch(err => console.log(err))
}

/*
const Get = (endpoint, id = "") => {
    axios.get(`${baseUrl}${endpoint}/${id}`, config)
    .then(res => console.log(res))
    .catch(err => console.log(err))
}
*/

export default Get