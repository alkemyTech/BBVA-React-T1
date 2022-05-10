import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
import '../../Components/FormStyles.css';

const ContactForm = () => {

    const numberRegex = /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/;


    // const navigate = useNavigate();

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
    }



    // const handleBtn = () => {
    //     history.go(-1);
    // }

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <input className="input-field" type="text" name="name" value={initialValues.name} onChange={handleChange} placeholder="Name"></input>
            <input className="input-field" type="email" name="email" value = {initialValues.email || ''} onChange={handleChange} placeholder="Email"></input>
            <input className="input-field" type="number" name="phone" value = {initialValues.phone || ''} onChange={handleChange} pattern={numberRegex} placeholder="Telefono de contacto"></input>
            <textarea className="input-field" type="text" name="message" value = {initialValues.message || ''} onChange={handleChange} placeholder = "Escriba su mensaje"></textarea>
            <button className="submit-btn" type="submit">Enviar consulta</button>
            {/* <button className="btn" onclick="handleBtn()">Volver a inicio</button> */}
        </form>
    )
}

export default ContactForm;