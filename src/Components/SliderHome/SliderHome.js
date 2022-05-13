import { useEffect,useState } from "react";
import axios from "axios";

//Swiper
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';
import { Autoplay, Navigation, Pagination } from "swiper";

//Swiper styles
import 'swiper/swiper.min.css'
import 'swiper/modules/pagination/pagination.min.css'

//Arrows- Material UI Icons
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
   
//Estilos
import './SliderHome.css'



const SliderHome = ({endopoint}) => {
    const [slides, setSlides] = useState([])
    useEffect( () => {
        axios.get(`https://ongapi.alkemy.org/api/${endopoint}`)
        .then( (res) => {
            setSlides(res.data.data)
        })
    }, [endopoint])


    return(
        <div className="container-section-list">
            <Swiper
                slidesPerView={1}
                autoplay={{
                    delay: 2200,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                    dynamicMainBullets: 2
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
                    <span>No hay titulos para mostrar
                    </span>
                ) : (
                    <>  
                        {slides.map( (slide) => {
                            const { name, image, id, description } = slide
                            return(
                                <SwiperSlide className= "slide-solo" key={id}>
                                        <img className="slide-image" src = {image} alt = {name}/>
                                        <span className="slide-span">{name}</span>
                                        <p className="slide-p">{description}</p>
                                </SwiperSlide>
                            )
                        })}

                    </>
                )
            }
                <div className="swiper-button-next"><ArrowForwardIosIcon/></div>
                <div className="swiper-button-prev"><ArrowBackIosNewIcon/></div>
            </Swiper>

        </div>
    )
}

export default SliderHome;

