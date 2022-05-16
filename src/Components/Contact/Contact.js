import React from "react";
import { useState } from "react";
import ContactForm from "./ContactForm";
import { Get } from "../../Services/privateApiService";
// import {LinkedInIcon, FacebookIcon, InstagramIcon, TwitterIcon} from '@mui/icons-material';
import Avatar from "@mui/material/Avatar";
import { links } from "../Footer/Footer";

const Contact = () => {

  const getContactData = async () => {
    try {
      const res = await Get("/organization");
      return res.data.data;
    } catch (e) {
      return "Lo sentimos! No pudimos encontrar este elemento";
    }
  };

  const contact = getContactData();

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
          <ul className="list-contact">
            <li className="li-contact"></li>
            {links.map((socialLink, index) => (
              <li className="li-contact" key={index}>
                <a href={socialLink.href} rel="noreferrer" target="_blank">
                  <Avatar sx={{ bgcolor: "primary" }}>{socialLink.icon}</Avatar>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Contact;
