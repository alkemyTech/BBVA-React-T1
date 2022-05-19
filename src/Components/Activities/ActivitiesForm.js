import React, { useState,useEffect } from 'react';
import '../FormStyles.css';
import { useParams } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './ActivitiesForm.css'
import { Get , Put,PrivatePost} from '../../Services/privateApiService';
import Spinner from './../Spinner/Spinner';
import { Snackbar , Alert,TextField } from '@mui/material';
import { useHistory } from "react-router-dom";
import { GetAppContext } from '../../index';

const ActivitiesForm = () => {
    const [initialValues, setInitialValues] = useState({
        name: '',
        image64: '',
        imageUrl:'',
        description: '',
        getData: '',
    });
    const history = useHistory();

 
    
    const { id } = useParams();
    
    const [loaded , setLoaded] = useState(false)
    const actualizacionDeDatos = !!id

    const {appData, setAppData} = GetAppContext();

    const setSpinner = ( open ) =>{
        setAppData(prevState => ({
                ...prevState,
                spinner:{
                    open:open
                }
            })
        )
    }

    const setSnackBar = ( message , severity) => {
        setAppData(prevState => ({
                ...prevState,
                snackbar:{
                        ...prevState.snackbar,
                        message: message,
                        severity: severity,
                        open: true,
                    }
                })
                )
    }


    const snackErrorCargaDatos = () =>{
        setSnackBar("Error en la carga de datos, intente nuevamente mas tarde.","error")
    }

    const getActivityDataToDisplay = () =>{
        setSpinner(true)
        if(id){
            Get(process.env.REACT_APP_URL_BASE_ENDPOINT+process.env.REACT_APP_URL_ACTIVITIES_PATH+"/"+id.toString())
            .then( res => {
                const data=res.data.data;
                setInitialValues({
                    ...initialValues,
                    name:data.name || "",
                    srcUrlImage:data.image || "",
                    description:data.description || "",
                    getData: res
                })
                setSpinner(false)
            })
            .catch( e => {
                snackErrorCargaDatos();
                setSpinner(false)
            })
        }
        else setSpinner(false)
    }

    useEffect(() => {
        getActivityDataToDisplay();
        
    },[] );

    const handleChange = (e) => {
        setInitialValues({...initialValues, [e.target.name]: e.target.value})
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
            id: parseInt((!!id)? id:2 ),
            name: initialValues.name ,
            description: initialValues.description,
            image: initialValues.image64,
            user_id:  0,
            category_id:  0,
        }
        var promise = (id)? 
        Put(process.env.REACT_APP_URL_BASE_ENDPOINT+process.env.REACT_APP_URL_ACTIVITIES_PATH+"/"+objectSend.id,objectSend) : 
        PrivatePost(process.env.REACT_APP_URL_BASE_ENDPOINT+process.env.REACT_APP_URL_ACTIVITIES_PATH,objectSend);

        promise.then( res => {
            if(res.data.success){
                history.push("/backoffice/activities");
            }else{
                setSnackBar("Error debe completar todos los casilleros y subir una imagen.","error")
            }
        })
        
    }

    return (
        <>

        <div className="globalContainer">
          
            <form className="form-container" onSubmit={handleSubmit}>
                <h2>{(actualizacionDeDatos)?"Actualizacion de actividad":"Actividad nueva"}</h2>

                <TextField id="outlined-basic" label="Titulo de la actividad" variant="outlined"  
                            type="text" name="name" value={initialValues.name} onChange={handleChange}/>
                
            <CKEditor
                        editor={ ClassicEditor }
                        value={initialValues.description}
                        onChange={ ( event, editor ) => setInitialValues(
                            {...initialValues ,description : editor.getData()}) }
                    /> 
                <h4>Seleccione una imagen</h4>
                <input accept="image/*" type="file" onChange={imageToBase64} />
                
                <button className="submit-btn" type="submit" >{(actualizacionDeDatos)?"Actualizar actividad":"Enviar actividad"}</button>
            </form>

        </div>
        </>
    );
}
 
export default ActivitiesForm;