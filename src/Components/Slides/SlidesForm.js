import React, { useState , useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Snackbar , Alert,TextField, RadioGroup , FormControlLabel , Radio  } from '@mui/material';
import Spinner from './../Spinner/Spinner';
import { useHistory } from "react-router-dom";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Get , Put,PrivatePost} from '../../Services/privateApiService';

import '../FormStyles.css';
import './SlidesForm.css';



const SlidesForm = () => {

    const history = useHistory();
    
    const [dataValues, setDataValues] = useState({
        name: '',
        description: '',
        order:'',
        image64: '',
        getData: ''
    });

    const [CKEditordata, setCKEditordata] =useState("");

    const [ allSlidesData , setAllSlidesData ] = useState([])

    const { id } = useParams();
    const [loaded , setLoaded] = useState(false)

    const [snack, setSnack] = useState({
        open: false,
        message: "",
        severity: "error",
        duration: 3000,
    })

    const actualizacionDeDatos = id !== "create";


    const snackErrorCargaDatos = () =>{
        setSnack({...snack, 
            message:"Error en la carga de datos, intente nuevamente mas tarde.",
            open:true,
            severity:"error"
        })
    }

    const getSlidesDataAndShow = () =>{
        
            Get(process.env.REACT_APP_URL_BASE_ENDPOINT+process.env.REACT_APP_URL_SLIDES_PATH)
            .then( res => {
                const success = res.data.success
                if(success===true){
                const data=res.data.data;
                setAllSlidesData(data);
                if(actualizacionDeDatos){
                    const search=data.find( slide => slide.id=== parseInt(id))

                    setDataValues( {
                        ...dataValues,
                        name:search.name,
                        srcUrlImage:search.image,
                        order:search.order,
                        description:search.description, 
                    });

                    setCKEditordata(search.description);
                }
                    setLoaded(true)
                }else{
                    snackErrorCargaDatos();
                }
                
            })
            .catch( e => {
                snackErrorCargaDatos();
            })
        
        
    }

    useEffect(() => {
        getSlidesDataAndShow();
        
    },[] );

    const imageToBase64 = (element) => {
        if(!element||!element.currentTarget.files)
            return;
        var file = element.currentTarget.files[0];
        var reader = new FileReader();
        reader.onloadend = function() {
            setDataValues({...dataValues, image64: reader.result})
        }
        reader.readAsDataURL(file);
        
      }

    const handleChange = (e) => {
         setDataValues({...dataValues, [e.target.name]: e.target.value})
    }

    const getPossibleOrder = () =>{
        let orderExistente=allSlidesData.map( a => a.order);
        
        if(actualizacionDeDatos){
            orderExistente=orderExistente.filter( a => a!==dataValues.order)

        }
        const maxOrderExistent=Math.max( ...orderExistente ) || 0;
        return  [ ...Array(maxOrderExistent + 4).keys() ].filter( number => !orderExistente.includes(number));
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        const objectSend={
            id: parseInt((actualizacionDeDatos)? id: 0 ),
            name: dataValues.name ,
            description: dataValues.description,
            image: dataValues.image64,
            user_id:  0,
            order:  dataValues.order,
        }
        var promise = (actualizacionDeDatos)? 
        Put(process.env.REACT_APP_URL_BASE_ENDPOINT+process.env.REACT_APP_URL_SLIDES_PATH+"/"+objectSend.id,objectSend) : 
        PrivatePost(process.env.REACT_APP_URL_BASE_ENDPOINT+process.env.REACT_APP_URL_SLIDES_PATH,objectSend);
 
        promise.then( res => {
            if(res.data.success){
                history.push("/slides");
            }else{
                setSnack({...snack, 
                    message:"Error debe completar todos los casilleros y subir una imagen.",
                    open:true,
                    severity:"error"
                })
            }
        })
    }
    const onCloseSnack = () =>{
        setSnack({...snack, open:false})
    }

    return (
        <div className="globalContainer">
            <Spinner visible={!loaded} className="spinner"  />  

            <form className="form-container" onSubmit={handleSubmit}>
            <h2>{(actualizacionDeDatos)?"Actualizacion de slide":"Slide nueva"}</h2>

            <TextField id="outlined-basic" label="Titulo del Slide" variant="outlined"  
                        type="text" name="name"  
                        value={ dataValues.name } onChange={handleChange} required/>

            <CKEditor
                    editor={ ClassicEditor }
                    name="description"
                    value={ dataValues.description }
                    data={ CKEditordata }
                    onChange={ ( event, editor ) => setDataValues(
                        {...dataValues ,description : editor.getData()}) }
                        /> 

            

            <hr />

            <h4>Seleccione el N° de orden</h4>
            
            <RadioGroup
                row
                className='radioGroup'
                onChange={handleChange}
                aria-labelledby="demo-row-radio-buttons-group-label"
                value={dataValues.order}
                name="order">
                    
                    { 
                       allSlidesData.length>0
                       &&
                       getPossibleOrder().map(numberMap => {
                            return(<FormControlLabel className='formControlRadio' value={numberMap} key={numberMap} control={<Radio />} label={numberMap} />)
                        })
                    }
                    
            </RadioGroup>
            <hr />
            <h4>Seleccione una imagen</h4>
            <input accept="image/png, image/jpg" type="file" onChange={imageToBase64} required/>

            <button className="submit-btn" type="submit" >{(actualizacionDeDatos)?"Actualizar actividad":"Enviar actividad"}</button>
            </form>

            <Snackbar
            open={snack.open}
            severity={snack.severity}
            autoHideDuration={snack.duration}
            onClose={onCloseSnack}>
                <Alert onClose={onCloseSnack} severity={snack.severity} sx={{ width: '100%' }}>
                    {snack.message}
                </Alert>
            </Snackbar>
     </div>
    );
}
 
export default SlidesForm;