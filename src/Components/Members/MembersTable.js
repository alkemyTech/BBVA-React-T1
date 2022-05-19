import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import List from '../GenericList/List';
import { Button } from '@mui/material';
import { Get } from '../../Services/publicApiService';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import './MembersTable.css';

// Table content
// Members obj {
//       "id": 0,
//       "name": "string",
//       "image": "string",
//     } 

const removeMember = id => {
  //Dummy hasta que esté todo OK BORRAR
  if(id === '') console.log(`id is empty, bye`);
  console.log(`Member 2 remove -> ${id}`);
}

const getReducedRows = (rows) => {
  rows.forEach((row, index) => {
    const { id, name, image, ...values } = row;
    rows[index] = {
      id,
      name,
      'image': <img className='portrait' src={image} alt='image' />,
      'modificar': <Link className='icon-link' to={`/backoffice/members/${id}`}><EditIcon /></Link>,
      'eliminar': <Button className='icon-link' onClick={removeMember(id)}><DeleteForeverIcon /></Button>
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
  return (
    <>
      <div className="members-container">
        <h2>MEMBERS LIST</h2>
        <Link className='create-link' to="/backoffice/members/create"> Create Member </Link>
        <div className="content-container">
          <List
            columnsHeaders={columnsHeaders}
            rows={getReducedRows(rowsData)}
          />
        </div>
      </div>
    </>
  );
};

export default MembersTable;