import axios from "axios";
import { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'
import { AiOutlineClose } from 'react-icons/ai'
import { SidebarData } from "./Sidebar";
import './BackofficeHeader.css'



const BackofficeHeader = () => {

    const [logo, setLogo] = useState('')
    useEffect (() => {
        axios.get('https://ongapi.alkemy.org/api/organization/1')
        .then( (res) => {
            setLogo(res.data.data.logo)
        })
    })

    const [sidebar, setSidebar] = useState(false)

    const showSidebar = () => setSidebar(!sidebar)

    return (
        <>
            <div className="navbar">
                <img className="img-logo" src={logo} alt="img-logo"/>
                <Link to='#' className='menu-bars'>
                    <FaBars onClick={showSidebar} />
                </Link>
            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className="nav-menu-items" onClick={showSidebar}>
                    <li className='navbar-toggle'>
                        <Link to='#' className='menu-bars'>
                            <AiOutlineClose/>
                        </Link>
                    </li>
                    {SidebarData.map((item, index) =>{
                        return (
                            <li key={index} className={item.cName}>
                                <Link to={item.path}>
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </>
    )
};



export default BackofficeHeader;