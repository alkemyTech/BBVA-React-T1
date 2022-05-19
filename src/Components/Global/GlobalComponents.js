import Spinner from '../Spinner/Spinner'
import { Snackbar , Alert } from '@mui/material';
import { AppContext } from './../../index';
import React from 'react';

const GlobalComponents = () => {

    const [appData, setAppData] = React.useContext(AppContext)
    

    const onCloseSnack = () =>{
        //setSnack({...snack, open:false})
    }

    return (
        <>
            <Spinner visible={appData.spinner.open} className="spinner"  /> 
            <Snackbar
                open={appData.snackbar.open}
                severity={appData.snackbar.severity}
                autoHideDuration={3000}
                onClose={onCloseSnack}>
                <Alert onClose={onCloseSnack} severity={appData.snackbar.severity} sx={{ width: '100%' }}>
                    {appData.snackbar.message}
                </Alert>
            </Snackbar>
        </>
    )
}

export default GlobalComponents