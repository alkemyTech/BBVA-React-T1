import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useHistory } from "react-router-dom";
import '../FormStyles.css';
import {Get, PrivatePost, Put, Delete} from "../../Services/privateApiService"
import { Snackbar , Alert } from '@mui/material';

const UserForm = () => {
  const { id } = useParams();  
  const location = useLocation().pathname.toLocaleLowerCase();
  const history = useHistory();
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "error",
})

  const [initialValues, setInitialValues] = useState({
    name:  '',
    email: '',
    roleId: '',
    profileImg:  '',
    password:  ''
})


const showError = (text) =>{
    setSnack({...snack, 
        message: text,
        open: true,
        severity: "error",
    })
}


//Obtener datos de usuarios y cargarlos en caso de encontrarlos con el id
  const getUsers = async () => {
    await Get(process.env.REACT_APP_URL_BASE_ENDPOINT + "/users/" + id)
    .then(res => {
        const data=res.data.data;
        setInitialValues({
            ...initialValues,
            name:data.name || "",
            email:data.email || "",
            roleId:data.role_id || "",
            profileImg: data.profile_image || "",
            password: data.password || ""
        })
    })
    .catch(() => {
        showError("Error en la carga de datos, intente nuevamente mas tarde.")
    })
  };

    useEffect(() => {
        getUsers()
    }, []);   


// Objeto creado a partir de los valores ingresados del form para enviar peticiones
const userCreated={
    name: initialValues.name ,
    email: initialValues.email,
    role_id: parseInt(initialValues.roleId),
    password: initialValues.password,
    profile_image: initialValues.profileImg,
} 
  

//Validaciones del form
const formValidation = () =>{
    const emailRegexp = new RegExp(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/);
    const imgRegex = new RegExp(/(.jpg|.jpeg|.png)/i)
    let formCorrecto = false;
    if(initialValues.name.length < 4){
        showError("El nombre debe contener al menos 4 letras")
    }else if(Number.isNaN(parseInt(initialValues.roleId)) ){
        showError("Debe seleccionar un rol")
    }
    else if(!emailRegexp.test(initialValues.email)){
        showError("El formato de mail es incorrecto")
    }else if(initialValues.password.length < 8){
        showError("El password debe contener al menor 8 letras")
    }else if(!imgRegex.test(initialValues.profileImg)){
        showError("El formato de la imagen debe ser .jpg o .png")
    }
    else{
        formCorrecto = true;
    }
    return formCorrecto
}


//Envio del form y peticiones
const handleSubmit = async (e)  => {
    e.preventDefault();
    if(formValidation()){
        if(location.includes("create")){
           await PrivatePost(process.env.REACT_APP_URL_BASE_ENDPOINT + "/users", userCreated)
            history.push("/backoffice/users") 
          }
        else if(location.includes("edit")){
            await Put(process.env.REACT_APP_URL_BASE_ENDPOINT + "/users/" + id, userCreated)
            history.push("/backoffice/users") 
        }else if(location.includes("delete")){
            await Delete(process.env.REACT_APP_URL_BASE_ENDPOINT + "/users/" + id)
            history.push("/backoffice/users") 
        } 
    }
}

    //Actualiza los datos con los que obtiene de los inputs del form
    const handleChange = (e) => {
        if(e.target.name === 'name'){
        setInitialValues({...initialValues, name: e.target.value})
        }if(e.target.name === 'email'){
        setInitialValues({...initialValues, email: e.target.value})
        }if(e.target.name === 'profile-img'){
        setInitialValues({...initialValues, profileImg: e.target.value})
        }if(e.target.name === 'password'){
        setInitialValues({...initialValues, password: e.target.value})
        }
        if(e.target.name === 'profile-img'){
        setInitialValues({...initialValues, profileImg: e.target.value})
        }
    }
    

    //Formateo de imagen a code64 para enviar a api
    function encodeImageAsURL(element) {
    var file = element.currentTarget.files[0];
    var reader = new FileReader();
    reader.onloadend = function() {
    setInitialValues({...initialValues, profileImg: reader.result})}
    reader.readAsDataURL(file);
    }

    //Cierre de Notificación Snack
    const onCloseSnack = () =>{
        setSnack({...snack, open:false})
    }
    
    return (
        <>
        <h1 className="title-back" >{!id ? "Crear usuario" : (location.includes("edit") ? "Editar Usuario" : "Eliminar Usuario") }</h1>
        <form className="form-container form-back"  onSubmit={handleSubmit}>
            <h3 className="title-field-users">Nombre</h3>
            <input className="input-field input-back" type="text" name="name" value={initialValues.name} onChange={handleChange} placeholder="Name"></input>
            <h3 className="title-field-users">Email</h3>
            <input className="input-field input-back" type="text" name="email" value={initialValues.email} onChange={handleChange}   placeholder="Email"   ></input>
            <h3 className="title-field-users">Contraseña</h3>
            <input className="input-field input-back" type="text" name="password" value={initialValues.password} onChange={handleChange} placeholder="Password"></input>
            <h3 className="title-field-users">Rol</h3>
            <select className="input-field input-back" value={initialValues.roleId} onChange={e => setInitialValues({...initialValues, roleId: e.target.value})}>
                <option value="" disabled >Select the role</option>
                <option value="1">Admin</option>
                <option value="2">User</option>
            </select>
            <h3 className="title-field-users">Seleccione una imagen</h3>
            <input className="input-field input-back-file" accept=".png, .jpg, .jpeg" type="file" name="profile-img" onChange={encodeImageAsURL} placeholder="imagen de perfil"></input>
            <button className="form-back-submit-btn" type="submit">{!id ? "Crear" : (location.includes("edit") ? "Editar" : "Eliminar")}</button>
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
 
export default UserForm;