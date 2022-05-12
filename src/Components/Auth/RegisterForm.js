import React, { useState, useEffect } from "react";
import { Container, TextField, Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import "../FormStyles.css";
import { Post } from "../../Services/publicApiService";

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

  const passErrorMsg =
    "Debe contener un mínimo de 6 caracteres, una letra, un número y un símbolo";
  const cPassErrorMsg = "Las contraseñas deben coincidir";

  const { name, lastName, email, password, confirmPassword } = initialValues;
  const { passwordError, confirmPasswordError } = error;

  const passValidation = new RegExp(
    "^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})"
  );

  const handleChange = (e) => {
    setInitialValues({ ...initialValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = Post("register", {
      name: "juan",
      email: "juan@gmail.com",
      password: "lkdjfzhnl",
    });
    res.catch((e) => console.log(e));
    console.log("blabla" + res);
    localStorage.setItem("token", "tokenValueExample");
  };

  const validConfirmPassword =
    password !== confirmPassword && confirmPassword !== "";
  const validPassword = !password.match(passValidation) && password !== "";

  useEffect(() => {
    setError({
      ...error,
      confirmPasswordError: validConfirmPassword,
      passwordError: validPassword,
    });
    return () => {};
  }, [initialValues.password, initialValues.confirmPassword]);

  return (
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
          <Button className="submit-btn" variant="contained" type="submit">
            Registrarse
          </Button>
        </form>
        <p className="question-p">¿Ya tienes una cuenta?</p>
        <NavLink className="nav-link" to="/login">
          Inicia sesión
        </NavLink>
      </Container>
      <div className="img-form-container">
        <img className="img-form" alt="" src="/images/login.png" />
      </div>
    </div>
  );
};

export default RegisterForm;
