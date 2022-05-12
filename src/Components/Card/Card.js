import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

const Card = (props) => {
  const { type, img, title, description, buttonContent, buttonNav } = props;

  if (type == "staff") {
    return (
      <div
        className={`card-ver ${type}`}
        style={{
          backgroundImage: `url(${img}), url(${"/images/placeholder/270x340.png"})`,
        }}
      >
        <div className={`card-body-ver ${type}`}>
          <div className={`name ${type}`}>{title}</div>
          <div className={`description-card ${type}`}>{description}</div>
        </div>
      </div>
    );
  } else if (type == "testimonials") {
    return (
      <div className={`card-ver ${type}`}>
        <img className={`img-card ${type}`} src={img} alt="" />
        <div className={`card-body-ver ${type}`}>
          <h4 className={`name ${type}`}>{title}</h4>
          <p className={`description-card ${type}`}>{description}</p>
        </div>
      </div>
    );
  } else if (type == "news") {
    return (
      <div className={`card-hor ${type}`}>
        <div className={`img-container ${type}`}>
          <img className={`img-card ${type}`} src={img} alt="" />
        </div>
        <div className={`card-body-hor ${type}`}>
          <div className={`description-card-container ${type}`}>
            <p className={`description-card ${type}`}>{description}</p>
          </div>

          <div className={`button-container ${type}`}>
            <Link to={buttonNav}>
              <button className={`button-card ${type}`}>{buttonContent}</button>
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="card-ver">
        <p>No se pudo renderizar tu card</p>
      </div>
    );
  }
};

export default Card;
