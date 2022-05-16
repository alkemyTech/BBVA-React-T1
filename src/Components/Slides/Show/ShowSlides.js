import * as React from 'react';
import Table from '../../Utils/TableComponent/TableComponent'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from 'react';
import { Delete, Get } from '../../../Services/privateApiService';
import Spinner from './../Spinner/Spinner';
import { Snackbar , Alert,TextField } from '@mui/material';
import { Link } from 'react-router-dom';

const ShowSlides = () => {

    const slidesEndpoint = process.env.REACT_APP_URL_BASE_ENDPOINT + process.env.REACT_APP_URL_SLIDES_PATH;

    const [snack, setSnack] = useState({
        open: false,
        message: "",
        severity: "error",
    })
    
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
        Delete(slidesEndpoint+"/"+id).then(res =>{
                if(res.data.success){

                }else{

                }

            }
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

    const onCloseSnack = () =>{
        setSnack({...snack, open:false})
    }

    return(
        <div className="globalContainer">
        <Spinner visible={!loaded} className="spinner"  /> 
        <Table columnNames={columnNames} rowData={rowData}/>

        <Snackbar
            open={snack.open}
            severity={snack.severity}
            autoHideDuration={3000}
            onClose={onCloseSnack}>
            <Alert onClose={onCloseSnack} severity={snack.severity} sx={{ width: '100%' }}>
                {snack.message}
            </Alert>
            </Snackbar>
        </div>
    )
}

export default ShowSlides;