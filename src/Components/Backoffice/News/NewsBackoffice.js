import React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { StyledEngineProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import { Get } from "../../../Services/privateApiService";

const NewsBackoffice = () => {
  const columns = [
    { field: "id", headerName: "ID", type: "number", width: 70 },
    { field: "name", headerName: "Nombre", type: "string", width: 130 },
    { field: "image", headerName: "Imagen", type: "string", width: 130 },
    {
      field: "createdAt",
      headerName: "Fecha de creación",
      width: 90,
    },
    { field: "edit", headerName: "Editar" },
    { field: "delete", headerName: "Eliminar" },
  ];

  const getNewsData = () => {
    try {
      const res = Get(
        process.env.REACT_APP_URL_BASE_ENDPOINT +
          process.env.REACT_APP_URL_NEWS_PATH
      );
      console.log(res.data.data);
      return res;
    } catch (err) {
      return [];
    }
  };

  const deleteNews = () => {

  } 
  
  const deleteIcon = (id) => {
    return (
      <IconButton
        aria-label="delete"
        size="small"
        onClick={deleteNews(id)}
      >
        <DeleteIcon />
      </IconButton>
    );
  };

  const editIcon = (id) => {
    return (
      <Link to={"/backoffice/news/" + id}>
        <IconButton aria-label="edit" size="small">
          <EditIcon />
        </IconButton>
      </Link>
    );
  };
  const rows = () => {
    const news = getNewsData();
    return news.map((e) => {
      return {
        id: e.id,
        name: e.name,
        image: e.image,
        createdAt: e.created_at,
        edit: editIcon(e.id),
        delete: deleteIcon(e.id),
      };
    });
  };

  return (
    <div className="news-bo-container">
      <StyledEngineProvider injectFirst>
        <CssBaseline />
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </StyledEngineProvider>
    </div>
  );
};

export default NewsBackoffice;
