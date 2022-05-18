import React from "react";
import Card from "../Card/Card.js";
import { Get } from "./../../Services/publicApiService";
import { useEffect } from "react";
import "./MembersList.css";

export const MembersList = () => {
  const [data, setData] = React.useState([]);

  function getMembers() {
    Get(process.env.REACT_APP_URL_BASE_ENDPOINT + "/members")
      .then((res) => {
        setData(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getMembers();
  }, []);

  return (
    <div className="members-list">
      <div className="member-container">
        <h2>Miembros</h2>
        {data.map(
          (item) =>
            item.image && (
              <div className="member-item" key={item.id}>
                <Card
                  type="staff"
                  img={item.image}
                  title={item.name}
                  description={item.content}
                />
              </div>
            )
        )}
      </div>
    </div>
  );
};
