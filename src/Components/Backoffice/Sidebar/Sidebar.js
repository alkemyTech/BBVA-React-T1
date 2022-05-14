import * as React from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import ListadoRutas from '../RoutesList/RoutesList';
import '../../../App.css'

const Sidebar = () => { 

  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
      setIsOpen(!isOpen)
  }

  

    return(
        <React.Fragment key={"left"} className="pruebadd"  >
            <IconButton aria-label="Sidebar" onClick={setIsOpen( true)}>
                <MenuIcon fontSize="inherit" />
            </IconButton>
            <SwipeableDrawer
            anchor={"left"}
            open={state["left"]}
            onClose={setIsOpen( false)}
            onOpen={setIsOpen( true)}
            >
                <ListadoRutas/>
            </SwipeableDrawer>
      </React.Fragment>
    )
}


export default Sidebar;