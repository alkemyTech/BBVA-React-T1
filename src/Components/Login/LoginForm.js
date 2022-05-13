
import React, {useEffect, useState} from 'react';
import { FormControl, FormHelperText, TextField, Button, CssBaseline, StyledEngineProvider } from '@mui/material';
import { Post } from '../../Services/publicApiService';
// Styles

import './LoginForm.css';

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
  const [validEmail, setValidEmail] = useState(false);

  //useEffect
  useEffect( () => {
      setValidEmail(emailValidator(values.email));
  }, [values]);

  const submitHandler = e => {
    e.preventDefault();
    try {
      const res = Post('/login', values);
      /* Lógica de login */
    } catch (err) { /* Caso en que la petición devuelve error */ }
  }

  const handleChange = e => { setValues({ ...values, [e.target.name]: e.target.value }); }
  return (
    <>
      <StyledEngineProvider injectFirst>
        <CssBaseline />
        <div className="login-container">
          <div className='container-form form-login m-0 p-0 '>
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
                />
                <Button className='login-button' type='submit' disabled={!(validEmail)}>Iniciar Sesión</Button>
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
