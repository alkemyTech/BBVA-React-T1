import React from "react";
import { useState } from "react";
import ContactForm from "./ContactForm";
import { Get } from "../../Services/privateApiService";

const Contact = () => {
  //   [contact, setContact] = useState({});

  const getContactData = async () => {
    const res = await Get("/organization");
    return res.data.data;
  };

  getContactData();
  return (
    <>
      <h1 className="contact-title">Contacto</h1>
      <div className="container-body-contact">
        <div className="contact-form">
          <ContactForm />
        </div>
        <div className="contact-data">
          <h2 className="subtitle-contact">
            Medios de e información de contacto
          </h2>
          <ul className="list-contact"></ul>
        </div>
      </div>
    </>
  );
};

export default Contact;
