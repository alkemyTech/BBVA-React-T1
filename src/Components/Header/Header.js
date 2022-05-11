import React, { useState } from "react";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import "./Header.css";

function Header() {
  const navMenu = [
    { name: "Inicio", link: "/", requiresLogIn: false },
    { name: "Nosotros", link: "/nosotros", requiresLogIn: false },
    { name: "Contacto", link: "/contacto", requiresLogIn: false },
    { name: "School", link: "/school-campaign", requiresLogIn: false },
    { name: "Toys", link: "/toys-campaign", requiresLogIn: false },
  ];

  //Hamburguer menu
  const [navbarOpen, setNavbarOpen] = useState(false);
  const handleToggle = () => {
    setNavbarOpen(!navbarOpen);
  };

  //Validate if the user has token in localStorage
  let isLoggedIn = false;
  !localStorage.getItem("token") === null ||
  !localStorage.getItem("token") === undefined
    ? (isLoggedIn = true)
    : (isLoggedIn = false);

  return (
    <div className="header">
      <Router>
        <div className="header_contents">
          <img
            className="header_logo"
            src="/images/assets/logo.png"
            alt="logo"
          />
          <button onClick={handleToggle} className="toggle-button">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
          <div className="nav_links">
            <ul className="header_list">
              {navMenu.map(
                (item) =>
                  (isLoggedIn || (!isLoggedIn && !item.requiresLogIn)) && (
                    <li className={`nav_item ${navbarOpen && "showMenu"}`}>
                      <NavLink
                        className={(navData) =>
                          navData.isActive ? "active" : "link"
                        }
                        to={item.link}
                      >
                        {item.name}
                      </NavLink>
                    </li>
                  )
              )}
            </ul>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default Header;
