import React from 'react';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import 'swiper/swiper.min.css';
import Card from '../Card/Card';
import { Get } from '../../Services/publicApiService';

const ListadoNovedades = ({type, title, endpoint}) =>{

    const [info, setInfo] = useState([])

    const getOrganizationData = async (url) =>{
        const res = await Get(process.env.REACT_APP_URL_BASE_ENDPOINT + url)
        setInfo(res.data.data);
        console.log(res.data.data);
    }

    useEffect( () => {
        getOrganizationData(endpoint)
    }, [])

    return (
        <div className="news">
            <h1>Novedades</h1>
            <div className="news-container">
                {info.map(
                    (item) => item.image && (
                        <div className="news-item">
                            <Card
                            key={item.id}
                            type="news"
                            img={item.image}
                            buttonContent="Ver novedad"
                            description={item.content}
                            />
              </div>
            )
        )}
      </div>
    </div>
    )
}

export default ListadoNovedades;