import React from "react";
import { useState } from "react";
import ContactForm from "./ContactForm";
import {getToken} from "../../Services/privateApiService";
import "./Contact.css";
import Avatar from "@mui/material/Avatar";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { grey } from "@mui/material/colors";
import { useHistory } from "react-router-dom";

const Contact = () => {

  const token = getToken()
  const history = useHistory();

  const info = [
    {
      href: "https://www.facebook.com/profile.php?id=100077792335889",
      icon: <FacebookIcon />,
      text: "Facebook",
    },
    {
      href: "https://www.linkedin.com/in/somos-mas-ong-80595b236/",
      icon: <LinkedInIcon />,
      text: "LinkedIn",
    },
    {
      href: "https://www.instagram.com/somos.mas.ong/",
      icon: <InstagramIcon />,
      text: "Instagram",
    },
    {
      href: "https://www.twitter.com/somosmas",
      icon: <TwitterIcon />,
      text: "Twitter",
    },
  ];

  return (
    <>
    { token ? (history.push('/')) :
      <div>
        <h1 className="contact-title">Contacto</h1>
        <div className="container-body-contact">
          <div className="contact-form">
            <ContactForm />
          </div>
          <div className="contact-data">
            <h2 className="subtitle-contact">Medios de contacto </h2>
            <ul className="list-contact">
              {info.map((infoLi, index) => (
                <li className="li-contact" key={index}>
                  <a
                    className="contact-link"
                    href={infoLi.href}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <Avatar sx={{ bgcolor: grey[900] }} className="contact-icon">
                      {infoLi.icon}
                    </Avatar>
                    {infoLi.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      }
    </>
  );
};

export default Contact;
