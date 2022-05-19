import "./Donations.css"
import '../FormStyles.css';
import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {useHistory} from "react-router-dom"
import { Snackbar , Alert } from '@mui/material';

const Donations = () =>{
    const [open, setOpen] = useState(false);
    const [snack, setSnack] = useState({
        open: false,
        message: "",
        severity: "error",
    })
    const [initialValues, setInitialValues] = useState({
        name: '',
        mail: '',
    });
    const history = useHistory();

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
    
    const handleOpen = () => {
        if(formValidator()){
            setOpen(true)
        }   
    };
    
    const handleClose = () => {
        setOpen(false)
        showSnack("Donación exitosa", "success")
        setTimeout(()=>{
            history.push("/thanks", {sendName:initialValues.name , sendMail: initialValues.mail } );
        }, 3000)   
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


    return(
        <div className="donation-container">
        <h1 className="h1-donations">Ayuda a la Ong</h1>
        <p className="p-donations"> Tu gesto solidario se transforma en proyectos y esperanza</p>
        <form className="donations-form">
            <div>
                <h3 className="h3-donations">Donante:</h3>
                <input className="input-donations" type="text" placeholder="nombre y apellido" name="name" value={initialValues.name} onChange={handleChange}></input>
                <h3 className="h3-donations">Mail:</h3>
                <input className="input-donations" type="text" placeholder="dirección mail" name="mail" value={initialValues.mail} onChange={handleChange}></input>
                <div className="btn-container-donations">
                    <Button className="btn-donaciones" onClick={handleOpen} variant="contained">Donar</Button>
                </div>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                className= "modal">
                <Box className="box">
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