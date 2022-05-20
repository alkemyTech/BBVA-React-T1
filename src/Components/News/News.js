import React from "react";
import Card from "../Card/Card.js";
import { Get } from "./../../Services/publicApiService";
import { useEffect } from "react";
import axios from "axios";
import "./News.css";

export const News = () => {
  const [data, setData] = React.useState([]);

  const getNews = async () => {
    const response = await Get(
      process.env.REACT_APP_URL_BASE_ENDPOINT + "/news"
    );
    const newsList = await response.data.data;
    setData(newsList);
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
                  description={<div dangerouslySetInnerHTML={{__html: item.content}}></div>}
                />
              </div>
            )
        )}
      </div>
    </div>
  );
};
