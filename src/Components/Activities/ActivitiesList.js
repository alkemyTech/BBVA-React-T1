import React, { useEffect, useState } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
} from "@material-ui/core";
import { Edit, Delete } from "@mui/icons-material";
import AddIcon from '@mui/icons-material/Add';
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Get } from "./../../Services/privateApiService";
import { Snackbar , Alert } from '@mui/material';
import "./ActivitiesList.css"

function ActivitiesList() {
  const [data, setData] = useState([]);
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

  const getActivities = async () => {
    await Get(process.env.REACT_APP_URL_BASE_ENDPOINT + process.env.REACT_APP_URL_ACTIVITIES_PATH)
    .then(res => setData(res.data.data))
    .catch(() => showSnack("No se pudieron cargar los datos, intente mas tarde", "error"))
  };

  useEffect(() => {
    getActivities();
  }, []);

  const onCloseSnack = () =>{
    setSnack({...snack, open:false})
  }

  return (
    <div className="Activities">
      <div className="buttons">
        <Button variant="contained" color="primary" style={{ marginTop: "2rem"}}>
          <Link className="top-links table-btn-create" to="/backoffice/activity/create">
            New Activity <AddIcon/> 
          </Link>
        </Button>
      </div>
      <div className="table">
        <TableContainer>
          <Table className="table-list">
            <TableHead className="table-head">
              <TableRow className="table-cell">
                <TableCell className="table-cell">Nombre</TableCell>
                <TableCell className="table-cell">Descripción</TableCell>
                <TableCell className="table-cell">Imagen</TableCell>
                <TableCell className="table-cell"></TableCell>
                <TableCell className="table-cell"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((user) => (
                <TableRow key={user.id} className="table-row">
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.description}</TableCell>
                  <TableCell><img src={user.image} alt={user.name} className="img-list"></img></TableCell>
                  <TableCell>
                    <Link
                      to={`/backoffice/activity/${user.id}`}
                    >
                      <Edit className="table-icon"/>
                    </Link>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                  </TableCell>
                  <TableCell>
                  <Delete className="table-icon"/>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

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
