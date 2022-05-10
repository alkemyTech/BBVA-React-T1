import React, { useState } from 'react';
import '../../App.css'
import './Nosotros.css'

/**
 * En esta seccion dispondremos el componente Nosotros, que se encontrara
 * bajo la ruta /Nosotros, el cual podremos ver informacion acerca de la ONG
 * Dicha informacion se renderizará de forma dinamica desde una API
 * @returns jsx para mostrar en pantalla
 */

const Nosotros = () => {

   const [ sobreNosotros , setSobreNosotros ] = useState({
       text : "Sobre Nosotros"
    })

    return (
        <>
            <h2 class="centerText">Nosotros</h2>
            {/* El texto sobre nosotros debe obtenerse de una API */}
            <p>{sobreNosotros.text}</p>
        </>
    )
}


export default Nosotros