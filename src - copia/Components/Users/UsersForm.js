import React, { useState } from 'react';
import '../FormStyles.css';

const UserForm = () => {
    const [initialValues, setInitialValues] = useState({
        name: '',
        email: '',
        roleId: ''
    })

    const handleChange = (e) => {
        if(e.target.name === 'name'){
            setInitialValues({...initialValues, name: e.target.value})
        } if(e.target.name === 'email'){
            setInitialValues({...initialValues, email: e.target.value})
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(initialValues);
    }

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <input className="input-field" type="text" name="name" value={initialValues.name || ''} onChange={handleChange} placeholder="Name"></input>
            <input className="input-field" type="text" name="email" value={initialValues.description || ''} onChange={handleChange} placeholder="Email"></input>
            <select className="input-field" value={initialValues.roleId || ''} onChange={e => setInitialValues({...initialValues, roleId: e.target.value})}>
                <option value="" disabled >Select the role</option>
                <option value="1">Admin</option>
                <option value="2">User</option>
            </select>
            <button className="submit-btn" type="submit">Send</button>
        </form>
    );
}
 
export default UserForm;