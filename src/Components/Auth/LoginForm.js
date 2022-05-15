
import React, {useEffect, useState} from 'react';
import { FormControl, FormHelperText, TextField, Button, CssBaseline, StyledEngineProvider, Link } from '@mui/material';
import { Post } from '../../Services/publicApiService';
import { useHistory } from 'react-router-dom';
// Styles
import './LoginForm.css';

// Testing data
// user -> jijiji@jijiji.com
// passworf -> jijiji

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
  const [data, setData] = useState([]);
  const navigate = useHistory();

  const loginVerification = data => {
    if('error' in data) {
      console.log(`User not registered ->${data.error}`);
      return;
    }
    localStorage.setItem('token', data.data.token);
    console.log(`loggueado correctamente, con token -.${data.data.token}`);
    // no me reconoce a navigate como una fx......
    navigate('/');
  }

  //useEffect
  useEffect( () => {
      setValidEmail(emailValidator(values.email));
  }, [values]);

  const submitHandler = async e => {
    //Por alguna razón el primer submit me tira mal...
    e.preventDefault();
    try {
      const res = await Post('/login', values);
      setData(res.data);
      loginVerification(data);
    } catch (err) { 
      console.log(`Error en la comunicación al servidor -> ${err}`);
     }
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
