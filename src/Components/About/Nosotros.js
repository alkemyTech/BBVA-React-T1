import React, { useEffect, useState } from 'react';
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

    const getOrganizationData  = () => {
        Get(process.env.REACT_APP_URL_BASE_ENDPOINT+process.env.REACT_APP_URL_ORGANIZATION_PATH).then( res => {
            const data=res.data.data;
            setSobreNosotros({...sobreNosotros, loaded: true, text: data.long_description,imgSrc:data.logo})
        })
    }

    useEffect( () => { 
        getOrganizationData ();
    }, []);


    return (
        <>
        
        <div className='containerGeneral'>
        <Spinner visible={!sobreNosotros.loaded} className="spinner"  /> 
            <div className='containerData'>
                <h2 className="centerText" style={{marginTop:30}}>Nosotros</h2>
                    <div className='flexContainer'>
                        <div className='textoContainer'>
                            {
                                sobreNosotros.loaded &&
                                (
                                <div dangerouslySetInnerHTML= {{__html: 
                                    (sobreNosotros.text)}} />
                                )
                            }
                        </div>
                        <div className='imageContainer' style={{backgroundImage: `url(${sobreNosotros.imgSrc})`}}>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Nosotros