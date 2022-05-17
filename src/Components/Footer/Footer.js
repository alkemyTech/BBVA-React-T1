

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


const links = [
    {
      href:'https://www.facebook.com/profile.php?id=100077792335889',
      icon: <FacebookIcon/>,
    },
    {
      href:'https://www.linkedin.com/in/somos-mas-ong-80595b236/',
      icon: <LinkedInIcon/>,
    },
    {
      href:'https://www.instagram.com/somos.mas.ong/',
      icon: <InstagramIcon/>,
    },
    {
      href:'https://www.twitter.com/somosmas',
      icon: <TwitterIcon/>,
    },
  ];


const Footer = () => {
    const [logo, setLogo] = useState('')

    const getDataOrganization = () => {
        Get(process.env.REACT_APP_URL_BASE_ENDPOINT + process.env.REACT_APP_URL_ORGANIZATION_PATH + "/4")
        .then( (res) => {
            setLogo(res.data.data.logo)
            console.log(res.data.data.logo)
        })
    }

    useEffect(() => {
        getDataOrganization()
    }, []);

    
    return(
        <footer className ="footer-front" >
            <div>
                <div className="logo-container">
                    <img className="img-logo" src={logo} alt="img-logo"/>
                    <hr className = "hr-logo"/>
                </div>
                <nav className="nav-footer">
                    <ul className="ul-roots">
                        <li className ="li-roots"><Link className ="a-roots" to="/inicio"> Inicio</Link></li>
                        <li className ="li-roots"><Link className ="a-roots" to="/nosotros">Nosotos </Link></li>
                        <li className ="li-roots"><Link className ="a-roots" to="/news">Novedades</Link></li>
                        <li className ="li-roots"><Link className ="a-roots" to="/testimonials">Testimonios</Link></li>
                        <li className ="li-roots"><Link className ="a-roots"to="/contact">Contacto</Link></li>
                        <li className ="li-roots"><Link className ="a-roots" to="/contact">Contribuye</Link></li>
                    </ul>
                    <hr className= "hr-nav"/>
                    <ul className="ul-socials">
                        {links.map((socialLink, index) =>
                            <li className ="li-socials" key={index}>
                                <a href={socialLink.href} rel="noreferrer" target="_blank">
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

