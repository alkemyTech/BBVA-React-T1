import React, {useEffect, useState} from 'react';
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



// Password conditions:
const minPasswordLength = 6;
//const mustIncludeRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/; BORRAR
const passMustIncludeLettersReg = /[a-z]/i;
const passMustIncludeNumbersReg = /[0-9]/;
const passMustIncludeSymbolsReg = /\W|_/g;

/**
 *  Función que comprueba que el campo password cumpla las condiciones requeridas
 * 
 * DEVOLUCIÓN:
 *  - 'valid' en caso de que la contraseña cumpla con las condiciones.
 *  - Msj de condición faltante en caso que no cumpla 1 o más condiciones.
*/
const passwordValidator = password => {
  if(password.length < minPasswordLength) return 'Contraseña muy corta';
  if(passMustIncludeLettersReg.test(password)) return 'La contraseña no posee letra/s';
  if(passMustIncludeNumbersReg.test(password)) return 'La contraseña no posee numero/s';
  if(passMustIncludeSymbolsReg.test(password)) return 'La contraseña no posee simbolo/s';
  return 'valid';
}


const LoginForm = () => {
  
  const submitHandler = e => {
    e.preventDefault();
    //Crear objeto para devolver.
  }

  const [validPassword, setValidPassword] = useState('error');
  return (
    <>
      <div className="login-container">
        <div className='form-container form-login '>
          <form action="" onSubmit={submitHandler}>
            <FormControl>
              <span>Bienvendio</span>
              <h2>Inicia sesion en tu cuenta!</h2>
              <TextField required
                id="emailId" name='email'
                type='email' label="Email"
                helperText='HelperText'
              />
              <TextField required
                id="passwordId" name='password'
                type='password' label="Password"
                helperText={(validPassword === 'valid') ? '' : validPassword }
                error = { (validPassword === 'valid')? false : true }
                onChange={console.log('cambiando')}
              />
              <Button type='submit'>Iniciar Sesión</Button>
            </FormControl>
          </form>

        </div>
        <div className='img-container '>
          <img alt="img-login" src={`${process.env.PUBLIC_URL}/images/login.jpg`} />
        </div>
      </div>
    </>
  );
}

export default LoginForm;
