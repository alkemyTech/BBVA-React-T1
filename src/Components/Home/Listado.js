import React from 'react';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import 'swiper/swiper.min.css';
import Card from '../Card/Card';
import { Get } from '../../Services/publicApiService';
import { Link } from "react-router-dom";
import './Listado.css'

const List = ({type, title, endpoint, redirect}) =>{

    const [info, setInfo] = useState([])

    const getOrganizationData = async (url) =>{
        const res = await Get(process.env.REACT_APP_URL_BASE_ENDPOINT + url)
        setInfo(res.data.data);
    }

    useEffect( () => {
        getOrganizationData(endpoint)
    }, [])

    return (
        <div>
            <div className='title-section'>
                <h1 className='title'>{title}</h1>
                <Link to={redirect} className='link'>Ver más</Link>
            </div>
            <Swiper slidesPerView={5} spaceBetween={20}className="swiper">
                        { info.length === 0 ? (<p>Cargando</p>) : (
                            <>
                                {info.map ((info) => {
                                    return (
                                        <SwiperSlide key = {info.id}>
                                            <Card type={type} title={info.name} img ={info.image} description = {info.description}/>
                                        </SwiperSlide>
                                    )
                                })}
                            </>
                        )
                    }
            </Swiper>
        </div>
    )
}

export default List;