import React, { useEffect, useState } from "react";

import { Edit } from "@mui/icons-material";
import Table from '../../Components/Utils/TableComponent/TableComponent'
import AddIcon from '@mui/icons-material/Add';
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Get, Delete } from "./../../Services/privateApiService";
import DeleteIcon from '@mui/icons-material/Delete';
import { Snackbar , Alert } from '@mui/material';
import "./ActivitiesList.css"


function ActivitiesList() {

  const columns = ["Titulo","Fecha Creación","Imagen","",""]
  const [ rowData , setRowData ] = useState ([[]])

  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "error",
  })

  const showSnack = (text, type) =>{
    setSnack({...snack, 
        message: text,
        open: true,
        severity: type,
    })
  } 

  const getActivitiesData = () => {
    Get(process.env.REACT_APP_URL_BASE_ENDPOINT + process.env.REACT_APP_URL_ACTIVITIES_PATH)
    .then( res => {
      const rows = res.data.data
      .map( activitie => [activitie.name , dateInfo(activitie.created_at), img(activitie.image, activitie.name) ,editIcon(activitie.id), deleteButton(activitie.id)])
      setRowData(rows) 
    })
    .catch( () => showSnack("Error en la carga de datos, intente nuevamente mas tarde.", "erorr"));
    }


  useEffect(() => {
    getActivitiesData();
  }, []);

  const deleteActivitie = async (id) => {
     await Delete(process.env.REACT_APP_URL_BASE_ENDPOINT + process.env.REACT_APP_URL_ACTIVITIES_PATH +"/"+id)
     .then(res =>{
        if(res.data.success){
          getActivitiesData();
            showSnack("actividad borrado exitosamente.", "success")
        }else{
          showSnack("Error al eliminar la actividad, intente nuevamente mas tarde.", "error");
        }
    })
    .catch( e => {
        showSnack("Error al eliminar la actividad, intente nuevamente mas tarde.", "error")
      })
  }
  
  const dateInfo = (dateInfo) => dateInfo.slice(0, 10) +" - " + dateInfo.slice(11,16) + " hs"

  const img = (imgSrc, titulo) => <img src={imgSrc} alt={titulo} className="img-list"></img>
  
  const deleteButton = (id) =>{
    return(
      <DeleteIcon aria-label="delete" size="small" className="table-icon" onClick={() => deleteActivitie(id)}><DeleteIcon />
      </DeleteIcon>)}
  
  const editIcon = (id) => {
    return(
        <Link to={"/backoffice/activity/"+id}>
          <Edit aria-label="delete" size="small" className="table-icon"></Edit>
        </Link>
  )}

  const onCloseSnack = () =>{
    setSnack({...snack, open:false})
  }

  return (
    <div className="Activities">
      <div className="buttons">
        <Button variant="contained" color="primary" className="table-btn-create">
          <Link className="top-links table-link-create" to="/backoffice/activity/create">
            New Activity <AddIcon/> 
          </Link>
        </Button>
      </div>
      <Table columnNames={columns} rowData={rowData} className="table-container"/>
      <Snackbar
        open={snack.open}
        severity={snack.severity}
        autoHideDuration={4000}
        onClose={onCloseSnack}>
        <Alert onClose={onCloseSnack} severity={snack.severity} sx={{ width: '100%' }}>
            {snack.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default ActivitiesList;
