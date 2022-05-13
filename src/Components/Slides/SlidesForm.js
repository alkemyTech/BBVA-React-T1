import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Snackbar , Alert,TextField } from '@mui/material';
import Spinner from './../Spinner/Spinner';
import { useHistory } from "react-router-dom";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Get , Put,PrivatePost} from '../../Services/privateApiService';

import '../FormStyles.css';
import './SlidesForm.css';

const SlidesForm = () => {

    const history = useHistory();
    
    const [initialValues, setInitialValues] = useState({
        name: '',
        description: '',
        order:'',
        image64: '',
    });

    const { id } = useParams();
    const [loaded , setLoaded] = useState(true)

    const [snack, setSnack] = useState({
        open: false,
        message: "",
        severity: "error",
        duration: 3000,
    })

    const actualizacionDeDatos = id !== "create";

    const imageToBase64 = (element) => {
        if(!element||!element.currentTarget.files)
            return;
        var file = element.currentTarget.files[0];
        var reader = new FileReader();
        reader.onloadend = function() {
            setInitialValues({...initialValues, image64: reader.result})
        }
        reader.readAsDataURL(file);
        
      }

    const handleChange = (e) => {
         setInitialValues({...initialValues, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        const objectSend={
            id: parseInt((actualizacionDeDatos)? id: 0 ),
            name: initialValues.name ,
            description: initialValues.description,
            image: initialValues.image64,
            user_id:  0,
            order:  initialValues.order,
        }
        var promise = (!!id)? 
        Put(process.env.REACT_APP_URL_BASE_ENDPOINT+process.env.REACT_APP_URL_SLIDES_PATH+"/"+objectSend.id,objectSend) : 
        PrivatePost(process.env.REACT_APP_URL_BASE_ENDPOINT+process.env.REACT_APP_URL_SLIDES_PATH,objectSend);

        promise.then( res => {
            if(res.data.success){
                history.push("/slides");
            }else{
                setSnack({...snack, 
                    message:"Error debe completar todos los casilleros y subir una imagen.",
                    open:true,
                    severity:"error"
                })
            }
        })
    }
    const onCloseSnack = () =>{
        setSnack({...snack, open:false})
    }

    return (
        <div className="globalContainer">
            <Spinner visible={!loaded} className="spinner"  />  

            <form className="form-container" onSubmit={handleSubmit}>
            <h2>{(actualizacionDeDatos)?"Actualizacion de slide":"Slide nueva"}</h2>

            <TextField id="outlined-basic" label="Titulo del Slide" variant="outlined"  
                        type="text" name="name" value={initialValues.name} onChange={handleChange} required/>

            <CKEditor
                    editor={ ClassicEditor }
                    value={initialValues.description}
                    onChange={ ( event, editor ) => setInitialValues(
                        {...initialValues ,description : editor.getData()}) }
                        required/> 

            <TextField id="outlined-basic" label="Numero de orden" variant="outlined"  
                        type="number" name="order" value={initialValues.order} onChange={handleChange} min="0" required/>

            <h4>Seleccione una imagen</h4>
            <input accept="image/png, image/jpg" type="file" onChange={imageToBase64} required/>

            <button className="submit-btn" type="submit" >{(actualizacionDeDatos)?"Actualizar actividad":"Enviar actividad"}</button>
            </form>

            <Snackbar
            open={snack.open}
            severity={snack.severity}
            autoHideDuration={snack.duration}
            onClose={onCloseSnack}>
                <Alert onClose={onCloseSnack} severity={snack.severity} sx={{ width: '100%' }}>
                    {snack.message}
                </Alert>
        </Snackbar>
     </div>
    );
}
 
export default SlidesForm;