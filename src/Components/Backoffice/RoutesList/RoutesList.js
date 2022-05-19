import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import CategoryIcon from '@mui/icons-material/Category';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import PeopleIcon from '@mui/icons-material/People';
import { Link } from 'react-router-dom';

import './RoutesList.css'

const RoutesList = () => {
    const navMenu = [
        { name: "Inicio", link: "/" , icono: (<HomeIcon/>) },
        { name: "Crear Actividad", link: "/backoffice/activities" , icono: (<VolunteerActivismIcon/>) },
        { name: "Crear Categoria", link: "/backoffice/categories/create", icono: (<CategoryIcon/>)},
        { name: "Crear Noticia", link: "/backoffice/news/create" , icono: (<NewspaperIcon/>)},
        { name: "Crear slide", link: "/backoffice/slides/create" , icono: (<SlideshowIcon/>)},
        { name: "Agregar Testimonio", link: "/backoffice/testimonials/create", icono: (<EmojiPeopleIcon/>)},
        { name: "Nuevo usuario", link: "/backoffice/users/create", icono: (<PersonAddAltIcon/>)},
        { name: "Lista de usuarios", link: "/backoffice/users", icono: (<PeopleIcon/>)},
        { name: "Nuevo miembro", link: "/backoffice/members/create", icono: (<GroupAddIcon/>)},
        { name: "Nuevo Proyecto", link: "/backoffice/projects/create", icono: (<DocumentScannerIcon/>)},
      ];
      
    return(
        <> 
            <List
                sx={{ width: '100%', maxWidth: 360,paddingRight: 5 , bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Rutas de acceso privadas
                    </ListSubheader>
                }
                >

                    {
                        navMenu.map( child =>{
                            return(
                                <Link to={child.link} id={child.link} className="linkList"> 
                                    <ListItemButton>
                                            <ListItemIcon>
                                                {[child.icono]} 
                                            </ListItemIcon>
                                        <ListItemText primary={child.name} />
                                    </ListItemButton>  
                                </Link>           
                            )
                        })    
                    }
                    
                   
                </List>


        </>
    )
}

export default RoutesList