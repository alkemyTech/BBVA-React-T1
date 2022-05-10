import {TailSpin} from "react-loader-spinner";
import './Spinner.css'


/**
 * Componente Spinner, al llamarlo aparece un spinner de carga, con un background transparente.
 * 
 * @param {*} param0 
 * @returns 
 */
const Spinner = ({visible,size,padding}) => {
    return(
        <div className="spinner" style={padding={padding}}>
        {visible &&
        <TailSpin
            height={size}
            width={size}
            color="orange"
            ariaLabel="loading"
            />
        }
        </div>
    );
}

export default Spinner