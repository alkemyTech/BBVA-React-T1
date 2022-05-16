import * as React from 'react';
import Table from '../../Utils/TableComponent/TableComponent'

const ShowSlides = () => {

    const slidesEndpoint = process.env.REACT_APP_URL_BASE_ENDPOINT + process.env.REACT_APP_URL_SLIDES;
    const columnNames = ["Titulo","Imagen","Numero de orden","",""]





    return(
        <>
            <Table columnNames={columnNames}/>
        </>
    )
}

export default ShowSlides;