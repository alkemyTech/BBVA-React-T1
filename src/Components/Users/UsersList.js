import React, { useEffect, useState } from "react";
import axios from "axios";
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
import "./UsersList.css";
import { Link } from "react-router-dom";

function UsersList() {
  const [data, setData] = useState([]);

  //funcion Get sin Headers y limitado a 20 resultados para obtener los datos de la API
  const Get = (endpoint, id = null) => {
    const param = id ? `/${id}` : "";
    return axios.get(
      `${
        process.env.REACT_APP_URL_BASE_ENDPOINT + endpoint + param + "?limit=20"
      }`
    );
  };

  const getUsers = async () => {
    const response = await Get("/users", null);
    const usersList = await response.data.data;
    setData(usersList);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="UsersList">
      <div className="buttons">
        <Button variant="contained" color="success">
          <Link className="top-links" to="/backoffice/users/create">
            {" "}
            New User{" "}
          </Link>
        </Button>
      </div>
      <div className="table">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Link
                      className="edit-icon"
                      to={`/backoffice/users/create/${user.id}`}
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

export default UsersList;
