import React from 'react';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import 'swiper/swiper.min.css';
import Card from '../Card/Card';
import { Get } from '../../Services/publicApiService';

const Listado = ({type, title, endpoint}) =>{

    const [info, setInfo] = useState([])

    // agregar variables al usestate y probar iterando y asignando valores

    const getOrganizationData = async (url) =>{
        const res = await Get(process.env.REACT_APP_URL_BASE_ENDPOINT + url)
        setInfo(res.data.data);
        console.log(res.data.data)
    }

    useEffect( () => {
        getOrganizationData(endpoint)
    }, [])

    return (
        <div>
            <h1>{title}</h1>
            <Swiper slidesPerView={5} spaceBetween={20}className="swiper">
                        { info.length === 0 ? (<p>hola</p>) : (
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

export default Listado;