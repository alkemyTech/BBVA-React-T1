import React, { useState,useEffect } from 'react';
import '../FormStyles.css';
import { useParams } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './ActivitiesForm.css'
import { Get , Put,PrivatePost} from '../../Services/privateApiService';
import Spinner from './../Spinner/Spinner';
import { Snackbar , Alert,TextField } from '@mui/material';
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
 

    const { id } = useParams();
    const [loaded , setLoaded] = useState(false)
    

    const getActivityDataToDisplay = () =>{
        if(id){
            Get("activities",id.toString()).then( res => {
                initialValues.getData=res;
                const data=res.data.data;
                setInitialValues({
                    ...initialValues,
                    name:data.name || "",
                    srcUrlImage:data.image || "",
                    description:data.description || ""
                })
                setLoaded(true)
            }).catch( e => {
                setSnack({...snack, 
                    message:"Error en la carga de datos, intente nuevamente mas tarde.",
                    open:true,
                    severity:"error"
                })
            })
        }
        else setLoaded(true);
    }

    useEffect(() => {
        getActivityDataToDisplay();
        
    },[] );

    const handleChange = (e) => {
        setInitialValues({...initialValues, [e.target.name]: [e.target.values]})
    }

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

    const handleSubmit = (e) => {
        e.preventDefault();
       
        const objectSend={
            id: (!!id)? id:0 ,
            name: initialValues.name ,
            descripcion: initialValues.description,
            image: initialValues.image64,
            user_id:  0,
            category_id:  0,
            created_at:  (!!id)?initialValues.getData.created_at:getDateString() ,
            updated_at:   getDateString(),
            deleted_at: "" ,
        }
        var promise = (id)? Put(objectSend.id,"activities",objectSend) : PrivatePost("activities",objectSend);

        promise.then( res => {
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
                <input accept="image/*" type="file" onChange={imageToBase64} />
                
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