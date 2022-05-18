import React from "react";
import Card from "../Card/Card.js";
import { Get } from "./../../Services/publicApiService";
import { useEffect } from "react";
import "./MembersList.css";

export const MembersList = () => {
  const [data, setData] = React.useState([]);

  function getMembers() {
    Get(process.env.REACT_APP_URL_BASE_ENDPOINT + "/members").then((res) => {
      setData(res.data.data);
    });
  }

  useEffect(() => {
    getMembers();
  }, []);

  return (
    <div className="members-list">
      <h2>Miembros</h2>
      <div className="member-container">
        {data.map(
          (item) =>
            item.image && (
              <div className="member-item" key={item.id}>
                <Card
                  className="member-card"
                  style={{ objectFit: "cover" }}
                  type="staff"
                  img={item.image}
                  title={item.name}
                  description={item.description}
                />
              </div>
            )
        )}
      </div>
    </div>
  );
};
