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
import "./UsersList.css";
import { Link } from "react-router-dom";
import { Get } from "./../../Services/privateApiService";

function UsersList() {
  const [data, setData] = useState([]);

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
