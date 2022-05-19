import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";
import '../FormStyles.css';
import {Get, Put} from "../../Services/privateApiService"
import { Snackbar , Alert } from '@mui/material';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const TestimonialForm = () => {
  /* const { id } = useParams();   */
  const history = useHistory();
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "error",
})

  const [initialValues, setInitialValues] = useState({
    name: '',
    logo: '',
    shortDescription: '',
    longDescription: '',
    facebookLink: '',
    instagramLink: '',
    twitterLink: '',
    linkedInLink: '',
})


//Mensajes creados en SnackBar
const showSnack = (text, type) =>{
    setSnack({...snack, 
        message: text,
        open: true,
        severity: type,
    })
}

//Obtener datos de usuarios y cargarlos en caso de encontrarlos con el id
  const getOrganizationData = async () => {
        await Get(process.env.REACT_APP_URL_BASE_ENDPOINT + process.env.REACT_APP_URL_ORGANIZATION_PATH + "/" + 5)
        .then(res => {
            const info=res.data.data;
            setInitialValues({
                ...initialValues,
                name: info.name,
                logo: info.logo,
                shortDescription: info.short_description,
                longDescription: info.long_description,
                facebookLink: info.facebook_url,
                instagramLink: info.instagram_url,
                twitterLink: info.twitter_url,
                linkedInLink: info.linkedin_url,
            })
        })
        .catch(() => {
            showSnack("Error en la carga de datos, intente nuevamente mas tarde.", "error")
        })
  };

    useEffect(() => {
        getOrganizationData()
    }, []);   

//Validaciones del form
const formValidation = () =>{
    const urlRegex = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/)
    const imgRegex = new RegExp(/(.jpg|.jpeg|.png)/i) 
    let validationOk = false;
    if(!initialValues.name || !initialValues.longDescription || !initialValues.shortDescription){
        showSnack("Los campos no pueden queda vacíos", "error")
    }else if(!urlRegex.test(initialValues.facebookLink) || !urlRegex.test(initialValues.instagramLink) || !urlRegex.test(initialValues.linkedInLink) || !urlRegex.test(initialValues.twitterLink) ){
        showSnack("El formato de url es inválido", "error")
    }else if(!imgRegex.test(initialValues.img)){
        showSnack("Ingrese una imagen debe ser .jpg o .png", "error")
    }
    else{
        validationOk = true;
        showSnack("Formulario procesado", "success")
    }
    return validationOk
}


//Envio del form y peticiones

const handleSubmit = async (e)  => {
    const OrganizationCreated={
        name: initialValues.name,
        logo: initialValues.logo,
        shortDescription: initialValues.shortDescription,
        longDescription: initialValues.longDescription,
        facebook_url: initialValues.facebookLink,
        instagram_url: initialValues.instagramLink,
        twitter_url: initialValues.twitterLink,
        linkedin_url: initialValues.linkedInLink,
    } 
    e.preventDefault();
    if(formValidation()){
        await Put(process.env.REACT_APP_URL_BASE_ENDPOINT + process.env.REACT_APP_URL_BASE_ENDPOINT + "/" + 5, OrganizationCreated)
        history.push("/backoffice/organization") 
        }
    }

    //Actualiza los datos con los que obtiene de los inputs del form
    const handleChange = (e) => {
        if(e.target.name === 'name')setInitialValues({...initialValues, name: e.target.value})
    }

    //Formateo de imagen a code64 para enviar a api
    function encodeImageAsURL(element) {
        var file = element.currentTarget.files[0];
        var reader = new FileReader();
        reader.onloadend = function() {
        setInitialValues({...initialValues, img: reader.result})}
        reader.readAsDataURL(file);
    }

    //Cierre de Notificación Snack
    const onCloseSnack = () =>{
        setSnack({...snack, open:false})
    }
    
    return (
        <>
        <h1 className="title-back" > Editar Form </h1>
        <form className="form-container form-back" onSubmit={handleSubmit}>
            <h3 className="title-field-users">Nombre</h3>
            <input className="input-field input-back" type="text" name="name" value={initialValues.name} onChange={handleChange} placeholder="Name"></input>
            <h3 className="title-field-users">Descripción</h3>

            <CKEditor
                config={{
                toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote' ]
                }}
                editor ={ ClassicEditor }
                value ={initialValues.description}
                onChange={(e, editor) => {
                    setInitialValues({...initialValues, description : (editor.getData()).replace(/<\/?[^>]+(>|$)/g, "")});
            }}
            /> 
            <h3 className="title-field-users">Seleccione una imagen</h3>
            <input className="input-field input-back-file" accept=".png, .jpg, .jpeg" type="file" name="img" onChange={encodeImageAsURL} placeholder="imagen"></input>
            <button className="form-back-submit-btn" type="submit"> Editar</button>
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
        </>
    );
}
 
export default TestimonialForm;