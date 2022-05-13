
import React, {useEffect, useState} from 'react';
import { FormControl, FormHelperText, TextField, Button, CssBaseline, StyledEngineProvider } from '@mui/material';

// Styles

import './LoginForm.css';


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
  if(!passMustIncludeLettersReg.test(password)) return 'La contraseña no posee letra/s';
  if(!passMustIncludeNumbersReg.test(password)) return 'La contraseña no posee numero/s';
  if(!passMustIncludeSymbolsReg.test(password)) return 'La contraseña no posee simbolo/s';
  return 'valid';
}

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

/**
 *  Función que comprueba que el campo email tenga una syntaxis correcta
 * 
 * DEVOLUCIÓN:
 *  - true en caso de que el mail tenga syntaxis correcta.
 *  - False en caso contrario.
*/
const emailValidator = email => { return(emailRegex.test(email)); }


const LoginForm = () => {
  //States
  const [values, setValues] = useState({email: '', password:''});
  const [validPassword, setValidPassword] = useState('error');
  const [validEmail, setValidEmail] = useState(false);

  //useEffect
  useEffect( () => {
      setValidEmail(emailValidator(values.email));
      setValidPassword(passwordValidator(values.password));
  }, [values]);

  const submitHandler = e => {
    e.preventDefault();
    //Devolver obj values...
    //Lógica de validaciones y redirigir a donde corresponda...
  }

  const handleChange = e => { setValues({ ...values, [e.target.name]: e.target.value }); }
  return (
    <>
      <StyledEngineProvider injectFirst>
        <CssBaseline />
        <div className="login-container">
          <div className='form-container form-login m-0 p-0 '>
            <form className='form' action="" onSubmit={submitHandler}>
              <FormControl>
                <span>Bienvendio</span>
                <h2>Inicia sesion en tu cuenta!</h2>
                <TextField required className='inputer'
                  id="emailId" name='email'
                  type='email' label="Email"
                  value={values.email}
                  onChange={handleChange}
                  helperText={(!validEmail) ? 'Formato incorrecto' : ''}
                  error={!validEmail}
                />
                <TextField required className='inputer'
                  id="passwordId" name='password'
                  type='password' label="Password"
                  value={values.password}
                  onChange={handleChange}
                  helperText={(validPassword === 'valid') ? '' : validPassword}
                  error={(validPassword === 'valid') ? false : true}
                />
                <Button className='login-button' type='submit' disabled={!(validEmail && validPassword === 'valid')}>Iniciar Sesión</Button>
              </FormControl>
            </form>

          </div>
          <div className='img-container '>
            <img className='side-img' alt="img-login" src={`${process.env.PUBLIC_URL}/images/login.jpg`} />
          </div>
        </div>
      </StyledEngineProvider>
    </>
  );
}

export default LoginForm;
