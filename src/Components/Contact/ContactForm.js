import { useState } from 'react';
import { useHistory } from "react-router-dom";
import '../ContactFormStyle.css'

const ContactForm = () => {

    // valida 0 y codigo de país opcional. codigo area obligatorio 
    const numberRegex = /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/;
    // RFC 5322 standard
    const mailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/

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
        
        console.log(e.target)
        e.preventDefault()

        let name = e.target.name.value;
        let email = e.target.email.value;
        let phone = e.target.phone.value;
        
        if(name !== '' && email !== ''){
            if(numberRegex.test(phone) && mailRegex.test(email)){
                console.log('Formulario enviado')
                setInitialValues({name: '', email: '', phone: '', message: ''});
            } else{
                console.log('Ingrese un numero valido')
            }

        } else{
            console.log('Los datos ingresados son invalidos')
        }
    }

    const handleBtn = () => {
        history.push('/')
    }

    return (
        <>
            <section className="form-group">

                <form className="form-container" method='POST' onSubmit={handleSubmit}>
                    <div className="contribution">
                        <h2 className="contribution-title">¿Queres contribuir?</h2>
                        <button className="submit-btn">Contribuir</button>
                    </div>

                    <h2 className="contact-us">¡Contactate con nosotros!</h2>

                    <input className="input-field" type="text" name="name" value={initialValues.name || ''} onChange={handleChange} placeholder="Nombre y apellido" required></input>
                    <input className="input-field" type="email" name="email" value = {initialValues.email || ''} onChange={handleChange} placeholder="Email" required></input>
                    <input className="input-field" type="tel" name="phone" value = {initialValues.phone || ''} onChange={handleChange}  placeholder="Telefono de contacto" required></input>
                    <textarea className="message-field" type="text" name="message" value = {initialValues.message || ''} onChange={handleChange} placeholder = "Escriba su mensaje" required></textarea>

                    <button className="submit-btn-form" type="submit">Enviar consulta</button>

                    <button className="functional-btn" onClick={handleBtn} required>Volver a inicio</button>
                </form>

            </section>
        </>
    )
}

export default ContactForm;