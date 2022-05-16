import axios from "axios";


const access_token = ""


const config = {

  headers: {
    Group: 1, //Aqui va el ID del equipo!!
    Authorization: `token ${access_token}`,
  },
};

export const Get = (endpoint, id = null) => {
  const param = id ? `/${id}` : "";
  return axios.get(`${process.env.REACT_APP_URL_BASE_ENDPOINT+endpoint+param}`, config);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const getHeaderAuthorization = () => {
  const token = getToken();

  if (token !== "") {
    return { Authorization: "Bearer " + token };
  }
};


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
    const res = await axios.delete(
      `${process.env.REACT_APP_URL_BASE_ENDPOINT+route+'/'+id}`,
      config.headers
    );
    return res;
  } catch (err) {
    return err;
  }
};


export const PrivatePost = (endpoint, body) => {
  axios
    .post(`${process.env.REACT_APP_URL_BASE_ENDPOINT+endpoint}`, body, config)
    .then((res) => res)
    .catch((err) => err);
};

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
    return await axios.put(`${process.env.REACT_APP_URL_BASE_ENDPOINT+route+'/'+id}`,body,config)
    }catch(error){
        return error
    }
}

