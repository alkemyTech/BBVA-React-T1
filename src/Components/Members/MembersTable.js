import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import List from '../GenericList/List';
import { setRef } from '@mui/material';
import { Get } from '../../Services/publicApiService';

// Table content
// Members obj {
//       "id": 0,
//       "name": "string",
//       "image": "string",
//     } 


const getReducedRows = (rows) => {
  rows.forEach((row, index) => {
    const { id, name, image, ...values } = row;
    rows[index] = {
      id,
      name,
      image,
      modificar: `urlModificar${id}`,
      eliminar: `urlEliminar${id}`,
    };
  });
  return rows;
};

const columnsHeaders = ['id','name','image','description','modificar','eliminar'];
const MembersTable = () => {
  const [rowsContent, setRowsContent] = useState([]);
  const [rowsData, setRowsData] = useState([]);

  useEffect(() => { 
    //Utilizio método axios.get hasta que se repare el Get de publicAPI..
    const res = Get(process.env.REACT_APP_URL_BASE_ENDPOINT + process.env.REACT_APP_URL_MEMBER_PATH);
    setRowsData(res);
    //res.then((res) => setRowsData(res.data.data))
    //.catch(err => alert(err));
    const reducedRows = getReducedRows(rowsData);
    setRowsContent(reducedRows);
  }, []);
  return(
    <>
      <div className='container'>
        <h2>MEMBERS LIST</h2>
        <Link to='/backoffice/members/create'> Create Member </Link>
        <List columnsHeaders={columnsHeaders} rows={rowsContent} />
      </div>
    </>
  );
};

export default MembersTable;