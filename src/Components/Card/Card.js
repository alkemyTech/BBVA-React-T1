import React from "react";
import { Link } from "react-router-dom";

const Card = (props) => {
  
    const {type, img, title, description, buttonContent, buttonNav} = props


  if (type == "staff" || type == "testimonials") {
    return (
      <div className="card-ver {type}">
        <img className="img-card {type}" src={img} alt="" />
        <div className="card-body-ver {type}">
          <div className="name {type}">{title}</div>
          <div className="description-card {type}">{description}</div>
        </div>
      </div>
    );
  } else if (type == "news") {
    return (
      <div className="card-hor {type}">
        <img className="img-card {type}" src={img} alt="" />
        <div className="card-body-hor {type}">
          <div className="description-card {type}">{description}</div>
          <Link to={buttonNav}>
            <button className="button-card {type}">{buttonContent}</button>
          </Link>
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
