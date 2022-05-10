import React, { useState } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
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

  const handleChange = (e) => {
    if (e.target.name === "name") {
      setInitialValues({ ...initialValues, name: e.target.value });
    }
    if (e.target.name === "lastName") {
      setInitialValues({ ...initialValues, lastName: e.target.value });
    }
    if (e.target.name === "email") {
      setInitialValues({ ...initialValues, email: e.target.value });
    }
    if (e.target.name === "password") {
      setInitialValues({ ...initialValues, password: e.target.value });
    }
    if (e.target.name === "confirmPassword") {
      setInitialValues({ ...initialValues, confirmPassword: e.target.value });
      if (
        initialValues.password !== initialValues.confirmPassword &&
        initialValues.confirmPassword !== ""
      ) {
        setError({
          ...error,
          confirmPasswordError: "Las contraseñas deben coincidir",
        });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(initialValues);
    localStorage.setItem("token", "tokenValueExample");
  };

  return (
    <Container maxWidth="sm">
      <h3>Bienvenido/a!</h3>
      <h1>Regístrese</h1>
      <form className="form-container" onSubmit={handleSubmit}>
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
        />
        <Button className="submit-btn" variant="contained" type="submit">
          Registrarse
        </Button>
      </form>
    </Container>
  );
};

export default RegisterForm;
