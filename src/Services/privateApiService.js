import axios from "axios";

//Este token es solo de pruebas
const access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvb25nYXBpLmFsa2VteS5vcmdcL2FwaVwvcmVnaXN0ZXIiLCJpYXQiOjE2NTIzODIzNjIsImV4cCI6MTY1MjM4NTk2MiwibmJmIjoxNjUyMzgyMzYyLCJqdGkiOiJpMjdIQ0NVeEhGcUFQdzhsIiwic3ViIjoyNzA1LCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.lWzeS4VgGBh5F1HNtToGrRScm63_crdNxpd_6Y6Syk4";


const config = {

  headers: {
    Group: 1, //Aqui va el ID del equipo!!
    Authorization: `${access_token}`,
  },
};

export const Get = (endpoint, id = null) => {
  const param = id ? `/${id}` : "";
  console.log("process: ", process)
  console.log("process.env: ", process.env)
  console.log("process.env.end: ",process.env.REACT_APP_URL_BASE_ENDPOINT )
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
  return axios
    .post(`${process.env.REACT_APP_URL_BASE_ENDPOINT+endpoint}`, body, config)

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


