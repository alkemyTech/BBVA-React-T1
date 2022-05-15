import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useHistory } from "react-router-dom";
import '../FormStyles.css';
import {Get, PrivatePost, Put} from "../../Services/privateApiService"

const UserForm = () => {

  // ID
  const { id } = useParams();  

  //Url route
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

  
  const getUsers = async () => {
    await Get("/users", id)
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
  };

    useEffect(() => {
        getUsers()
    }, []);   


const userCreated={
    name: initialValues.name ,
    email: initialValues.email,
    role_id: parseInt(initialValues.roleId),
    password: initialValues.password,
    profile_image: initialValues.profileImg,
} 
  



const handleSubmit = async (e) => {
    e.preventDefault();
        if(location.includes("create")){
            await PrivatePost("/users", userCreated)
            history.push("/backoffice/users") 
          }
        else if(location.includes("edit")){
            await Put(id, "/users", userCreated);
            history.push("/backoffice/users") 
        }   
    
}

    const handleChange = (e) => {
        if(e.target.name === 'name'){
            setInitialValues({...initialValues, name: e.target.value})
        } if(e.target.name === 'email'){
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

    const adaptImage64 = (element) => {
        if(!element||!element.currentTarget.files)
            return;
        var file = element.currentTarget.files[0];
        var reader = new FileReader();
        reader.onloadend = function() {
            setInitialValues({...initialValues, profileImg: reader.result})
        }
        reader.readAsDataURL(file);
      }

    const onCloseSnack = () =>{
        setSnack({...snack, open:false})
    }
    
 
    return (
        <>
        <form className="form-container"  onSubmit={handleSubmit}>
            <input className="input-field" type="text" name="name" value={initialValues.name} onChange={handleChange} placeholder="Name"></input>
            <input className="input-field" type="text" name="email" value={initialValues.email} onChange={handleChange}   placeholder="Email"   ></input>
            <input className="input-field" type="text" name="password" value={initialValues.password} onChange={handleChange} placeholder="Password"></input>
            <select className="input-field" value={initialValues.roleId} onChange={e => setInitialValues({...initialValues, roleId: e.target.value})}>
                <option value="" disabled >Select the role</option>
                <option value="1">Admin</option>
                <option value="2">User</option>
            </select>
            <input className="input-field" accept="image/*" type="file" name="profile-img" onChange={adaptImage64} placeholder="imagen de perfil"></input>
            <button className="submit-btn" type="submit">Send</button>
        </form>


        </>
    );
}
 
export default UserForm;