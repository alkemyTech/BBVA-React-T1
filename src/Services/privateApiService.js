import axios from 'axios';

const config = {
    headers: {
        Group: 1               
    }
}

const Get = () => {
    axios.get(`${process.env.REACT_APP_URL_BASE_ENDPOINT}/users`, config)
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
export const Put = (id, route, body) => {
    return axios.put(`${process.env.REACT_APP_URL_BASE_ENDPOINT}${process.env.REACT_APP_URL_MEMBER_PATH}/${id}`,body,config)
}

export default Get