import axios from 'axios';

const API_BASE_URL = 'https://ongapi.alkemy.org/api/';

const config = {
    headers: {
        Group: 1                //Aqui va el ID del equipo!!
    }
}

const Get = () => {
    axios.get('https://jsonplaceholder.typicode.com/users', config)
    .then(res => console.log(res))
    .catch(err => console.log(err))
}


/** Función estandard POST.
    REQUISITOS:
        - route :=  ruta destino.
        - bodyObj := objeto para enviar en el body. 
    RETORNO:
        - Devuelve una promesa axios.post
    POST-REQUISITOS:
        -Manejar los posibles casos de la promesa devuelta.
*/
export const Post = (route, bodyObj) => {
    return(axios.post(`${API_BASE_URL}${route}`, bodyObj, config.headers));
}

export default Get