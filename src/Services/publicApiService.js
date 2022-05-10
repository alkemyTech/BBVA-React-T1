import axios from 'axios';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com/users';

const config = {
    headers: {
        Group: 1                
    }
}

const Get = () => {
    axios.get('https://jsonplaceholder.typicode.com/users', config)
    .then(res => console.log(res))
    .catch(err => console.log(err))
}


/* Función estandard POST.
    REQUISITOS:
        - route :=  ruta destino.
        - bodyObj := objeto para enviar en el body. 
    EJECUCIÓN:
        - Realiza una promesa axios.post y se manejan los casos .then() y .catch()
*/
export const Post = (route, bodyObj) => {
    axios.post(`${API_BASE_URL}/${route}}`, bodyObj, config)
    .then(res => console.log(res))
    .catch(err => console.err(err));
}

export default Get