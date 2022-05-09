import axios from 'axios';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com/'

const config = {
    headers: {
        Group: 1                //Aqui va el ID del equipo!!
    }
}

const Get = () => {
    axios.get('https://jsonplaceholder.typicode.com/users', config)
    .then(res => console.log(res))
    .catch(err => console.log(err))
}


/**
 * Actualiza los datos de la ruta destino
 * @function
 * @param id Id del recurso a actualizar
 * @param route Ruta del recurso, se ingresa sin las barras, ej: route = "slides"
 * @param body Se pasa el objeto del recurso a actualizar
 * 
 * @returns Promesa de axios, se debe capturar los metodos then y catch en caso de error
 */
const Put = (id, route, body) => {
    return axios.put(`${API_BASE_URL}${route}/${id}`,body,config)
}

export default Get
export { Put }