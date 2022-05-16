import * as React from 'react';
import  { useState } from "react";
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import RoutesList from '../RoutesList/RoutesList';
import '../../../App.css'

const Sidebar = () => { 

  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
      setIsOpen(!isOpen)
  }

  

    return(
        <React.Fragment key={"left"} className="pruebadd"  >
            <IconButton aria-label="Sidebar" onClick={toggleDrawer}>
                <MenuIcon fontSize="inherit" />
            </IconButton>
            <SwipeableDrawer
            anchor={"left"}
            open={isOpen}
            onClose={toggleDrawer}
            onOpen={toggleDrawer}
            >
                <RoutesList/>
            </SwipeableDrawer>
      </React.Fragment>
    )
}


export default Sidebar;