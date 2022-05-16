import { Visibility } from "@mui/icons-material";
import {TailSpin} from "react-loader-spinner";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import './Spinner.css'

/**
 * Componente Spinner, al llamarlo aparece un spinner de carga, con un background transparente.
 * Posee un z-index 2 para asegurarse que este por sobre todo lo que se muestra
 * Este componente se adapta al 100% del ancho del padre.
 * 
 * @param visible Posee dos valores posibles, true: visible, o false: GONE
 * @param size Es el tamaño en pixeles de alto y ancho del spinner
 * @param padding Es el padding interno del spinner  
 * @param color Se pasa el color en formato string default "orange"
 * @returns jsx
 */
const Spinner = ({visible,size,padding,color}) => {
    return(
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={visible}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}

export default Spinner