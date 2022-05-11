import React, {useEffect} from 'react';
import { FormControl, FormHelperText, TextField, Button } from '@mui/material';

// Styles

import './LoginForm.css';
//import 'styles.css'; // Relative path to public.
//import '/css/responsive.css'; // Relative path to public.


/*
 * Criterios de aceptación: En base al formulario entregado como base, transformar los campos de textoa un campo Email y campo Contraseña para autenticarse. 
*  Ambos campos son obligatorios y deben ser validados desde el lado del cliente.
*
*  VALIDACIONES
*   - La contraseña debe tener una longitud mínima de 6 caraceteres, 
*     y contener al menos un número, una letra y un símbolo 
*     (por ejemplo: @#$%).
*   - Al no disponer aún del servicio de peticiones HTTP, solamente almacenar los campos completados en un objeto (para posteriormente enviarlo).
*   - El email debe tener un formato adecuado.
*/




const LoginForm = () => {
  
  return (
    <>
    <div className="login-container">
        <div className='form-container form-login border'>
          <FormControl>
            <TextField required
              id="emailId" name='email'
              type='email' label="Email"
              helperText='HelperText'
            />
            <TextField required
              id="passwordId" name='password'
              type='password' label="Password"
              helperText='HelperText'
            />
            <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
            <Button>Iniciar Sesión</Button>
          </FormControl>

        </div>
        <div className='img-container border'>
          <img alt="img-login" src={`${process.env.PUBLIC_URL}/images/login.jpg`} />
        </div>
    </div>
    </>
  );
}

export default LoginForm;
