
import { useEffect,useState } from "react";
import axios from "axios";

import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
   
import 'swiper/swiper.min.css'
import 'swiper/modules/pagination/pagination.min.css'

import { Autoplay, Navigation, Pagination } from "swiper";

import './SliderHome.css'

const SliderHome = ({endopoint}) => {
    const [slides, setSlides] = useState([])


    useEffect( () => {
        axios.get(`https://ongapi.alkemy.org/api/${endopoint}`)
        .then( (res) => {
            setSlides(res.data.data)
            console.log(res)
        })
        .catch( (err) => {
            console.log(err);
        })
    }, [endopoint])


    return(
        <div className="container-section-list">
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
        
                loop={true}
                pagination={{
                    clickable: true,
                }}

                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                }}
                modules={[Autoplay,Pagination,Navigation]}
                className="mySwiper"
                
             
            >
            {
                slides.length === 0 ? (
                    <span>No hay titulos para mostrar</span>
                ) : (
                    <>  
                        {slides.map( (slide) => {
                            const { name, image, id } = slide
                            return(
                                <SwiperSlide className= "slide-solo" key={id}>
                                        <img className="slide-image" src = {image} alt = {name}/>
                                        <p className="slide-span">{name}</p>
                                </SwiperSlide>
                            )
                        })}

                    </>
                )
            }
                	<div class="swiper-pagination"></div>
               <div class="swiper-button-next"><ArrowForwardIosIcon/></div>
                <div class="swiper-button-prev"><ArrowBackIosNewIcon/></div>
            </Swiper>

        </div>
    )
}

export default SliderHome;

