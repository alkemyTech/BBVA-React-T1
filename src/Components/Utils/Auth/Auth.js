import { Redirect } from "react-router-dom/cjs/react-router-dom.min"
import { isloggedIn } from "../../../Services/privateApiService"

export const LogInTestOrReddirect = () => {
    return(
        <>
        {!isloggedIn() &&
        (<Redirect to="/login"/>)}
        </>
    )
}