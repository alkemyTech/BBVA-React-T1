import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../FormStyles.css';
import { Snackbar , Alert,TextField } from '@mui/material';
import Spinner from './../Spinner/Spinner';
import { useHistory } from "react-router-dom";

const SlidesForm = () => {

    const history = useHistory();
    
    const [initialValues, setInitialValues] = useState({
        name: '',
        description: ''
    });

    const { id } = useParams();
    const [loaded , setLoaded] = useState(false)

    const [snack, setSnack] = useState({
        open: false,
        message: "",
        severity: "error",
    })

    const creacionForm = id === "create";


    const handleChange = (e) => {
         setInitialValues({...initialValues, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(initialValues);
    }
    const onCloseSnack = () =>{
        setSnack({...snack, open:false})
    }

    return (
        <div className="globalContainer">
            <Spinner visible={!loaded} className="spinner"  />  
            
            <form className="form-container" onSubmit={handleSubmit}>
                {id}
                <input className="input-field" type="text" name="name" value={initialValues.name} onChange={handleChange} placeholder="Slide Title"></input>
                <input className="input-field" type="text" name="description" value={initialValues.description} onChange={handleChange} placeholder="Write the description"></input>
                <button className="submit-btn" type="submit">Send</button>
            </form>

            <Snackbar
            open={snack.open}
            severity={snack.severity}
            autoHideDuration={3000}
            onClose={onCloseSnack}>
            <Alert onClose={onCloseSnack} severity={snack.severity} sx={{ width: '100%' }}>
                {snack.message}
            </Alert>
        </Snackbar>
     </div>
    );
}
 
export default SlidesForm;