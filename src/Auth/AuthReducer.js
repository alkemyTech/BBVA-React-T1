import { useSelector } from "react-redux";

const AUTHENTICATED = "loggedIn";
const LOGOUT = "loggedOut";


export const initialStateAuth =  {
    user : {
        email: null,
        token: null,
        name: null,
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
            return {user: { email: action.data.email, name: action.data.name, token: action.data.token}}
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


export default  AuthReducer