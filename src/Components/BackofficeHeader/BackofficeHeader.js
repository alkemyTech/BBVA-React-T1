import axios from "axios";
import { useState, useEffect } from "react"
import { Link } from 'react-router-dom'

import { FaBars } from 'react-icons/fa'
import { AiOutlineClose } from 'react-icons/ai'
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
                    <FaBars/>
                </Link>
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className="nav-menu-items">
                        <li className='navbar-toggle'>
                            <Link to='#' className='menu-bars'>
                                <AiOutlineClose/>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    )
};



export default BackofficeHeader;