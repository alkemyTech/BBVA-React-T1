import axios from "axios";



const config = {
  headers: {
    Group: 1,
  },
};

const Get = (route) => {
  return axios
    .get(route, config)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

/** Función estandard POST.
    REQUISITOS:
        - route :=  ruta destino.
        - bodyObj := objeto para enviar en el body. 
    RETORNO:
        - Devuelve res en caso de petición correcta.
        - Devuelve el error en caso de petición incorrecta.
*/
export const Post = async (route, bodyObj) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_URL_BASE_ENDPOINT+route}`, bodyObj, config.headers);
        return res;
    } catch (err) { return err; }
}

export { Get };
