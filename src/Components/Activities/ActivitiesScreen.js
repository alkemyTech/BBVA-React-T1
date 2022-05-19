import { CssBaseline, StylesProvider } from '@material-ui/core';
import React, { useRef, useEffect, useState, Component } from "react";
import {Get} from '../../Services/publicApiService';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react'
// Import Swiper styles
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import "./Activities.css";
// import required modules
import { Navigation } from "swiper";
import { GetAppContext } from '../../index';

const ActivitiesScreen = () => {
  const [data, setData] = useState([]);
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

  useEffect(() => {
    getActivities();
  }, []);

  const getActivities = async () => {
    try {
      const res = await Get(`${process.env.REACT_APP_URL_BASE_ENDPOINT + process.env.REACT_APP_URL_ACTIVITIES_PATH}`);
      setData(res.data.data);
    } catch (err) {
      setSnackBar(`Error al cargar las actividades -> ${err}`,'error');
    }
  }

  return (
    <StylesProvider injectFirst>
      <CssBaseline />
      <div className='swiper-general-container'>
        <h1 className='activities-title'>Activities</h1>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {data.map((activity) => {
          return (
            <SwiperSlide key={activity.id}>
              <div
                className="background-img"
                style={{
                  backgroundImage: `url(${activity.image})`,
                }}
              >
                <div className="background-img-container">
                  <h2 className="activity-title">{activity.name}</h2>
                  <p className="description-container">
                    {activity.description}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      </div>
    </StylesProvider>
  );
};

export default ActivitiesScreen;
