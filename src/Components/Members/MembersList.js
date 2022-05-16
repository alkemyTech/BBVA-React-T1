import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import List from '../GenericList/List';
import { setRef } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

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
      image: <img src={image} alt={image} />,
      modificar: <IconButton aria-label="delete" href={`/members/modify/${id}`}><EditIcon /></IconButton>,
      eliminar: <IconButton aria-label="delete" href={`/members/delete/${id}`}><DeleteIcon /></IconButton>,
    };
  });
  return rows;
};

const columnsHeaders = ['id','name','image','modificar','eliminar'];
const MembersList = () => {
  const [rowsContent, setRowsContent] = useState([]);

  useEffect(async () => { 
    //Utilizio método axios.get hasta que se repare el Get de publicAPI..
    try {
      const res = await axios.get(`${process.env.REACT_APP_URL_BASE_ENDPOINT + process.env.REACT_APP_URL_MEMBER_PATH}` );
      const rows = await res.data.data;
      setRowsContent(getReducedRows(rows));
    } catch (err) { alert(err); }
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

export default MembersList;