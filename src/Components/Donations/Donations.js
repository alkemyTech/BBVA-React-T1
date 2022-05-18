/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useState } from 'react'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {useHistory, Link} from "react-router-dom"
import { Snackbar , Alert } from '@mui/material';
import "./Donations.css"

const Donations = () =>{
    const [open, setOpen] = React.useState(false);
    
    const handleOpen = () => {
        if(formValidator()){
            setOpen(true)
        }   
    };
    const handleClose = () => {
        setOpen(false)
        navegar()    
    }

    const history = useHistory();

    const [snack, setSnack] = useState({
        open: false,
        message: "",
        severity: "error",
    })

    const showSnack = (text, type) =>{
        setSnack({...snack, 
            message: text,
            open: true,
            severity: type,
        })
    }
    
    const onCloseSnack = () =>{
        setSnack({...snack, open:false})
    }
    
    const [initialValues, setInitialValues] = useState({
        name: '',
        mail: '',
    });

    const navegar =() =>{
        showSnack("Donación exitosa", "success")
        setTimeout(function(){
            history.push("/activities");
        }, 4200);
    }

    const handleChange = (e) => {
        setInitialValues({...initialValues, [e.target.name]: e.target.value})
    }

    const formValidator= () =>{
        const emailRegexp = new RegExp(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/);
        let formOk = false;
        if(initialValues.name.length < 4){
            showSnack("El nombre debe contener al menos 4 letras","error")
        }else if(!emailRegexp.test(initialValues.mail)){
            showSnack("El formato de mail es incorrecto", "error")
        }else{
            formOk = true;
        }
        return formOk
}

    const handleSubmit = (e) => {
        e.preventDefault();
        if(formValidator()){
           /* history.push("/activities")  */
            console.log("Hola")
        }

    }

    return(
        <div className="donation-container">
        <h1>Ayuda a la Ong</h1>
        <p> Tu gesto solidario se transforma en proyectos y esperanza</p>
        <form className="donations-form "onSubmit={handleSubmit}>
            <div>
                <h3>Donante:</h3>
                <input type="text" placeholder="nombre y apellido" name="name" value={initialValues.name} onChange={handleChange}></input>
                <h3>Mail:</h3>
                <input type="text" placeholder="dirección mail" name="mail" value={initialValues.mail} onChange={handleChange}></input>
                <div className="btn-container">
                    <Button className="btn-donaciones" onClick={handleOpen} variant="contained">Donar</Button>
                </div>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                className= "modal"
            >
                <Box className="box"  >
                    <div className="iframe-container">
                        <iframe className="iframe" src="https://mpago.la/2ty3Ffo"></iframe>
                    </div>
                
                </Box>
            </Modal>
        </form>

        <Snackbar
                open={snack.open}
                severity={snack.severity}
                autoHideDuration={4000}
                onClose={onCloseSnack}>
                <Alert onClose={onCloseSnack} severity={snack.severity} sx={{ width: '100%' }}>
                    {snack.message}
                </Alert>
        </Snackbar>
        </div>
    )
}

export default Donations;