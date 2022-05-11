import React, {useEffect} from 'react';
import { FormControl } from '@mui/material';

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
    <div className="form-login">
      <div className='form-container form-login'>
        <h2>FORM</h2>
      </div>
      <div className='img-container'>
        <h2>IMG</h2>
      </div>
    </div>
    </>
  );
}

export default LoginForm;
