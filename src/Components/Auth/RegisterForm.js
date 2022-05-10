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

  const handleChange = (e) => {
    if (e.target.name === "name") {
      setInitialValues({ ...initialValues, name: e.target.value });
    }
    if (e.target.name === "lastName") {
      setInitialValues({ ...initialValues, lastName: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(initialValues);
    localStorage.setItem("token", "tokenValueExample");
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" component="div" gutterBottom>
        Bienvenido/a
      </Typography>
      <Typography variant="h3" gutterBottom component="div">
        Regístrese
      </Typography>
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
        />
        <TextField
          id="outlined-password-input"
          name="confirmPassword"
          label="Confirmar contraseña"
          type="password"
          onChange={handleChange}
          value={initialValues.confirmPassword}
        />
        <Button variant="contained" color="primary" type="submit">
          Registrarse
        </Button>
      </form>
    </Container>
  );
};

export default RegisterForm;
