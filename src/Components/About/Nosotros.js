import React, { useEffect, useState } from 'react';
import './Nosotros.css'
import { Get } from './../../Services/privateApiService';
import Spinner from '../Spinner/Spinner'
import { Snackbar , Alert } from '@mui/material';
import { MembersList } from "../Members/MembersList";
import { GetAppContext } from '../../index';
import {LinkedinFollowCompany, TwitterButton,TwitterTweet} from 'react-social-plugins';

/**
 * En esta seccion dispondremos el componente Nosotros, que se encontrara
 * bajo la ruta /Us, el cual podremos ver informacion acerca de la ONG
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
      <div className="containerGeneral">
        <Spinner visible={!sobreNosotros.loaded} className="spinner" />
        <div className="containerData">
          <h1 className="centerText h1-heading"  style={{ marginTop: 30 }}>
            Nosotros
          </h1>
          <div className="flexContainer">
            <div className="textoContainer">
              {sobreNosotros.loaded && (
                <div dangerouslySetInnerHTML={{ __html: sobreNosotros.text }} />
              )}
            </div>
            <div
              className="imageContainer"
              style={{ backgroundImage: `url(${sobreNosotros.imgSrc})` }}
            ></div>
          </div>
              <MembersList />
          <div className="container-twitter">
          <h2 className="centerText twitter-tittle" style={{ marginTop: 30 }}>
            Últimos Tweets
          </h2>
            <TwitterTweet
            className= "twitter-item"
                align='left'
                coversation='none'
                tweetId='1527122168684978176' 
                theme='light'
                width={350}
            />
            <TwitterTweet
            className= "twitter-item"
                align='left'
                coversation='none'
                tweetId='1527122059213647872'
                theme='light'
                width={350}
            />
            <TwitterTweet
            className= "twitter-item"
                align='left'
                coversation='none'
                tweetId='1527121093617647617'
                theme='light'
                width={350}
            />
          </div>
          <div className="novedades-redes">
            <h4 className="centerText h4-twitter" style={{ marginTop: 30 }}>
                ¿Tenés algo para contarnos?
            </h4>
            <TwitterButton
              hashtags="ONG, voluntariado"
              target="OngSomosMas1"
              text="Suamate a Somos mas"
              type="Hashtag"
              size="large"
              via="OngSomosMas1"
            />
            <LinkedinFollowCompany
            companyId={215424234}
            counter="top" // Or "right"
            lang="es_AR"
            />
    
          </div>

        </div>
      </div>
    </>
  );
};

export default Nosotros;
