import axios from 'axios';

const config = {
    headers: {
        Group: 01                //Aqui va el ID del equipo!!
    }
}

const API_BASE_URL = 'https://ongapi.alkemy.org/api/docs#/';

const Get = () => {
    axios.get('https://jsonplaceholder.typicode.com/users', config)
    .then(res => console.log(res))
    .catch(err => console.log(err))
}

/* 
 *  peticiones DELETE a los endpoints privados
 *    REQUISITOS:
 *     -route := ruta destino
 *     -id := identificador de usuario
 *    EJECUCIÓN: 
 *     Llama a axios.delete() con la ruta destino e útiliza el id para autentificar con el servidor,
 *      y se tratan los casos then() y catch()
 */

export const Delete = (rout, id) => {
    axios.delete(`${API_BASE_URL}/${rout}/${id}`, config)
    .then(res => console.log(res))
    .catch(err => console.err(err));
    //Debo devolver response...
}

export default Get