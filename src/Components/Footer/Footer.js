

import {Link} from 'react-router-dom'
import {useState,useEffect } from 'react'

//Material UI
import Avatar from '@mui/material/Avatar';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { grey  } from '@mui/material/colors';
import { Get} from '../../Services/privateApiService';

//CSS
import './Footer.css'

const Footer = () => {
    const [logo, setLogo] = useState('')
    const [links, setLinks] = useState([{}])

    const getDataOrganization = () => {
        Get(process.env.REACT_APP_URL_BASE_ENDPOINT + process.env.REACT_APP_URL_ORGANIZATION_PATH + "/4")
        .then( (res) => {
            const info = res.data.data;
            setLogo(info.logo)
            setLinks([
                {  
                    href:info.facebook_url,
                    icon: <FacebookIcon/>,
                },
                {
                    href:info.linkedin_url,
                    icon: <LinkedInIcon/>,
                },
                {
                    href:info.instagram_url,
                    icon: <InstagramIcon/>,
                },
                {
                    href:info.twitter_url,
                    icon: <TwitterIcon/>,
                },
            ])
        })
    }

    useEffect(() => {
        getDataOrganization()
    }, []);
    
    return(
        <footer className ="footer-front" >
            <div>
                <div className="logo-container">
                    <img className="img-logo-footer" src={logo} alt="img-logo"/>
                    <hr className = "hr-logo"/>
                </div>
                <nav className="nav-footer">
                    <ul className="ul-roots">
                        <li className ="li-roots"><Link className ="a-roots" to="/"> Inicio</Link></li>
                        <li className ="li-roots"><Link className ="a-roots" to="/us">Nosotros </Link></li>
                        <li className ="li-roots"><Link className ="a-roots" to="/news">Novedades</Link></li>
                        <li className ="li-roots"><Link className ="a-roots" to="/testimonials">Testimonios</Link></li>
                        <li className ="li-roots"><Link className ="a-roots"to="/contact-form">Contacto</Link></li>
                        <li className ="li-roots"><Link className ="a-roots" to="/donations">Contribuye</Link></li>
                    </ul>
                    <hr className= "hr-nav"/>
                    <ul className="ul-socials">
                        {links.map((socialLink, index) =>
                            <li className ="li-socials" key={index}>
                                <a href={socialLink.href}  target="_blank" rel="noopener noreferrer">
                                        <Avatar sx={{ bgcolor: grey[900] }}>
                                            {socialLink.icon}
                                        </Avatar>
                                </a>
                            </li>
                        )}
                    </ul>
                </nav>

                <span>
                    2022 by Alkemy. All Rights Reserved.
                </span>

            </div>
        </footer>
    )
}

export default Footer

