import "./Donations.css"
import { useLocation, Link } from "react-router-dom";
import Button from '@mui/material/Button';

const Gracias = () =>{
    const location = useLocation();
    return(
        <div className="donation-container gracias-container">
            <h1 className="h1-donations">Muchas gracias por tu Donación <span className="span-gracias">{location.state.sendName}</span></h1>
            <p className="p-donations">Enviamos un mail de confirmación a : <span className="span-gracias">{location.state.sendMail}</span></p>
            <img className="img-gracias" src="./images/login.png" alt="gracias"/>
            <Link className="link-gracias"to = "/"><Button className="btn-gracias"variant="contained">Inicio</Button></Link>
        </div>
    )
}

export default Gracias;