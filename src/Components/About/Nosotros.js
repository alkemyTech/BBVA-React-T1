import React, { useEffect, useState } from 'react';
import '../../App.css'
import './Nosotros.css'
import { Get } from './../../Services/privateApiService';
import Spinner from '../Spinner/Spinner'

/**
 * En esta seccion dispondremos el componente Nosotros, que se encontrara
 * bajo la ruta /Nosotros, el cual podremos ver informacion acerca de la ONG
 * Dicha informacion se renderizará de forma dinamica desde una API
 * @returns jsx para mostrar en pantalla
 */

const Nosotros = () => {

   const [ sobreNosotros , setSobreNosotros ] = useState({
        text:"",
        imgSrc:"",
        loaded:false
       })

    useEffect( () => { 
        Get("organization").then( res => {
            const data=res.data.data;
            setSobreNosotros({...sobreNosotros, loaded: true, text: data.long_description,imgSrc:data.logo})
        })
    }, []);


    return (
        <>
        
        <div className='containerGeneral'>
        <Spinner visible={true} className="spinner"  /> 
            <h2 class="centerText">Nosotros</h2>
                <div className='flexContainer'>
                    <div>
                        {
                            sobreNosotros.loaded &&
                            (
                            <div dangerouslySetInnerHTML= {{__html: 
                                (sobreNosotros.text)}} />
                            )
                        }
                    </div>
                    <div className='imageContainer'>
                        <img src={sobreNosotros.imgSrc} alt="" className='divimg' />
                    </div>
                </div>
            </div>
        </>
    )
}


export default Nosotros