import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import List from '../GenericList/List';
import { Button, StyledEngineProvider, CssBaseline } from '@mui/material';
import { Get } from '../../Services/publicApiService';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Delete } from '../../Services/privateApiService';
import './MembersTable.css';
import { GetAppContext } from '../../index';


const columnsHeaders = ['id','name','image','description','modificar','eliminar'];
const MembersTable = () => {
  
  const [rowsData, setRowsData] = useState([]);
  const { appData, setAppData } = GetAppContext();

  const setSpinner = (open) => {
    setAppData((prevState) => ({
      ...prevState,
      spinner: {
        open: open,
      },
    }));
  };
  const setSnackBar = (message, severity) => {
    setAppData((prevState) => ({
      ...prevState,
      snackbar: {
        ...prevState.snackbar,
        message: message,
        severity: severity,
        open: true,
      },
    }));
  };

  const removeMember = async id => {
    try {
      const res = await Delete(`${process.env.REACT_APP_URL_BASE_ENDPOINT + process.env.REACT_APP_URL_MEMBER_PATH}/${id}`);
      if(res.data.success) {
        setSnackBar(`Miembro con id: ${id} borrado correctamente`,"success");
        getMembersData();
      }
    } catch (error) {
      setSnackBar(`Error al borrar miembro -> ${error}`,"error");
    }
    
  }

  const getReducedRows = (rows) => {
    var rowsReturn= []
    rows.forEach((row) => {
      const { id, name, image, description } = row;
      rowsReturn.push( {
        id,
        name,
        description,
        image: <img className='portrait' src={image} alt='portrait' />,
        modificar: <Link className='icon-link' to={`/backoffice/members/${id}`}><EditIcon /></Link>,
        eliminar: <Button className='icon-link' onClick={ () => removeMember(id)}><DeleteForeverIcon /></Button>
      })
    });
    //const v=rowsReturn[0].image
    return rowsReturn;
  };

  const getMembersData = async () => {
    const res = await Get(process.env.REACT_APP_URL_BASE_ENDPOINT + process.env.REACT_APP_URL_MEMBER_PATH);
    setRowsData(res.data.data);
  }

  useEffect(() => { 
    getMembersData();

  }, []);

  return (
    <StyledEngineProvider injectFirst>
      <CssBaseline />
      <div className="members-table-container">
        <h2>MEMBERS LIST</h2>
        <Link className='create-link' to="/backoffice/members/create"> Create Member </Link>
        <div className="content-container">
          <List
            columnsHeaders={columnsHeaders}
            rows={getReducedRows(rowsData)}
          />
        </div>
      </div>
    </StyledEngineProvider>
  );
};

export default MembersTable;