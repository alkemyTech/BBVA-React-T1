import React, { useState } from 'react';
import '../FormStyles.css';

const RegisterForm = () => {
    const [initialValues, setInitialValues] = useState({
        name: '',
        lastName: ''
    })
    
    const handleChange = (e) => {
        if(e.target.name === 'name'){
            setInitialValues({...initialValues, name: e.target.value})
        } if(e.target.name === 'lastName'){
            setInitialValues({...initialValues, lastName: e.target.value})
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(initialValues);
        localStorage.setItem('token', 'tokenValueExample')
    }

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <input className="input-field" type="text" name="name" value={initialValues.name} onChange={handleChange} placeholder="Enter name"></input>
            <input className="input-field" type="text" name="lastName" value={initialValues.lastName} onChange={handleChange} placeholder="Enter last name"></input>
            <button className="submit-btn" type="submit">Register</button>
        </form>
    );
}
 
export default RegisterForm;