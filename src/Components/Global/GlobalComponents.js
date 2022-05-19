import Spinner from '../Spinner/Spinner'
import { Snackbar , Alert } from '@mui/material';
import { GetAppContext } from './../../index';
import React from 'react';

const GlobalComponents = ({children}) => {

    const {appData, setAppData} = GetAppContext();
    

    const onCloseSnack = () =>{
        setAppData( prevState => ({
            ...prevState,
            snackbar:{
                    ...prevState.snackbar,
                    open: false,
                }
            })
        )
    }




    return (
        <>
            {children}
            <Spinner visible={appData.spinner.open} className="spinner"  /> 
            <Snackbar
                open={appData.snackbar.open}
                severity={appData.snackbar.severity}
                autoHideDuration={4000}
                onClose={onCloseSnack}>
                <Alert onClose={onCloseSnack} severity={appData.snackbar.severity} sx={{ width: '100%' }}>
                    {appData.snackbar.message}
                </Alert>
            </Snackbar>
        </>
    )
}



export default GlobalComponents