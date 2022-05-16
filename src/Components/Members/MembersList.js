import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import List from '../GenericList/List';
import { setRef } from '@mui/material';

// Table content
// Members obj {
//       "id": 0,
//       "name": "string",
//       "image": "string",
//       "description": "string",
//       "facebookUrl": "string",
//       "linkedinUrl": "string",
//       "created_at": "2022-05-13T20:08:58.717Z",
//       "updated_at": "2022-05-13T20:08:58.717Z",
//       "deleted_at": "2022-05-13T20:08:58.717Z"
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
const MembersList = () => {
  const [rowsContent, setRowsContent] = useState([]);
  const [rowsData, setRowsData] = useState([]);

  useEffect(() => { 
    //Utilizio método axios.get hasta que se repare el Get de publicAPI..
    const res = axios.get(`https://ongapi.alkemy.org/api/members`);
    res.then((res) => setRowsData(res.data.data))
    .catch(err => alert(err));
    console.log({rowsData});
    setRowsContent(getReducedRows(rowsData));
  }, []);
  console.log(rowsContent);
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

export default MembersList;