import React, { useState } from 'react';
import './Nosotros.css'
import '../../App.css'


/**
 * En esta seccion dispondremos el componente Nosotros, que se encontrara
 * bajo la ruta /Nosotros, el cual podremos ver informacion acerca de la ONG
 * Dicha informacion se renderizará de forma dinamica desde una API
 * @returns jsx para mostrar en pantalla
 */

const Nosotros = () => {

   const [ sobreNosotros , setSobreNosotros ] = useState({
       text : "Cargar datos de la API"
    })

    return (
        <>
            <h2 class="centerText">Sobre Nosotros</h2>
            {sobreNosotros.text}
        </>
    )
}


export default Nosotros