import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import ListadoRutas from '../ListadoRutas/ListadoRutas';


const Sidebar = () => { 

    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
      });
    

    const toggleDrawer = ( open) => (event) => {
        if (
          event &&
          event.type === 'keydown' &&
          (event.key === 'Tab' || event.key === 'Shift')
        ) {
          return;
        }
        setState({ ...state, ["left"]: open });
      };

  

    return(
        <React.Fragment key={"left"}>
        <IconButton aria-label="Sidebar" onClick={toggleDrawer( true)}>
            <MenuIcon fontSize="inherit" />
        </IconButton>
        <SwipeableDrawer
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer( false)}
          onOpen={toggleDrawer( true)}
        >
          <ListadoRutas/>
        </SwipeableDrawer>
      </React.Fragment>
    )
}


export default Sidebar;