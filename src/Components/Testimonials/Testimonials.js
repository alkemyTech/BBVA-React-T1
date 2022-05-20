import React, {useState} from "react";
import Card from "../Card/Card.js";
import { Get } from "./../../Services/publicApiService";
import { useEffect } from "react";
import "./Testimonials.css";

export const Testimonials = () => {
  const [data, setData] = useState([]);

  const getNews = async () => {
    await Get(
      process.env.REACT_APP_URL_BASE_ENDPOINT + "/testimonials")
      .then(res=> setData(res.data.data))
  };

  useEffect(() => {
    getNews();
  }, []);

  return (
    <div className="testimonials-general-container">
      <h1 className="h1-testimonials">Testimonios</h1>
      <div className="testimonials-container">
        {data.map(
          (item) =>
            item.image && (
              <div className="testimonials-item">
                <Card
                  key={item.id}
                  type="testimonials"
                  img={item.image}
                  buttonContent="Ver Testimonio"
                  description={<div dangerouslySetInnerHTML={{__html: item.description}}></div>}
                />
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Testimonials;