import axios from "axios";

const API_BASE_URL = 'https://ongapi.alkemy.org/api/';

const config = {
  headers: {
    Group: 1,
  },
};

const Get = (route, id = null) => {
  axios
    .get(`https://ongapi.alkemy.org/api/${route}/${id}`, config)
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
        const res = await axios.post(`${API_BASE_URL}${route}`, bodyObj, config.headers);
        return res;
    } catch (err) { return err; }
}

export { Get };