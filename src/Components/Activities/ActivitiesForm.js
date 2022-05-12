import React, { useState } from 'react';
import '../FormStyles.css';
import { TextField } from '@mui/material';
import { useParams } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './ActivitiesForm.css'
import { useEffect } from 'react';
import { Get , Put,PrivatePost} from '../../Services/privateApiService';
import Spinner from './../Spinner/Spinner';
import { Snackbar , Alert } from '@mui/material';
import { getDateString } from '../../Utils/Utils';
import { useHistory } from "react-router-dom";

const ActivitiesForm = () => {
    const [initialValues, setInitialValues] = useState({
        name: '',
        image64: '',
        imageUrl:'',
        description: '',
        getData: '',
    });
    const history = useHistory();
    const [snack, setSnack] = useState({
        open: false,
        message: "",
        severity: "error",
    })
 

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
        
    },[] );

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

    const imageABase64 = (element) => {
        if(!element||!element.currentTarget.files)
            return;
        var file = element.currentTarget.files[0];
        var reader = new FileReader();
        reader.onloadend = function() {
            setInitialValues({...initialValues, image64: reader.result})
        }
        reader.readAsDataURL(file);
        
      }

    const handleSubmit = (e) => {
        e.preventDefault();
       
        const objectSend={
            id: (!!idActividad)? idActividad:0 ,
            name: initialValues.name ,
            descripcion: initialValues.description,
            image: initialValues.image64,
            user_id:  0,
            category_id:  0,
            created_at:  (!!idActividad)?initialValues.getData.created_at:getDateString() ,
            updated_at:   getDateString(),
            deleted_at: "" ,
        }
        var promesa = (idActividad)? Put(objectSend.id,"activities",objectSend) : PrivatePost("activities",objectSend);

        promesa.then( res => {
            if(res.data.success){
                history.push("/activities");
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
                
                <TextField id="outlined-basic" label="Titulo de la actividad" variant="outlined"  
                            type="text" name="name" value={initialValues.name} onChange={handleChange}/>
                
            <CKEditor
                        editor={ ClassicEditor }
                        data={initialValues.description}
                        onChange={ ( event, editor ) => setInitialValues(
                            {...initialValues ,description : editor.getData()}) }
                    /> 
                <h4>Seleccione una imagen</h4>
                <input accept="image/*" type="file" onChange={imageABase64} />
                
                <button className="submit-btn" type="submit" >Send</button>
            </form>

            <Snackbar
                open={snack.open}
                severity={snack.severity}
                autoHideDuration={3000}
                onClose={onCloseSnack}

                action={onCloseSnack}>
                <Alert onClose={onCloseSnack} severity={snack.severity} sx={{ width: '100%' }}>
                    {snack.message}
                </Alert>
            </Snackbar>
        </div>
    );
}
 
export default ActivitiesForm;