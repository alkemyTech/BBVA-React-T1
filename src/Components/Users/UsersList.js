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

function UsersList() {
  const [data, setData] = useState([]);

  const getUsers = async () => {
    const response = await Get("/users");
    const usersList = await response.data;
    console.log(usersList);
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
        </Table>
      </TableContainer>
    </div>
  );
}

export default UsersList;
