import React, { useEffect, useState } from 'react';
import './Nosotros.css'
import { Get } from './../../Services/privateApiService';
import Spinner from '../Spinner/Spinner'
import { Snackbar , Alert } from '@mui/material';
import { MembersList } from "../Members/MembersList";
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

    const [snack, setSnack] = useState({
        open: false,
        message: "",
        severity: "error",
    })

    const snackSend = (errorMessage,tipo) =>{
        setSnack({...snack, 
            message:errorMessage,
            open:true,
            severity:tipo
        })
    }
    const snackError = (message) => snackSend(message,"error")
    const snackSuccess = (message) => snackSend(message,"success")



    const getOrganizationData  = () => {
        Get(process.env.REACT_APP_URL_BASE_ENDPOINT+process.env.REACT_APP_URL_ORGANIZATION_PATH).then( res => {
            const dataRes=res.data;
            if(dataRes.success){
                const data= dataRes.data;
                setAboutData({...aboutData, loaded: true, text: data.long_description,imgSrc:data.logo})
            } 
            else
                snackError("Error en la carga de datos, por favor reintente mas tarde.")
            }).catch( err => snackError("Error en la carga de datos, por favor reintente mas tarde."))
    }

    useEffect( () => { 
        getOrganizationData ();
    }, []);



    const onCloseSnack = () =>{
        setSnack({...snack, open:false})
    }
    return (
        <>
        
        <div className='containerGeneral'>
        <Spinner visible={!aboutData.loaded} className="spinner"  /> 
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

            <Snackbar
                open={snack.open}
                severity={snack.severity}
                autoHideDuration={3000}
                onClose={onCloseSnack}>
                <Alert onClose={onCloseSnack} severity={snack.severity} sx={{ width: '100%' }}>
                    {snack.message}
                </Alert>
            </Snackbar>
        </>
    )
}


export default Nosotros;
