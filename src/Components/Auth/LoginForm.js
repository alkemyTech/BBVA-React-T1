
import React, {useEffect, useState} from 'react';
import { FormControl, FormHelperText, TextField, Button, CssBaseline, StyledEngineProvider, Link, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { Post } from '../../Services/publicApiService';
import { useHistory, Redirect } from 'react-router-dom';

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

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const LoginForm = () => {
  //States
  const [values, setValues] = useState({email: '', password:''});
  const [validEmail, setValidEmail] = useState(false);
  const [alertState, setAlertState] = useState({
    isOpen: false,
    severity: 'error',
    message: ''
  });
  const navigate = useHistory();
  //useEffect
  useEffect( () => {
      setValidEmail(emailValidator(values.email));
  }, [values]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await Post(`${process.env.REACT_APP_URL_BASE_ENDPOINT}/login`,values );
      const data = await res.data;
      console.log(res);
      if ("error" in data) {
        setAlertState({
          isOpen: true,
          message: "Usuario no registrado",
          severity: "error",
        });
        return;
      }
      localStorage.setItem("token", data.data.token);
      setAlertState({
        isOpen: true,
        message: "Usuario loggeado correctamente",
        severity: "success",
      });
      navigate.push("/");
    } catch (err) {
      return err;
    }
  };

  const handleClose = (event, reason) => { setAlertState({ ...alertState, isOpen: false }); };

  const handleChange = e => { setValues({ ...values, [e.target.name]: e.target.value }); }
  return (
    <>
      {/* {(localStorage.getItem('token') != null)? <Redirect to='/' /> : ''} */}
      <StyledEngineProvider injectFirst>
        <CssBaseline />
        <div className="login-container">
          <div className="container-form form-login m-0 p-0 ">
            <form className="form" action="" onSubmit={submitHandler}>
              <FormControl>
                <span>Bienvendio</span>
                <h2>Inicia sesion en tu cuenta!</h2>
                <TextField
                  required
                  className="inputer"
                  id="emailId"
                  name="email"
                  type="email"
                  label="Email"
                  value={values.email}
                  onChange={handleChange}
                  helperText={!validEmail ? "Formato incorrecto" : ""}
                  error={!validEmail}
                />
                <TextField
                  requiredNavigate
                  type="password"
                  label="Password"
                  value={values.password}
                  onChange={handleChange}
                />
                <Button
                  className="login-button"
                  type="submit"
                  disabled={!validEmail}
                >
                  Iniciar Sesión
                </Button>
              </FormControl>
            </form>
            <p className="register-text">
              No tienes una cuenta?{" "}
              <Link className="register-link" to="/register">
                <b>Registrate</b>
              </Link>
            </p>
          </div>
          <div className="img-container ">
            <img
              className="side-img"
              alt="img-login"
              src={`${process.env.PUBLIC_URL}/images/login.jpg`}
            />
          </div>
        </div>
          <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            open={alertState.isOpen}
            onClose={handleClose}
            autoHideDuration={4000}
            key={'bottom' + 'left'} 
          >
            <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity={alertState.severity}>{alertState.message}</MuiAlert>
          </Snackbar>
      </StyledEngineProvider>
    </>
  );
}

export default LoginForm;
