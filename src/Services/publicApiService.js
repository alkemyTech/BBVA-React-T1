import axios from "axios";



const config = {
  headers: {
    Group: 1,
  },
};

const Get = (route, id = null) => {
  axios
    .get(`${process.env.REACT_APP_URL_BASE_ENDPOINT+route+'/'+id}`, config)
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
<<<<<<< HEAD
        const res = await axios.post(`${API_BASE_URL}${route}`, bodyObj, config);
=======
        const res = await axios.post(`${process.env.REACT_APP_URL_BASE_ENDPOINT+route}`, bodyObj, config.headers);
>>>>>>> main
        return res;
    } catch (err) { return err; }
}

export { Get };