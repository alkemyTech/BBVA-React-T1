import React, { useState } from 'react';
import '../FormStyles.css';

const MembersForm = () => {
  const [initialValues, setInitialValues] = useState({
    name: '',
    description: ''
  })

  const handleChange = (e) => {
    if(e.target.name === 'name'){
      setInitialValues({...initialValues, name: e.target.value})
    } if(e.target.name === 'description'){
      setInitialValues({...initialValues, description: e.target.value})
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(initialValues);
  }

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <input className="input-field" type="text" name="name" value={initialValues.name} onChange={handleChange} placeholder="Name"></input>
      <input className="input-field" type="text" name="description" value={initialValues.description} onChange={handleChange} placeholder="Write some description"></input>
      <button className="submit-btn" type="submit">Send</button>
    </form>
  );
}
 
export default MembersForm;