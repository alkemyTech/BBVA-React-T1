import axios from 'axios';

const access_token = ""


const config = {
    headers: {
        Group: 1,                //Aqui va el ID del equipo!!
        Authorization: `token ${access_token}`
    }
}


 export const Get = (endpoint, id = "") => {
    axios.get(`${process.env.REACT_APP_URL_BASE_ENDPOINT}${endpoint}/${id}`, config)
    .then(res => res.data)
    .catch(err => err)
}

/** Método DELETE a los endpoints privados
 *    REQUISITOS:
 *     - route := ruta destino
 *     - id := identificador de usuario
 *    DEVUELVE: 
 *     - Res de la promesa en caso de que se haya ejecutado correctamente.
 *     - Err producido por la petición incorrecta.
 *    
 */
export const Delete = async (route, id) => {
    try {
        const res = await axios.delete(`${process.env.REACT_APP_URL_BASE_ENDPOINT}${route}/${id}`, config.headers);
        return res;
    } catch (err) { return err; }

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

