import { useState } from 'react'
import '../../Components/FormStyles.css';

const ContactForm = () => {

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

    }

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <input className="input-field" type="text" name="name" value={initialValues.name} onChange={handleChange} placeholder="Name"></input>
            <input className="input-field" type="email" name="email" value = {initialValues.email || ''} onChange={handleChange}></input>
            <input className="input-field" type="number" name="phone" value = {initialValues.phone || ''} onChange={handleChange} min = "8"></input>
            <input className="input-field" type="text" name="message" value = {initialValues.message || ''} onChange={handleChange}></input>
        </form>
    )
}

export default ContactForm;