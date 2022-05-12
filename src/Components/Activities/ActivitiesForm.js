import React, { useState } from 'react';
import '../FormStyles.css';
import { TextField } from '@mui/material';
import { useParams } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './ActivitiesForm.css'

const ActivitiesForm = () => {
    const [initialValues, setInitialValues] = useState({
        name: '',
        srcUrlImage: '',
        description: ''
    });

    const [ckEditorData, setCkData] = useState("")
    const { idActividad } = useParams();

  

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
        console.log(initialValues);
    }
    
    const submitData = () =>{

    }


    return (
        <form className="form-container" onSubmit={handleSubmit}>
            
            <TextField id="outlined-basic" label="Titulo de la actividad" variant="outlined"  
                        type="text" name="name" value={initialValues.name} onChange={handleChange}/>
            
         <CKEditor
                    editor={ ClassicEditor }
                    data={ckEditorData}
                    onChange={ ( event, editor ) => setCkData(editor.getData()) }
                /> 

            <TextField id="outlined-basic" label="Image src URL" variant="outlined"  
                        type="text" name="srcUrlImage" value={initialValues.srcUrlImage} onChange={handleChange}/>


            {initialValues.srcUrlImage.length>5 &&
                <img  src={initialValues.srcUrlImage} alt="La imagen no pudo ser cargada, verifique la URL"
                className='imgPrueba'/>
            
            }
            <button className="submit-btn" type="submit" onClick={submitData()}>Send</button>
        </form>
    );
}
 
export default ActivitiesForm;