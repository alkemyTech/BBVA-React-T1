import axios from 'axios';

const API_BASE_URL = 'https://ongapi.alkemy.org/api'

const config = {
    headers: {
        Group: 1               
    }
}

const Get = () => {
    axios.get('https://jsonplaceholder.typicode.com/users', config)
    .then(res => console.log(res))
    .catch(err => console.log(err))
}

/** Método DELETE a los endpoints privados
 *    REQUISITOS:
 *     -route := ruta destino
 *     -id := identificador de usuario
 *    EJECUCIÓN: 
 *     Llama a axios.delete() con la ruta destino e útiliza el id para autentificar con el servidor,
 *      y se tratan los casos then() y catch()
 */

export const Delete = (rout, id) => {
    axios.delete(`${API_BASE_URL}/${rout}/${id}`, config)
    .then(res => console.log(res))
    .catch(err => console.err(err));
    //Debo devolver response...
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
export const Put = (id, route, body) => {
    return axios.put(`${API_BASE_URL}${route}/${id}`,body,config)
}

export default Get