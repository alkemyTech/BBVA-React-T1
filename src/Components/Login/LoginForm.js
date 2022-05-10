import React, {useEffect} from 'react';
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
*   - Utilizar formik para validar los campos. Al no disponer aún del servicio de peticiones HTTP, solamente almacenar los campos completados en un objeto (para posteriormente enviarlo).
*   - El email debe tener un formato adecuado.
*/




const LoginForm = () => {
  
  return (
    <>
    <div className="form-login">
      <h2>LOGIN FORM</h2>
    </div>
    </>
  );
}

export default LoginForm;
