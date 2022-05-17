import { useSelector } from "react-redux";

const AUTHENTICATED = "loggedIn";
const LOGOUT = "loggedOut";


export const initialStateAuth = () => {
   return { 
    user : {
        email: null,
        token: null,
        nombre: null,
    }
}
}




export const LogIn = ({email,name,token}) => {
    //useReducer

}

export const RegisterUser = ({email,name,token}) => {

}

export const LogOut = () =>{

}

export const isLogged = () =>{
    //const result: any = useSelector(selector: Function, equalityFn?: Function)

    
}

export const GetUserData = () => {
    return useSelector(state => state.user)
}

const AuthReducer = () =>
{

    return( 
        <>
        {"data:"+GetUserData()}
        </>
    )
}
export default  AuthReducer