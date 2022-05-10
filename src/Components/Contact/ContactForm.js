import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import '../../Components/FormStyles.css';

const ContactForm = () => {

    // valida 0 y codigo de país opcional. codigo area obligatorio 

    const numberRegex = /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/;

    let history = useHistory();

    const [initialValues, setInitialValues] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleChange = (e) => {
        if(e.target.name === 'name') {
            setInitialValues({...initialValues,name: e.target.value});
        }if(e.target.name === 'email') {
            setInitialValues({...initialValues,email: e.target.value});
        }if(e.target.name === 'phone') {
            setInitialValues({...initialValues,phone: e.target.value});
        }if(e.target.name === 'message') {
            setInitialValues({...initialValues,message: e.target.value});
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const phone = e.target.phone.value;
        
        if(name !== '' && email !== ''){
            if(numberRegex.test(phone)){
                console.log('Se envio correctamente')
            }else{
                console.log('Ingrese un numero valido')
            }

        } else{
            console.log('Los datos ingresados son invalidos')
        }
    }

    const handleBtn = () => {
        console.log('holaa');
        history.push('/')
    }

    return (
        <>
            <section>
                <h2>¿Queres contribuir?</h2>
                <button>Contribuir</button>
                <h2>¡Contactate con nosotros!</h2>
                <form className="form-container" onSubmit={handleSubmit}>
                    <input className="input-field" type="text" name="name" value={initialValues.name} onChange={handleChange} placeholder="Name" required></input>
                    <input className="input-field" type="email" name="email" value = {initialValues.email || ''} onChange={handleChange} placeholder="Email" required></input>
                    <input className="input-field" type="number" name="phone" value = {initialValues.phone || ''} onChange={handleChange} pattern={numberRegex} placeholder="Telefono de contacto" required></input>
                    <textarea className="input-field" type="text" name="message" value = {initialValues.message || ''} onChange={handleChange} placeholder = "Escriba su mensaje" required></textarea>
                    <button className="submit-btn" type="submit">Enviar consulta</button>
                </form>
                <button className="submit-btn" onClick={handleBtn} required>Volver a inicio</button>
            </section>
        </>
    )
}

export default ContactForm;