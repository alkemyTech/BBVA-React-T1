import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { SidebarData } from "./Sidebar";
import { IconContext } from "react-icons";
import { Get } from "../../Services/publicApiService";

import "./BackofficeHeader.css";

const BackofficeHeader = () => {
  const [logo, setLogo] = useState("");

  const getOrganizationData = async () => {
    const res = await Get(
      process.env.REACT_APP_URL_BASE_ENDPOINT +
        process.env.REACT_APP_URL_ORGANIZATION_PATH +
        "/" +
        1
    );
    setLogo(res.data.data.logo);
  };

  useEffect(() => {
    getOrganizationData();
  }, []);

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

 
    return (
      <>
        <div className="navbar">
          <Link to="/backoffice/">
            <img className="img-logo" src={logo} alt="img-logo" />
          </Link>
          <IconContext.Provider value={{ color: "#c40404" }}>
            <Link to="#" className="menu-bars">
              <FaBars onClick={showSidebar} />
            </Link>
          </IconContext.Provider>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <IconContext.Provider value={{ color: "#FFFFFF" }}>
                <Link to="#" className="menu-bars">
                  <AiOutlineClose />
                </Link>
              </IconContext.Provider>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link className="route" to={item.path}>
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </>
    );
};

export default BackofficeHeader;
