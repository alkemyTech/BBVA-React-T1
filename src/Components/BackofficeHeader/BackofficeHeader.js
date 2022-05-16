import { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'
import { AiOutlineClose } from 'react-icons/ai'
import { SidebarData } from "./Sidebar"
import { IconContext } from 'react-icons'
import { Get } from '../../Services/publicApiService'

import './BackofficeHeader.css'


const BackofficeHeader = () => {
    
    const [logo, setLogo] = useState('')
    
    useEffect ( () => {
        const res = Get('/organization', 1)
        res.then( res => setLogo(res.data.data.logo))
    }, [])

    const [sidebar, setSidebar] = useState(false)

    const showSidebar = () => setSidebar(!sidebar)

    return (
        <>
            <div className="navbar">
                <img className="img-logo" src={logo} alt="img-logo"/>
                <IconContext.Provider value={{color: '#c40404'}}>
                    <Link to='#' className='menu-bars'>
                        <FaBars onClick={showSidebar} />
                    </Link>
                </IconContext.Provider>
            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className="nav-menu-items" onClick={showSidebar}>
                    <li className='navbar-toggle'>
                        <IconContext.Provider value={{color: '#FFFFFF'}}>
                            <Link to='#' className='menu-bars'>
                                <AiOutlineClose/>
                            </Link>
                        </IconContext.Provider>

                    </li>
                    {SidebarData.map((item, index) =>{
                        return (
                            <li key={index} className={item.cName}>
                                <Link className="route" to={item.path}>
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