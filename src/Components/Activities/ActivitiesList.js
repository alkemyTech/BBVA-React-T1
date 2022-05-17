import React, { useEffect, useState } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
} from "@material-ui/core";
import { Edit, Delete } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Get } from "./../../Services/privateApiService";

function ActivitiesList() {
  const [data, setData] = useState([]);

  const getUsers = async () => {
    const response = await Get(process.env.REACT_APP_URL_BASE_ENDPOINT + process.env.REACT_APP_URL_ACTIVITIES_PATH);
    const usersList = await response.data.data;
    setData(usersList);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="Activities">
      <div className="buttons">
        <Button variant="contained" color="success">
          <Link className="top-links" to="/backoffice/activity/create">
            {" "}
            New Activities{" "}
          </Link>
        </Button>
      </div>
      <div className="table">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Imagen</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.description}</TableCell>
                  <TableCell><img src={user.image} alt="imagen"></img></TableCell>
                  <TableCell>
                    <Link
                      className="edit-icon"
                      to={`/backoffice/activity/create/${user.id}`}
                    >
                      <Edit />
                    </Link>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Delete className="delete-icon" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default ActivitiesList;
