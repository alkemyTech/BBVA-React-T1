import React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { StyledEngineProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { Get } from "../../../Services/privateApiService";

const NewsBackoffice = () => {
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

  const columns = [
    { field: "id", headerName: "ID", type: "number", width: 70 },
    { field: "name", headerName: "Nombre", type: "string", width: 130 },
    { field: "image", headerName: "Imagen", type: "string", width: 130 },
    {
      field: "createdAt",
      headerName: "Age",
      width: 90,
    },
  ];

  const rows = () => {
    const news = getNewsData();
    return (news.map( (e) => {
        return {id: e.id, name: e.name, image: e.image, createdAt: e.created_at}
    }))
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
