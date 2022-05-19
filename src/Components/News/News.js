import React from "react";
import Card from "../Card/Card.js";
import { Get } from "./../../Services/publicApiService";
import { useEffect } from "react";
import axios from "axios";
import "./News.css";
import { GetAppContext } from '../../index';

export const News = () => {
  const [data, setData] = React.useState([]);

  const {appData, setAppData} = GetAppContext();

    const setSpinner = ( open ) =>{
        setAppData(prevState => ({
                ...prevState,
                spinner:{
                    open:open
                }
            })
        )
    }

    const setSnackBar = ( message , severity) => {
        setAppData(prevState => ({
                ...prevState,
                snackbar:{
                        ...prevState.snackbar,
                        message: message,
                        severity: severity,
                        open: true,
                    }
                })
                )
    }


    const snackError = (message) => setSnackBar(message,"error")
    const snackSuccess = (message) => setSnackBar(message,"success")
    const errorCarga = () => snackError("Error en la carga de datos, reintente nuevamente mas tarde.")
  const getNews = async () => {
    setSpinner(true)
    try{
    const response = await Get(
      process.env.REACT_APP_URL_BASE_ENDPOINT + "/news"
    );
      if(response.data.success){
        const newsList = await response.data.data;
        setData(newsList);
      }else
      errorCarga()
    }catch(e){
      errorCarga()
    }
    setSpinner(false);
  };

  useEffect(() => {
    getNews();
  }, []);

  return (
    <div className="news">
      <h1>Novedades</h1>
      <div className="news-container">
        {data.map(
          (item) =>
            item.image && (
              <div className="news-item">
                <Card
                  key={item.id}
                  type="news"
                  img={item.image}
                  buttonContent="Ver novedad"
                  description={item.content}
                />
              </div>
            )
        )}
      </div>
    </div>
  );
};
