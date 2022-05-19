import React, { useEffect, useState } from 'react';
import './Nosotros.css'
import { Get } from './../../Services/privateApiService';
import Spinner from '../Spinner/Spinner'
import { Snackbar , Alert } from '@mui/material';
import { MembersList } from "../Members/MembersList";
import { GetAppContext } from '../../index';
/**
 * En esta seccion dispondremos el componente Nosotros, que se encontrara
 * bajo la ruta /Nosotros, el cual podremos ver informacion acerca de la ONG
 * Dicha informacion se renderizará de forma dinamica desde una API
 * @returns jsx para mostrar en pantalla
 */

const Nosotros = () => {

   const [ aboutData , setAboutData ] = useState({
        text:"",
        imgSrc:"",
        loaded:false
       })



    const {appData, setAppData} = GetAppContext();

    const setSpinner = ( open ) =>{
        setAppData(prevState => ({
                ...prevState,
                spinner:{
                    open:open
                }
            })
        )
    }

    const setSnackBar = ( message , severity) => {
        setAppData(prevState => ({
                ...prevState,
                snackbar:{
                        ...prevState.snackbar,
                        message: message,
                        severity: severity,
                        open: true,
                    }
                })
                )
    }


    const snackError = (message) => setSnackBar(message,"error")
    const snackSuccess = (message) => setSnackBar(message,"success")

    const getOrganizationData  = () => {
        setSpinner(true)
        Get(process.env.REACT_APP_URL_BASE_ENDPOINT+process.env.REACT_APP_URL_ORGANIZATION_PATH).then( res => {
            if(res.data.success){
                const data= res.data.data;
                setAboutData({...aboutData, loaded: true, text: data.long_description,imgSrc:data.logo})
            } 
            else
                snackError("Error en la carga de datos, por favor reintente mas tarde.")
                setSpinner(false)
            }
            ).catch( err => {
                snackError("Error en la carga de datos, por favor reintente mas tarde.")
                setSpinner(false)
            })
               
    }

    useEffect( () => { 
       getOrganizationData ();
    }, []);


    return (
        <>
        
        <div className='containerGeneral'>
            <div className='containerData'>
                <h2 className="centerText" style={{marginTop:30}}>Nosotros</h2>
                    <div className='flexContainer'>
                        <div className='textoContainer'>
                            {
                                aboutData.loaded &&
                                (
                                <div dangerouslySetInnerHTML= {{__html: 
                                    (aboutData.text)}} />
                                )
                            }
                        </div>
                        <div className='imageContainer' style={{backgroundImage: `url(${aboutData.imgSrc})`}}>
                        </div>
                    </div>
                    <MembersList />
                </div>
            </div> 
        </>
    )
}


export default Nosotros;
