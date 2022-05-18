import React from "react";
import { useState, useEffect } from "react"
import { Get } from "../../Services/publicApiService"
import Container from '@mui/material/Container';
import Listado from './Listado';
import ListadoNovedades from './ListadoNovedades'
import './HomePage.css'

function HomePage() {

    const [description, setDescription] = useState({
        title:'',
        shortDescription:''
    });
    
    const getOrganizationData = async () => {
        const res = await Get(process.env.REACT_APP_URL_BASE_ENDPOINT + process.env.REACT_APP_URL_ORGANIZATION_PATH);
        setDescription({...description, title: res.data.data.welcome_text, short_description: res.data.data.short_description});
    }
    


    useEffect( () => {
        getOrganizationData();
    }, [])

    return (
        <>
            <section className="first-section">
                <div className="container">
                    <div>
                        <h1>{description.title}</h1>
                        <p>{description.short_description}</p>
                    </div>
                    <img src="/images/login.png" alt="login imagen" className="img-form"></img>
                </div>
            </section>
            <section className="second-section">
                    <Container className="general-container">
                        <Listado 
                            type={'staff'}
                            title={"Nuestro Staff"}
                            endpoint={process.env.REACT_APP_URL_MEMBER_PATH}
                            redirect = {'/nosotros'}
                        />
                        <Listado 
                            type={'testimonials'}
                            title={"Testimonios"}
                            endpoint={process.env.REACT_APP_TESTIMONIALS_PATH}
                            redirect = {'/testimonials'}
                        />
                        <ListadoNovedades 
                            type={'news'}
                            title={'Últimas novedades'}
                            endpoint={process.env.REACT_APP_URL_NEWS_PATH}
                        />
                    </Container>
            </section>
        </>
    )
}


export default HomePage;