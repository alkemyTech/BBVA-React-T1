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
        const res = await axios.delete(`${API_BASE_URL}${route}/${id}`, config.headers);
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
 * @returns Body de respuesta capturada por try/catch
 */
export const Put = async (id, route, body) => {
    try{
    return await axios.put(`${API_BASE_URL}${route}/${id}`,body,config)
    }catch(error){
        return error
    }
}

