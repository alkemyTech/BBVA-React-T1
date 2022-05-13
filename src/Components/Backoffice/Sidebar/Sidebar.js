import * as React from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
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