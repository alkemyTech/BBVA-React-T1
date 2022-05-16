import React from "react";
import SliderHome from "../../SliderHome/SliderHome";

const ShowSlides = () => {

    const slidesEndpoint=process.env.REACT_APP_URL_SLIDES;
    
    return(
        <>
                <SliderHome endpoint={slidesEndpoint}/>
        </>
    )
}

export default ShowSlides;