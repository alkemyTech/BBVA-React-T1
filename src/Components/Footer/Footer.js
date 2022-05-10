import axios from 'axios';

import {Link} from 'react-router-dom'
import {useState,useEffect } from 'react'

import Avatar from '@mui/material/Avatar';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { grey  } from '@mui/material/colors';

import './Footer.css'


const links = [
    {
      href:'https://www.facebook.com/Somos_Más',
      component: <FacebookIcon/>,
    },
    {
      href:'https://www.instagram.com/SomosMás',
      component: <LinkedInIcon/>,
    },
    {
      href:'https://www.linkedin.com/company/somosmas',
      component: <InstagramIcon/>,
    },
    {
      href:'https://www.twitter.com/somosmas',
      component: <TwitterIcon/>,
    },
  ];

  const ButtonContact = ({ href, logo}) => {
    return (
      <a href={href} rel="noreferrer" target="_blank">
        <Avatar sx={{ bgcolor: grey[900] }}>
            {logo}
        </Avatar>
      </a>
    );
  };

const Footer = () => {

    const [logo, setLogo] = useState('')

    useEffect( () => {
        axios.get('https://ongapi.alkemy.org/api/organization')
        .then( (res) => {
            setLogo(res.data.data.logo)
        })
        .catch( (err) => {
            console.log(err);
        })
    }, [])

    
    return(
        <footer>
            <div>
                <div className="logo-container">
                    <img src={logo} alt="logo footer" />
                    <hr/>
                </div>
                <nav className="nav-footer">
                    <ul className="ul-roots">
                        <li><Link to="/inicio"> Inicio</Link></li>
                        <li><Link to="/nosotros">Nosotos </Link></li>
                        <li><Link to="/novedades">Novedades</Link></li>
                        <li><Link to="/testimonios">Testimonios</Link></li>
                        <li><Link to="/contacto">Contacto</Link></li>
                        <li><Link to="/contacto">Contribuye</Link></li>
                    </ul>
                    <hr/>
                    <ul className="ul-socials">
                        {links.map((socialLink, index) =>
                            <li key={index}>
                                <ButtonContact 
                                    href={socialLink.href}
                                    logo={socialLink.component} 
                                />
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