import React from 'react'
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { StyledEngineProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import {Get} from "../../../Services/privateApiService"

const NewsBackoffice = () => {


    const getNewsData = () => {
        try{
            const res = Get(process.env.REACT_APP_URL_BASE_ENDPOINT + process.env.REACT_APP_URL_NEWS_PATH)
            console.log(res.data.data)
        } catch(err) { 
            return err; 
        }
    }




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
}

export default NewsBackoffice