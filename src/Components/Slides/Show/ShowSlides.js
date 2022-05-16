import * as React from 'react';
import Table from '../../Utils/TableComponent/TableComponent'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from 'react';
import { Delete, Get } from '../../../Services/privateApiService';
import { Link } from 'react-router-dom';

const ShowSlides = () => {

    const slidesEndpoint = process.env.REACT_APP_URL_BASE_ENDPOINT + process.env.REACT_APP_URL_SLIDES_PATH;
    
    const columnNames = ["Titulo","Imagen","Numero de orden","",""]

    const [ rowData , setRowData ] = useState ([[]])



    const retrieveDataFromAPI = () => {
        Get(slidesEndpoint).then( res => {
            const dataAPI = res.data;
        if(dataAPI.success){
            const dataArray = dataAPI.data;
            const rows = dataArray
            .map( val => [val.name , val.image, val.order,editIcon(val.id), deleteButton(val.id)])
            setRowData(rows)
            
        }
    });
    }

    useEffect(() => {
        retrieveDataFromAPI();

    }, []);

    const deleteSlide = (id) => {
        Delete(slidesEndpoint+"/"+id).then(
            
        )

    }



    const deleteButton = (id) =>{
        return(
          <IconButton aria-label="delete" size="small">
              <DeleteIcon />
          </IconButton>
        )
    }

    const editIcon = (id) => {
      return(
          <Link to={"/Slides/"+id}>
            <IconButton aria-label="delete" size="small" >
                <EditIcon />
            </IconButton>
          </Link>
        )
    }

    return(
        <>
            <Table columnNames={columnNames} rowData={rowData}/>
        </>
    )
}

export default ShowSlides;