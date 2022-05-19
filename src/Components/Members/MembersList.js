import React from "react";
import Card from "../Card/Card.js";
import { Get } from "./../../Services/publicApiService";
import { useEffect } from "react";
import "./MembersList.css";
import { GetAppContext } from '../../index';

export const MembersList = () => {
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

  const getMembers = async () => {
    setSpinner(true)
    try{
    const response = await Get(
      process.env.REACT_APP_URL_BASE_ENDPOINT +
        process.env.REACT_APP_URL_MEMBER_PATH
    );
    setData(response.data.data);
    }catch(e){
      snackError("Error en la carga de datos")
    }
    setSpinner(false)
  };

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
