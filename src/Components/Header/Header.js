import React, { useState } from "react";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import "./Header.css";

function Header() {
    const navMenu = [
        { name: "Inicio", link: "/", requiresLogIn: false },
        { name: "Nosotros", link: "/nosotros", requiresLogIn: false },
        { name: "Contacto", link: "/contacto", requiresLogIn: false },
        { name: "School", link: "/school", requiresLogIn: false },
        { name: "Toys", link: "/toys", requiresLogIn: false }
      ];    
    
    return (
        <div className="header">
          <Router>
            <div className="header_contents">
              <img
                className="header_logo"
                src="/images/assets/logo.png"
                alt="logo"
              />
              <div className="nav_links">
                <ul className="header_list">
                  {navMenu.map(
                    (item) =>
                        <li className={`nav_item`}>
                          <NavLink
                            className={(navData) =>
                              navData.isActive ? "active" : "link"
                            }
                            to={item.link}
                          >
                            {item.name}
                          </NavLink>
                        </li>
                      
                  )}
                </ul>
              </div>
            </div>
          </Router>
        </div>
      );
    }