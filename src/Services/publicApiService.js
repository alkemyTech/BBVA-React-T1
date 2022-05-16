import axios from "axios";



const config = {
  headers: {
    Group: 1,
  },
};

const Get = async (route, id = null) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_URL_BASE_ENDPOINT+ route + '/' + id}`);
    return res;
  } catch (err) { return err; }

  // axios
  //   .get(`${process.env.REACT_APP_URL_BASE_ENDPOINT+route+'/'+id}`, config)
  //   .then((res) => res)
  //   .catch((err) => {
  //     return err;
  //   });
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