import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import "./Header.css";

function Header() {
  const navMenu = [
    {

      name: "Inicio",
      link: "/",
      requiresLogIn: false,
      className: "button-nav",
    },
    {
      name: "Nosotros",
      link: "/us",
      requiresLogIn: false,
      className: "button-nav",
    },
    {
      name: "Contacto",
      link: "/contact-form",
      requiresLogIn: false,
      className: "button-nav",
    },
    {
      name: "Novedades",
      link: "/news",
      requiresLogIn: false,
      className: "button-nav",
    },
    {
      name: "Testimonios",
      link: "/testimonials",
      className: "button-nav",
      requiresLogIn: false,
    },
    {
      name: "Actividades",
      link: "/activities",
      requiresLogIn: false,
      className: "button-nav",
    },
    {
      name: "Cerrar Sesión",
      link: "/",
      requiresLogIn: true,
      className: "button-auth",
      handleAuth: true,
    },
    {
      name: "Login",
      link: "/login",
      requiresLogIn: false,
      className: "button-auth",
      notForLoggedIn: true,
    },
    {
      name: "Registro",
      link: "/register",
      requiresLogIn: false,
      className: "button-auth",
      notForLoggedIn: true,
    },
  ];

  //Hamburguer menu
  const [navbarOpen, setNavbarOpen] = useState(false);
  const handleToggle = () => {
    setNavbarOpen(!navbarOpen);
  };

  //Validate if the user has token in localStorage
  let isLoggedIn = false;
  localStorage.getItem("token") ? (isLoggedIn = true) : (isLoggedIn = false);

  return (
    <div className="header">
      <div className="header_contents">
        <Link to="/">
          <img
            className="header_logo"
            src="http:\/\/ongapi.alkemy.org\/storage\/Ibh6Ggxr26.png"
            alt="logo"
          />
        </Link>
        <button onClick={handleToggle} className="toggle-button">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
        <div className="nav_links">
          <ul className="header_list">
            {navMenu.map(
              (item) =>
                ((isLoggedIn && !item.notForLoggedIn) ||
                  (!isLoggedIn && !item.requiresLogIn)) && (
                  <li className={`nav_item ${navbarOpen && "showMenu"}`}>
                    <button
                      onClick={() =>
                        item.handleAuth ? localStorage.removeItem("token") : ""
                      }
                      className="button-clear"
                    <NavLink
                      key={item.name}
                      className={`${item.className} ${(navData) =>
                        navData.isActive ? "active" : "link"}`}
                      to={item.link}
                    >
                        {item.name}
                      </NavLink>
                    </button>
                  </li>
                )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
