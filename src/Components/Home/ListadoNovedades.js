import React from 'react';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import 'swiper/swiper.min.css';
import Card from '../Card/Card';
import { Get } from '../../Services/publicApiService';
import { Link } from "react-router-dom";
import './Listado.css';

const NewsList = ({type, title, endpoint}) =>{

    const [info, setInfo] = useState([])

    const getOrganizationData = async (url) =>{
        const res = await Get(process.env.REACT_APP_URL_BASE_ENDPOINT + url)
        setInfo(res.data.data);
    }

    useEffect( () => {
        getOrganizationData(endpoint)
    }, [])

    return (
        <div className="news">
            <div className='title-section'>
                <h1 className='title' >Novedades</h1>
                <Link to='/news' className='link'>Ver más</Link>
            </div>
            <Swiper slidesPerView={2} spaceBetween={5}className="swiper">
                { info.length === 0 ? (<p>Cargando</p>) : (
                <>
                    {info.map((item) => item.image && 
                        (
                            
                                <SwiperSlide key={item.id}>
                                    <Card
                                    key={item.id}
                                    type="news"
                                    img={item.image}
                                    buttonContent="Ver novedad"
                                    description={item.content}
                                    />
                                </SwiperSlide>
                            
                        )
                )}
                </>
            )}
            </Swiper>
    </div>
    )
}

export default NewsList;