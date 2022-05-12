import React, { useState } from 'react';
import '../FormStyles.css';
import { TextField } from '@mui/material';
import { useParams } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './ActivitiesForm.css'
import { useEffect } from 'react';
import { Get } from '../../Services/privateApiService';
import Spinner from './../Spinner/Spinner';
import { Post }from '../../Services/publicApiService';


const ActivitiesForm = () => {
    const [initialValues, setInitialValues] = useState({
        name: '',
        srcUrlImage: '',
        description: '',
        getData: '',
    });
 

    const { idActividad } = useParams();
    const [loaded , setLoaded] = useState(!idActividad)
    
    useEffect(() => {
        if(idActividad){
            Get("activities",idActividad.toString()).then( res => {
                initialValues.getData=res;
                const data=res.data.data;
                initialValues.name=data.name || "";
                initialValues.srcUrlImage=data.image || "";
                initialValues.description=data.description || ""
                setInitialValues({...initialValues})
                setLoaded(true)
            }).catch( e => {
                console.log ("Error: "+e)
            })
        }
        
    }, );

    const handleChange = (e) => {
        if(e.target.name === 'name'){
            setInitialValues({...initialValues, name: e.target.value})
        } if(e.target.name === 'description'){
            setInitialValues({...initialValues, description: e.target.value})
        }
        if(e.target.name === 'srcUrlImage'){
            setInitialValues({...initialValues, srcUrlImage: e.target.value})
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        objectSend

        
    }
    


    return (
        <div className="globalContainer">
            <Spinner visible={!loaded} className="spinner"  /> 
            <form className="form-container" onSubmit={handleSubmit}>
                
                <TextField id="outlined-basic" label="Titulo de la actividad" variant="outlined"  
                            type="text" name="name" value={initialValues.name} onChange={handleChange}/>
                
            <CKEditor
                        editor={ ClassicEditor }
                        data={initialValues.description}
                        onChange={ ( event, editor ) => setInitialValues(
                            {...initialValues ,description : editor.getData()}) }
                    /> 
                <TextField id="outlined-basic" label="Image src URL" variant="outlined"  
                            type="text" name="srcUrlImage" value={initialValues.srcUrlImage} onChange={handleChange}/>


                {initialValues.srcUrlImage.length>5 &&
                    <img  src={initialValues.srcUrlImage} alt="La imagen no pudo ser cargada, verifique la URL"
                    className='imgPrueba'/>
                
                }
                <button className="submit-btn" type="submit" >Send</button>
            </form>
        </div>
    );
}
 
export default ActivitiesForm;