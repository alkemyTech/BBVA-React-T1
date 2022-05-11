import React, { useState, useEffect } from "react";
import { Container, TextField, Button } from "@mui/material";
import { Redirect, NavLink } from "react-router-dom";
import "../FormStyles.css";

const RegisterForm = () => {
  const [initialValues, setInitialValues] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    passwordError: "",
    confirmPasswordError: "",
  });

  const passValidation = new RegExp(
    "^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})"
  );

  const handleChange = (e) => {
    setInitialValues({ ...initialValues, [e.target.name]: e.target.value });
  };

  function handleErrorConfirmPassword() {
    if (
      initialValues.password !== initialValues.confirmPassword &&
      initialValues.confirmPassword !== ""
    ) {
      setError({
        ...error,
        confirmPasswordError: "Las contraseñas deben coincidir",
      });
    } else {
      setError({
        ...error,
        confirmPasswordError: "",
      });
    }
  }

  function handleErrorPassword() {
    if (
      !initialValues.password.match(passValidation) &&
      initialValues.password !== ""
    ) {
      setError({
        ...error,
        passwordError:
          "Debe contener un mínimo de 6 caracteres, una letra, un número y un símbolo",
      });
    } else {
      setError({
        ...error,
        passwordError: "",
      });
    }
  }

  useEffect(() => {
    handleErrorConfirmPassword();
    return () => {};
  }, [initialValues.confirmPassword]);

  useEffect(() => {
    handleErrorPassword();
    return () => {};
  }, [initialValues.password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("token", "tokenValueExample");
    return initialValues;
  };

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
            value={initialValues.name}
          />
          <TextField
            required
            id="outlined-required"
            name="lastName"
            label="Apellido"
            onChange={handleChange}
            value={initialValues.lastName}
          />
          <TextField
            required
            id="outlined-required"
            name="email"
            label="Email"
            type="email"
            onChange={handleChange}
            value={initialValues.email}
          />
          <TextField
            id="outlined-password-input"
            name="password"
            label="Contraseña"
            type="password"
            onChange={handleChange}
            value={initialValues.password}
            error={error.passwordError !== "" ? true : false}
            helperText={error.passwordError}
            required
          />
          <TextField
            id="outlined-password-input"
            name="confirmPassword"
            label="Confirmar contraseña"
            type="password"
            onChange={handleChange}
            value={initialValues.confirmPassword}
            error={error.confirmPasswordError !== "" ? true : false}
            helperText={error.confirmPasswordError}
            required
          />
          <Button
            className="submit-btn"
            variant="contained"
            type="submit"
            style={{ backgroundColor: "#ff0000" }}
          >
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
