import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import List from '../GenericList/List';
import { Button } from '@mui/material';
import { Get } from '../../Services/publicApiService';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

// Table content
// Members obj {
//       "id": 0,
//       "name": "string",
//       "image": "string",
//     } 

const removeMember = id => {
  //Dummy hasta que esté todo OK BORRAR
  console.log(`Member 2 remove -> ${id}`);
}

const getReducedRows = (rows) => {
  rows.forEach((row, index) => {
    const { id, name, image, ...values } = row;
    rows[index] = {
      id,
      name,
      image: <img className='portrait' src={`${image}`} style={{width: '100px', height:'100px'}} />,
      modificar: <Link to={`/backoffice/members/${id}`}><EditIcon /></Link>,
      eliminar: <Button onClick={removeMember({id})}><DeleteForeverIcon /></Button>
    };
  });
  return rows;
};

const columnsHeaders = ['id','name','image','description','modificar','eliminar'];
const MembersTable = () => {
  const [rowsContent, setRowsContent] = useState([]);
  const [rowsData, setRowsData] = useState([]);

  const getMembersData = async () => {
    const res = await Get(process.env.REACT_APP_URL_BASE_ENDPOINT + process.env.REACT_APP_URL_MEMBER_PATH);
    setRowsData(res.data.data);
  }

  useEffect(() => { 
    getMembersData();
  }, []);
  console.log({rowsData});
  return(
    <>
      <div className='container'>
        <h2>MEMBERS LIST</h2>
        <Link to='/backoffice/members/create'> Create Member </Link>
        <List columnsHeaders={columnsHeaders} rows={getReducedRows(rowsData)} />
      </div>
    </>
  );
};

export default MembersTable;