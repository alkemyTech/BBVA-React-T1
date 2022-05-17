import React, { useState, useEffect } from "react";
import "../FormStyles.css";
import { useHistory } from "react-router-dom";

const LoginForm = () => {
  const [initialValues, setInitialValues] = useState({
    email: "",
    password: "",
  });

  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      history.push("/");
    }
  }, []);

  const handleChange = (e) => {
    setInitialValues({ ...initialValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("token", "tokenValueExample");
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <input
        className="input-field"
        type="text"
        name="email"
        value={initialValues.name}
        onChange={handleChange}
        placeholder="Enter email"
      ></input>
      <input
        className="input-field"
        type="text"
        name="password"
        value={initialValues.password}
        onChange={handleChange}
        placeholder="Enter password"
      ></input>
      <button className="submit-btn" type="submit">
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
