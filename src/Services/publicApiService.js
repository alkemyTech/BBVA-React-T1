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


export default Get