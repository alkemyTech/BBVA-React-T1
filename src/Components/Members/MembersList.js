import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import List from '../GenericList/List';

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

const MembersList = () => {
  const [rowsContent, setrowsContent] = useState([]);

  useEffect(() => {
  }, []);
  return(
    <>
      <div className='container'>
        <h2>MEMBERS LIST</h2>
        <Link to='/backoffice/members/create'> Create Member </Link>
        <List columnsHeaders={['id','name','image','description','modificar','eliminar']} />
      </div>
    </>
  );
};

export default MembersList;