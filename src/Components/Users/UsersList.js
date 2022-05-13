import React, { useEffect, useState } from "react";
import axios from "axios";
import { Get } from "./../../Services/privateApiService";
import {
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
} from "@material-ui/core";
import { Edit, Delete } from "@mui/icons-material";

function UsersList() {
  const [data, setData] = useState([]);

  const getUsers = async () => {
    const response = await Get("/users");
    const usersList = await response.data.data;
    console.log(usersList);
    setData(usersList);
  };

  return (
    <div className="UsersList">
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
              <TableRow key={user}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Edit />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Delete />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default UsersList;
