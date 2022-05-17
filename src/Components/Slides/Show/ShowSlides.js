import * as React from 'react';
import Table from '../../Utils/TableComponent/TableComponent'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from 'react';
import { Delete, Get } from '../../../Services/privateApiService';
import Spinner from './../../Spinner/Spinner';
import { Snackbar , Alert,TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import './ShowSlides.css'
import { Button } from '@mui/material';
import { LogInTestOrReddirect } from '../../Utils/Auth/Auth';

const ShowSlides = () => {

    const slidesEndpoint = process.env.REACT_APP_URL_BASE_ENDPOINT + process.env.REACT_APP_URL_SLIDES_PATH;


    
    const columnNames = ["Titulo","Imagen","Numero de orden","",""]

    const [ rowData , setRowData ] = useState ([[]])

    const [ loaded , setLoaded] = useState(false)

    const [snack, setSnack] = useState({
        open: false,
        message: "",
        severity: "error",
    })

    const snackSend = (errorMessage,tipo) =>{
        setSnack({...snack, 
            message:errorMessage,
            open:true,
            severity:tipo
        })
    }
    const snackError = (message) => snackSend(message,"error")
    const snackSuccess = (message) => snackSend(message,"success")

    const retrieveDataFromAPI = () => {
        Get(slidesEndpoint).then( res => {
            const dataAPI = res.data;
        if(dataAPI.success){
            setLoaded(true)
            const dataArray = dataAPI.data;
            dataArray.sort( v => v.order)
            const rows = dataArray
            .map( val => [val.name , verImagenJSX(val.image), val.order ,editIcon(val.id), deleteButton(val.id)])
            setRowData(rows)
            
        }
        else{
            snackError("Error en la carga de datos, intente nuevamente mas tarde.");
        }
    }).catch( e => snackError("Error en la carga de datos, intente nuevamente mas tarde."));
    }

    useEffect(() => {
        retrieveDataFromAPI();

    }, []);


    const deleteSlide = (id) => {
        setLoaded(false)
        Delete(slidesEndpoint+"/"+id).then(res =>{
                if(res.data.success){
                    retrieveDataFromAPI();
                    snackSuccess("Slide borrado exitosamente.")
                }else{
                    snackError("Error al eliminar el slide, intente nuevamente mas tarde.");
                    setLoaded(true)
                }
            }
        ).catch( e => {
            snackError("Error al eliminar el slide, intente nuevamente mas tarde.")
        setLoaded(true)
    })

    }

    const verImagenJSX = (url) =>{
        return(
            <>
            <img src={url} alt="No se pudo cargar la imagen" className="imgSlide"/>
            </>
        )
    }

    const deleteButton = (id) =>{
        return(
          <IconButton aria-label="delete" size="small" onClick={() => deleteSlide(id)}>
              <DeleteIcon />
          </IconButton>
        )
    }

    const editIcon = (id) => {
      return(
          <Link to={"/backoffice/slides/"+id}>
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
        <>
        <LogInTestOrReddirect/>
            <div className="globalContainer">
            <Spinner visible={!loaded} className="spinner"  /> 

            <Link className="buttonAdd" to="/backoffice/slides/create">
                <Button variant="contained" endIcon={<AddIcon />} >
                    Agregar Slide
                </Button>
            </Link>
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
        </>
    )
}

export default ShowSlides;