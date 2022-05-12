import React, { useState } from 'react';
import '../FormStyles.css';
import { TextField } from '@mui/material';
import { useParams } from 'react-router-dom';


const ActivitiesForm = () => {
    const [initialValues, setInitialValues] = useState({
        name: '',
        description: ''
    });
    const { idActividad } = useParams();
    
  

    const handleChange = (e) => {
        if(e.target.name === 'name'){
            setInitialValues({...initialValues, name: e.target.value})
        } if(e.target.name === 'description'){
            setInitialValues({...initialValues, description: e.target.value})
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(initialValues);
    }
    
    return (
        <form className="form-container" onSubmit={handleSubmit}>
            
            <TextField id="outlined-basic" label="Titulo de la actividad" variant="outlined"  
                        type="text" name="name" value={initialValues.name} onChange={handleChange}/>
            <TextField id="outlined-basic" label="Titulo de la actividad" variant="outlined"  
                        type="text" name="name" value={initialValues.name} onChange={handleChange}/>
             <input className="input-field" type="text" name="description" value={initialValues.description} onChange={handleChange} placeholder="Write some activity description"></input>
          
            
            <button className="submit-btn" type="submit">Send</button>
        </form>
    );
}
 
export default ActivitiesForm;