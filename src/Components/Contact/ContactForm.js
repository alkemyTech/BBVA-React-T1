import { useState } from 'react';
import { useHistory } from "react-router-dom";
import SnackBarMessage from '../Message/SnackBarMessage';
import '../ContactFormStyle.css'

const ContactForm = () => {

    // valida 0 y codigo de país opcional. codigo area obligatorio 
    const numberRegex = /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/;
    // RFC 5322 standard
    const mailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/

    const history = useHistory();

    const [initialValues, setInitialValues] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const [showMessage, setShowMessage] = useState({
        status: false,
        message: '',
        type: ''
    });

    const { status, message, type } = showMessage 

    const handleChange = (e) => {
        setInitialValues({...initialValues, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        
        e.preventDefault()
        
        if(e.target.name.value !== '' && e.target.email.value !== ''){
            if(numberRegex.test(e.target.phone.value) && mailRegex.test(e.target.email.value)){
                setInitialValues({name: '', email: '', phone: '', message: ''});
                setShowMessage({
                    status: true,
                    message: 'Mensaje enviado correctamente',
                    type: 'success'
                })
            }else{
                setShowMessage({
                    status: true,
                    message: 'Coloque un numero de contacto valido',
                    type: 'warning'
                })
            }
        }else{
            setShowMessage({
                status: true,
                message: 'Complete todos los campos',
                type: 'error'
            })
        }
    }

    const handleBtn = () => {
        history.push('/')
    }

    const handleClose = () => {
        setShowMessage({
            ...showMessage,
            status: false
        })
    }

    return (
        <>
            <section className="form-group">

                <form className="form-container" method='POST' onSubmit={handleSubmit}>
                    <div className="contribution">
                        <h2 className="contribution-title">¿Queres contribuir?</h2>
                        <button className="submit-btn" onClick={() => history.push('/donations')}>Contribuir</button>
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
            <SnackBarMessage estado={status} handleClose={handleClose} type={type} message={message}/>
        </>
    )
}

export default ContactForm;