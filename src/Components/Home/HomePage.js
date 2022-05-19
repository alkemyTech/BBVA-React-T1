import React from "react";
import { useState, useEffect } from "react"
import { Get } from "../../Services/publicApiService"
import Container from '@mui/material/Container';
import List from './Listado';
import NewsList from './ListadoNovedades'
import './HomePage.css'
import { GetAppContext } from '../../index';

function HomePage() {

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

    const [description, setDescription] = useState({
        title:'',
        shortDescription:''
    });

    const getOrganizationData = async () => {
        setSpinner(true)
        try{
        const res = await Get(process.env.REACT_APP_URL_BASE_ENDPOINT + process.env.REACT_APP_URL_ORGANIZATION_PATH);
        setDescription({...description, title: res.data.data.welcome_text, short_description: res.data.data.short_description});
        }catch(e){
            setSnackBar("Error en la carga de datos, reintente nuevamente mas tarde.","error")
        }
        setSpinner(false)
    }
    


    useEffect( () => {
        getOrganizationData();
    }, [])

    return (
        <>
            <section className="first-section">
                <div className="container home-desc-container">
                    <div >
                        <h1>{description.title}</h1>
                        <div dangerouslySetInnerHTML={{__html: description.short_description}}></div>
                    </div>
                    <img src="/images/login.png" alt="login imagen" className="img-form"></img>
                </div>
            </section>
            <section className="second-section">
                    <Container className="general-container ">
                        <List 
                            type={'staff'}
                            title={"Nuestro Staff"}
                            endpoint={process.env.REACT_APP_URL_MEMBER_PATH}
                            redirect = {'/nosotros'}
                        />
                        <br/>
                        <List 
                            type={'testimonials'}
                            title={"Testimonios"}
                            endpoint={process.env.REACT_APP_TESTIMONIALS_PATH}
                            redirect = {'/testimonials'}
                        />
                        <br/>
                        <NewsList 
                            type={'news'}
                            title={'Últimas novedades'}
                            endpoint={process.env.REACT_APP_URL_NEWS_PATH}
                        />
                        <br/>
                    </Container>
            </section>
        </>
    )
}


export default HomePage;