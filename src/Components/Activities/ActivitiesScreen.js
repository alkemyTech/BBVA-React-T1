import { CssBaseline, StylesProvider } from '@material-ui/core';
import React, { useEffect, useState, Component } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "./Activities.css";
// import required modules
import { Navigation } from "swiper";

const ActivitiesScreen = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    try {
      const res = axios.get(`https://ongapi.alkemy.org/api/activities`); //llamada a Get de Activities
      res.then((res) => setData(res.data.data));
    } catch (err) {
      return err;
    }
  }, []);

  return (
    <StylesProvider injectFirst>
      <CssBaseline />
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
    </StylesProvider>
  );
};

export default ActivitiesScreen;
