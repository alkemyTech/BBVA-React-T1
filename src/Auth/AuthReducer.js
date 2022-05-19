import { useSelector } from "react-redux";
import React from 'react';

export const AuthGlobalContext = React.createContext();



export const initialStateAuth =  {
    user : {
        email: null,
        token: null,
        name: null,
        autenticated: false,
    }
}

/*
* action -> {type:"LOGOUT||LOGIN" , data: {email:"",name:"",token:""}}
*
*/
const AuthReducer = (state , action) =>
{
    switch(action.type){
        case "LOGOUT":
            return initialStateAuth;
        case "LOGIN":
            return {...state , user: action.data,autenticated:true}
        case "REGISTRO":
            return {...state , user: action.data,autenticated:true}
        default:
            throw new Error("No existe la accion solicitada del AuthReducer");
    }
}


export const AuthContext = ({children}) =>{
    const [ authStatus, authDispacher ] = React.useReducer ( AuthReducer , initialStateAuth )
    return (
      <AuthGlobalContext.Provider
        value={{
          ...authStatus,
          authDispacher,
        }}
      >
        {children}
      </AuthGlobalContext.Provider>
    );
}
/*pese que no es necesario la desestructuracion de los datos 
* se hace para dejar en claro que datos se deben pasar
*/
/*EJEMPLOS PARA LOGIN LOGOUT AND GET USER DATA PARA QUIEN VE POR PRIMERA VEZ ESTO

export const LogInRedux = ({email,name,token}) => { 

    const { user, authDispacher } = React.useContext(AuthGlobalContext);
    authDispacher( { type: "LOGIN" , data: {email: email, name: name, token: token}} )
}

export const LogOutRedux = () => {
    const { user, authDispacher } = React.useContext(AuthGlobalContext);
    authDispacher( { type: "LOGOUT" } )
}

export const GetUserData = () => {
    const { user, authDispacher } = React.useContext(AuthGlobalContext);
    return user;
}

*/
export default  AuthReducer