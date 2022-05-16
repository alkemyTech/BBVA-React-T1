import React from 'react';
import '../CardListStyles.css';

const NewsList = () => {
    const newsMock = [
        {id: 2, name: 'Titulo de prueba', description: 'Descripcion de prueba'},
        {id: 1, name: 'Titulo de prueba', description: 'Descripcion de prueba'},
        {id: 3, name: 'Titulo de prueba', description: 'Descripcion de prueba'}
    ];

    return (
        <div>
            <h1>Listado de Novedades</h1>
            <ul className="list-container">
                {newsMock.length > 0 ? 
                    newsMock.map((element) => {
                        return(
                            <li className="card-info" key={element.id}>
                                <h3>{element.name}</h3>
                                <p>{element.description}</p>
                            </li>
                        )
                    })
                :
                    <p>No hay novedades</p>
                }
            </ul>
        </div>
    );
}
 
export default NewsList;