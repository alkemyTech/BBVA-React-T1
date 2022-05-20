import React, { useState, useEffect } from "react";
import { Container, TextField, Button } from "@mui/material";
import { NavLink, useHistory } from "react-router-dom";
import "../FormStyles.css";
import { Post } from "../../Services/publicApiService";
import "./RegisterForm.css"
import { GetAppContext } from '../../index';

const RegisterForm = () => {
  const [initialValues, setInitialValues] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    passwordError: false,
    confirmPasswordError: false,
  });

  const token = localStorage.getItem('token');
  const history = useHistory();

  const passErrorMsg =
    "Debe contener un mínimo de 6 caracteres, una letra, un número y un símbolo";
  const cPassErrorMsg = "Las contraseñas deben coincidir";

  const { name, lastName, email, password, confirmPassword } = initialValues;
  const { passwordError, confirmPasswordError } = error;

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


    const snackError = (message) => setSnackBar(message,"error")
    const snackSuccess = (message) => setSnackBar(message,"success")

  const passValidation = new RegExp(
    "^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})"
  );

  const handleChange = (e) => {
    setInitialValues({ ...initialValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSpinner(true)
    try{
      const res = await Post(process.env.REACT_APP_URL_BASE_ENDPOINT+"/register", {
        name: name.toString(),
        email: email.toString(),
        password: password.toString(),
      })
      if(res.data.success){
        snackSuccess("Registrado correctamente")
        localStorage.setItem("token", res.data.data.token);
        history.push("/")

      }else{
          snackError("El usuario ya esta en uso")
      }
    }catch(e){
      snackError("El usuario ya esta en uso")//aA@12!.Ff
    }
    setSpinner(false)
    
  };

  const validConfirmPassword =
    password !== confirmPassword && confirmPassword !== "";
  const validPassword = !password.match(passValidation) && password !== "";

  const handleError = () => {
    setError({
      ...error,
      confirmPasswordError: validConfirmPassword,
      passwordError: validPassword,
    });
  };

  useEffect(() => {
    handleError();
    return () => {};
  }, [password, confirmPassword]);

  return (
    <>
    {token ? (history.push('/')) :
    <div className="main-container-form">
      <Container maxWidth="sm" className="form-container">
        <h3>Bienvenido/a!</h3>
        <h1>Regístrese</h1>
        <form className="register-form" onSubmit={handleSubmit}>
          <TextField
            required
            id="outlined-required"
            name="name"
            label="Nombre"
            onChange={handleChange}
            value={name}
          />
          <TextField
            required
            id="outlined-required"
            name="lastName"
            label="Apellido"
            onChange={handleChange}
            value={lastName}
          />
          <TextField
            required
            id="outlined-required"
            name="email"
            label="Email"
            type="email"
            onChange={handleChange}
            value={email}
          />
          <TextField
            id="outlined-password-input"
            name="password"
            label="Contraseña"
            type="password"
            onChange={handleChange}
            value={password}
            error={passwordError}
            helperText={passwordError ? passErrorMsg : ""}
            required
          />
          <TextField
            id="outlined-password-input"
            name="confirmPassword"
            label="Confirmar contraseña"
            type="password"
            onChange={handleChange}
            value={confirmPassword}
            error={confirmPasswordError}
            helperText={confirmPasswordError ? cPassErrorMsg : ""}
            required
          />
          {!token ? <Button className="submit-btn" variant="contained" type="submit"> Registrarse </Button> : ''}
          
        </form>
        <p className="question-p">¿Ya tienes una cuenta?</p>
        <NavLink className="nav-link" to="/login">
          Inicia sesión
        </NavLink>
      </Container>
      <div className="img-form-container img-form-back" style={{ backgroundImage: "url('/images/login.png')" }}>
     
      </div>
    </div>
    }
    </>
  );
};

export default RegisterForm;
